/**
 * Set the `PROVIDER_URL` environment variable, then run with:
 * npx ts-node eth-websocket-check.ts
 */
// tested with web3-4.2.2
import Web3, { BlockHeaderOutput } from "web3";
import assert from "assert";

const PROVIDER_URL = process.env.PROVIDER_URL;
assert.ok(PROVIDER_URL);

let webSocketProvider = new Web3.providers.WebsocketProvider(PROVIDER_URL);
const web3 = new Web3(webSocketProvider);

webSocketProvider.on("connect", () => {
  console.log("WebSocket connected");
  subscribeToNewBlocks();
});

const subscribeToNewBlocks = async () => {
  const newBlockHeadersCallback = (
    error: Error,
    blockHeader: BlockHeaderOutput
  ) => {
    if (!error) {
      console.log(blockHeader);
    } else {
      console.error(error);
    }
  };
  try {
    const subscription = await web3.eth.subscribe(
      "newBlockHeaders",
      newBlockHeadersCallback
    );
    subscription.on("connected", (subscriptionId: string) => {
      console.log(`Subscription ID: ${subscriptionId}`);
    });
    subscription.on("data", (blockHeader) => {
      console.log(blockHeader);
    });
    subscription.on("error", console.error);
  } catch (error) {
    console.error("Error subscribing to newBlockHeaders:", error);
  }
};

webSocketProvider.on("end", () => {
  console.log("WebSocket disconnected");
  console.log("Attempting to reconnect...");
  webSocketProvider = new Web3.providers.WebsocketProvider(PROVIDER_URL);
  web3.setProvider(webSocketProvider);
});
