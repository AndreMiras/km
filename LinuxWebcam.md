# Linux webcam

## Test it with mplayer
```
mplayer tv:// -tv driver=v4l2
```

## Check the module used
```
hwinfo --usb | grep -i webcam -C 8
```
