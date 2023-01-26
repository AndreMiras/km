# Brother DCP-L2530DW for Arch Linux

```sh
yay -S brscan5
pacman -S xsane
```

Add the network scanner:
```sh
/opt/brother/scanner/brscan5/brsaneconfig5 -a name="DCP-L2530DW" model="DCP-L2530DW" ip=192.168.1.133
```
