# NFC Clone

This is a "how to" NFC tags cloning using nfc-tools.

## Dump the blank Chinese card

### Read the fresh blank chinese card

    # nfc-list
    nfc-list uses libnfc 1.5.1 (r1175)
    Connected to NFC device: SCM Micro / SCL3711-NFC&RW - PN533 v2.7 (0x07)
    1 ISO14443A passive target(s) found:
     ATQA (SENS_RES): 00  04  
       UID (NFCID1): 00  00  00  00  
       SAK (SEL_RES): 08  

### Dump the blank chinese card card to get the keys

    # mfoc -P 500 -O blank-chinese.dmp

Now remove the chinese card and put the card you want to copy and dump it

## Dump the Mifare card your want to copy

### Let's read the card to clone first
    
    # nfc-list
    nfc-list uses libnfc 1.5.1 (r1175)
    Connected to NFC device: SCM Micro / SCL3711-NFC&RW - PN533 v2.7 (0x07)
    1 ISO14443A passive target(s) found:
    ATQA (SENS_RES): 00  04  
        UID (NFCID1): 9b  97  4f  19  
        SAK (SEL_RES): 08  

### Time to dump the target card

    # mfoc -P 500 -O cardtocopy.dmp

Put the chinese card back and clone the card

## Write the Chinese card with the content of the other card including UUID


    # nfc-mfclassic w b cardtocopy.dmp blank-chinese.dmp

or

    # nfc-mfclassic w a cardtocopy.dmp blank-chinese.dmp


## Check that the card is the same:
    # nfc-list
    nfc-list uses libnfc 1.5.1 (r1175)
    Connected to NFC device: SCM Micro / SCL3711-NFC&RW - PN533 v2.7 (0x07)
    1 ISO14443A passive target(s) found:
      ATQA (SENS_RES): 00  04  
       UID (NFCID1): 9b  97  4f  19  
       SAK (SEL_RES): 08  

## Go back to blank card

    # nfc-mfclassic w b blank-chinese.dmp cardtocopy.dmp

or

    # nfc-mfclassic w a blank-chinese.dmp cardtocopy.dmp
