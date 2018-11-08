# Linux webcam

## Test it with mplayer
```
mplayer tv:// -tv driver=v4l2
```
Or choosing the device explicitly e.g. `/dev/video1`:
```
mplayer tv:// -tv driver=v4l2:device=/dev/video1
```

## Check the module used
```
hwinfo --usb | grep -i webcam -C 8
```
