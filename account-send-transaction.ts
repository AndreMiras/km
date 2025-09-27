/**
 * Universal Transaction Script - Send ETH via Externally Owned Account (EOA) or Account Abstraction (AA).
 *
 * Supports both traditional EOA transactions and Account Abstraction using Safe smart accounts.
 * Uses Pimlico for bundling and optional gas sponsorship. Falls back to direct RPC for EOA mode.
 *
 * Type check with:
 * ```
 * npx tsc --noEmit --skipLibCheck --alwaysStrict --strictNullChecks --target ES2015 --moduleResolution bundler $filename
 * ```
 * Run example:
 * ```
 * CHAIN=cronos ACCOUNT_MODE=aa ENTRY_POINT_VERSION=0.7 TO_ADDRESS=0x20CC876C18e64D051b95fdC66d25dad083e0b1A6 AMOUNT=0.0003 npx tsx account-send-transaction.ts
 * Creating account from mnemonic...
 * Sending Account Abstraction transaction...
 * Safe AA address: 0x20CC876C18e64D051b95fdC66d25dad083e0b1A6
 * Transaction hash: 0xaab297d4e10ec6d6a9f9d59fc2e93ff06a575e33ab25c3dd437de2c0dccddcab
 * Confirmed in block: 30321072n
 * Transaction completed successfully
 * ```
 * Bundler command:
 * ```sh
 * docker run -it --rm --publish 3000:3000 ghcr.io/pimlicolabs/alto:v1.2.5 \
 * --entrypoints "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789,0x0000000071727De22E5E9d8BAf0edAc6f37da032" \
 * --executor-private-keys "$PRIVATE_KEY" \
 * --utility-private-key "$PRIVATE_KEY" \
 * --min-balance "0" \
 * --rpc-url "https://cronos.rpc.thirdweb.com" \
 * --network-name "local" \
 * --safe-mode false
 * ```
 */
import { strict as assert } from 'assert';
import type { Chain, HttpTransport, LocalAccount } from 'viem';
import {
  Address,
  createPublicClient,
  createWalletClient,
  getAddress,
  Hex,
  http,
  parseEther,
  PublicClient
} from 'viem';
import { entryPoint06Address, entryPoint07Address } from 'viem/account-abstraction';
import * as chains from 'viem/chains';
import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts';
import { createSmartAccountClient } from 'permissionless';
import { toSafeSmartAccount } from 'permissionless/accounts';
import { createPimlicoClient } from 'permissionless/clients/pimlico';

type EntryPointVersion = '0.6' | '0.7';

const chainNetworkMap: Record<string, string> = {
  mainnet: 'ethereum',
  cronos: '25'
};

const entryPointVersionMap: Record<EntryPointVersion, Address> = {
  '0.6': entryPoint06Address,
  '0.7': entryPoint07Address
};

const getEnvVar = (name: string, required = false): string => {
  const value = process.env[name] ?? '';
  assert.ok(!required || value, `${name} is required`);
  return value;
};

const getChainConfig = (chainName: string): Chain => {
  const chainKey = chainName.toLowerCase();
  const chain = chains[chainKey as keyof typeof chains];
  assert.ok(chain, `Unsupported chain: ${chainName}. Please check viem/chains for available chains.`);
  return chain;
};

const getEntryPointAddress = (version: string): Address => {
  const entryPointAddress = entryPointVersionMap[version];
  assert.ok(entryPointAddress, `Unsupported entrypoint version: ${version}`);
  return entryPointAddress;
};

const getNetworkName = (chainName: string): string => chainNetworkMap[chainName] || chainName;

const createAccount = (mnemonic: string, privateKey: string) => {
  assert.ok(mnemonic || privateKey, 'Either mnemonic or privateKey must be provided');

  if (mnemonic) {
    console.log('Creating account from mnemonic...');
    return mnemonicToAccount(mnemonic);
  }

  console.log('Creating account from private key...');
  return privateKeyToAccount(privateKey as Hex);
};

const waitForTransaction = async (publicClient: PublicClient, txHash: string) => {
  console.log(`Transaction hash:`, txHash);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash as Hex
  });
  console.log('Confirmed in block:', receipt.blockNumber);
  return receipt;
};

