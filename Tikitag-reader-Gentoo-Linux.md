# Tikitag reader on Gentoo Linux

Getting started guide with the Tikitag ACS ACR 38U-CCID reader on Gentoo Linux.

## Install
Install dependencies.

    emerge sys-apps/pcsc-lite sys-apps/pcsc-tools app-crypt/ccid dev-libs/libnfc

Add your user to the pcscd (requires relogin).

    gpasswd -a user pcscd

Make sure the pcscd is running.

    systemctl start pcscd

## Verify your installation

nfc-list:

```
$ nfc-list
nfc-list uses libnfc 1.7.1
NFC device:     / CCID USB Reader opened
1 ISO14443A passive target(s) found:
ISO/IEC 14443A (106 kbps) target:
    ATQA (SENS_RES): 00  04
       UID (NFCID1): 92  4c  52  27
      SAK (SEL_RES): 08
```

pcsc_scan:
```
$ pcsc_scan
PC/SC device scanner
V 1.4.27 (c) 2001-2011, Ludovic Rousseau <ludovic.rousseau@free.fr>
Compiled with PC/SC lite version: 1.8.16
Using reader plug'n play mechanism
Scanning present readers...
0: ACS ACR 38U-CCID 00 00

Sun Oct  2 22:32:52 2016
Reader 0: ACS ACR 38U-CCID 00 00
  Card state: Card inserted, 
  ATR: 3B BE 96 00 00 41 03 00 00 00 00 00 00 00 00 00 02 90 00

ATR: 3B BE 96 00 00 41 03 00 00 00 00 00 00 00 00 00 02 90 00
+ TS = 3B --> Direct Convention
+ T0 = BE, Y(1): 1011, K: 14 (historical bytes)
  TA(1) = 96 --> Fi=512, Di=32, 16 cycles/ETU
    250000 bits/s at 4 MHz, fMax for Fi = 5 MHz => 312500 bits/s
  TB(1) = 00 --> VPP is not electrically connected
  TD(1) = 00 --> Y(i+1) = 0000, Protocol T = 0 
-----
+ Historical bytes: 41 03 00 00 00 00 00 00 00 00 00 02 90 00
  Category indicator byte: 41 (proprietary format)

Possibly identified card (using /usr/share/pcsc/smartcard_list.txt):
3B BE 96 00 00 41 03 00 00 00 00 00 00 00 00 00 02 90 00
        SAM inside the Tikitag reader from Alcatel-Lucent
        http://hackerati.com/post/57314994/rfid-on-the-cheap-hacking-tikitag
^C
```

## Play
Play with RFIDIOt.

Install dependencies.
```
pip install pycrypto pyscard rfidiot
```

Play:
```
$ rfidiot-cli.py IDENTIFY

rfidiot-cli v0.1 (using RFIDIOt v1.0i)
  Reader: PCSC ACS ACR 38U-CCID 00 00
          (Firmware: ACR122U102,  SAM Serial: 065441005C16254B,  SAM ID: 004592)


  Identiying TAG

    Tag ID: 924C5227    Tag Type: MIFARE 1K
```
