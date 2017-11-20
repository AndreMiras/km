# Ledger wallet

How to configure Ledger hardware wallet on Linux.
https://www.ledgerwallet.com/

## Configure udev


File /etc/udev/rules.d/20-hw1.rules:
```
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2581", ATTRS{idProduct}=="1b7c", MODE="0660", GROUP="plugdev"
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2581", ATTRS{idProduct}=="2b7c", MODE="0660", GROUP="plugdev"
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2581", ATTRS{idProduct}=="3b7c", MODE="0660", GROUP="plugdev"
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2581", ATTRS{idProduct}=="4b7c", MODE="0660", GROUP="plugdev"
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2581", ATTRS{idProduct}=="1807", MODE="0660", GROUP="plugdev"
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2581", ATTRS{idProduct}=="1808", MODE="0660", GROUP="plugdev"
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0000", MODE="0660", GROUP="plugdev"
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0001", MODE="0660", GROUP="plugdev"
```

Make sure you're part of the plugdev group.
```
gpassword -a username plugdev
```

You may want to reload udev rules, but that's may not be required.
```
udevadm control --reload-rules && udevadm trigger
```

## Troubleshooting

Make sure browser support is disabled in the Ledger nano if you try to use it through the browser extension.
Verify udev rules were applied properly by checking device permission. First check your device Bus and ID with `lsusb`,
then check its permissions:
```
ls -l /dev/bus/usb/<bus>/<id>
```