const sendEOATransaction = async (
  account: LocalAccount,
  publicClient: PublicClient,
  chain: Chain,
  transport: HttpTransport,
  toAddress: Address,
  amount: string
) => {
  console.log('Sending Account Abstraction transaction...');
  const walletClient = createWalletClient({ account, chain, transport });
  const txHash = await walletClient.sendTransaction({
    to: getAddress(toAddress),
    value: parseEther(amount)
  });
  return waitForTransaction(publicClient, txHash);
};

const sendAATransaction = async (
  owner: LocalAccount,
  publicClient: PublicClient,
  chain: Chain,
  bundlerUrl: string,
  entryPointVersion: EntryPointVersion,
  pimlicoApiKey: string,
  sponsorEnabled: boolean,
  toAddress: Address,
  amount: string
) => {
  console.log('Sending Account Abstraction transaction...');
  const entryPointAddress = getEntryPointAddress(entryPointVersion);
  const safeAccount = await toSafeSmartAccount({
    client: publicClient,
    owners: [owner],
    entryPoint: { address: entryPointAddress, version: entryPointVersion },
    version: '1.4.1'
  });
  console.log('Safe AA address:', safeAccount.address);
  const bundlerTransport = http(bundlerUrl, {
    fetchOptions: { headers: { Authorization: `Bearer ${pimlicoApiKey}` } }
  });
  const pimlico = createPimlicoClient({
    transport: bundlerTransport,
    entryPoint: { address: entryPointAddress, version: '0.7' }
  });
  const smartAccountClient = createSmartAccountClient({
    account: safeAccount,
    chain,
    bundlerTransport,
    paymaster: sponsorEnabled ? pimlico : undefined,
    userOperation: {
      estimateFeesPerGas: async () => (await pimlico.getUserOperationGasPrice()).fast
    }
  });
  console.log(`Sponsoring: ${sponsorEnabled ? 'enabled' : 'disabled'}`);
  const txHash = await smartAccountClient.sendTransaction({
    calls: [{ to: toAddress, value: parseEther(amount) }]
  });
  return waitForTransaction(publicClient, txHash);
};

async function main() {
  const chainName = getEnvVar('CHAIN', true);
  const rpcUrl = getEnvVar('RPC_URL', false) || `https://${chainName}.rpc.thirdweb.com`;
  const mnemonic = getEnvVar('MNEMONIC', false);
  const privateKey = getEnvVar('PRIVATE_KEY', false);
  const toAddress = getAddress(getEnvVar('TO_ADDRESS', true));
  const amount = getEnvVar('AMOUNT', true);
  const accountMode = getEnvVar('ACCOUNT_MODE', false).toLowerCase() || 'aa';
  const useAA = accountMode === 'aa';
  const pimlicoApiKey = getEnvVar('PIMLICO_API_KEY', useAA);
  const sponsorEnabled = getEnvVar('SPONSOR_ENABLED', false).toLowerCase() === 'true';

  const chain = getChainConfig(chainName);
  const transport = http(rpcUrl);
  const publicClient = createPublicClient({ chain, transport });
  debugger;
  const account = createAccount(mnemonic, privateKey);

  if (useAA) {
    const network = getNetworkName(chainName);
    const bundlerUrl = getEnvVar('BUNDLER_URL', false) || `https://api.pimlico.io/v2/${network}/rpc`;
    const entryPointVersionRaw = getEnvVar('ENTRY_POINT_VERSION', false) || '0.6';
    assert.ok(
      entryPointVersionRaw === '0.6' || entryPointVersionRaw === '0.7',
      'ENTRY_POINT_VERSION must be "0.6" or "0.7"'
    );
    const entryPointVersion = entryPointVersionRaw as EntryPointVersion;
    await sendAATransaction(
      account,
      publicClient,
      chain,
      bundlerUrl,
      entryPointVersion,
      pimlicoApiKey,
      sponsorEnabled,
      toAddress,
      amount
    );
  } else {
    await sendEOATransaction(account, publicClient, chain, transport, toAddress, amount);
  }
  console.log('Transaction completed successfully!');
}

main().catch((e) => {
  console.error('Transaction failed:', e);
  process.exit(1);
});
