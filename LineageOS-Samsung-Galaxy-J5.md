# Install Lineage OS on Samsung Galaxy J5

This is quick'n dirty guide for installing LineageOS Android Distribution on the Samsung Galaxy J5 (SM-J500FN).

## Prerequisite:

* Windows Laptop or VM :'(
 * Developer mode enabled on device
 * Device downgraded to Lollipop (Android 5.x)
 * Lot of patience

## Required files

 * lineage-14.1-20170706-UNOFFICIAL-j5ltexx.zip: LineageOS for the SM-J500FN
 * Odin3-v3.12.7.zip: Custom (leaked) internet software used by Samsung
 * J500FNXXU1APE3_J500FNOXX1APE1_XEF.zip: Lollipop firmware for the SM-J500FN
 * Kies3Setup.exe: Samsung software that could also be used for downgrading to Lollipop
 * open_gapps-arm-7.1-nano-20170715.zip: Google App (Nano version) for Android 7
 * twrp-3.0.2.0-20161005-j5nltexx.tar.md5: Custom recovery image for Android
 
 ## Steps
 
  1. Put your Android device in developper mode
  2. Copy LineageOS and GApp zip files to the SDCARD
  3. Boot the device in download mode (power+home+volume-down)
  3. Flash "TWRP" custom recovery image using ODIN
  4. Reboot the device in the custom recovery mode (power+home+volume-up)
  5. Wipe the device from the "Wipe" menu
  6. Install the custom LineageOS zip file from the "Install" menu
  7. Install the GApp zip file from the "Install" menu
  8. Reboot the device & enjoy
  
 ## Troubleshooting
 
 ### Device stuck booting showing the samsung logo.
 Force reboot in flash mode, and wipe cache files.
 
 ### E: failed to verify whole-file signature
 You need to run the TWRP custom recovery image for Android, not the stock one.
 
 ### How to copy to SDCARD
 I like to do it from the shell using the `adb` command.
 First find the SDCARD path, you can use `adb shell mount` to see in which directory it's mounted.
 Then:
 ```
 adb push <file> <sdcard>
 ```
