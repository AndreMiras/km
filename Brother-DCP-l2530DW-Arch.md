# Brother DCP-L2530DW for Arch Linux

## Scanner
```sh
yay -S brscan5
pacman -S xsane
```

Add the network scanner:
```sh
/opt/brother/scanner/brscan5/brsaneconfig5 -a name="DCP-L2530DW" model="DCP-L2530DW" ip=192.168.1.133
```


## Printer
```sh
pacman -S cups
```

Add the network printer:
```sh
lpadmin -p DCP-L2530DW-IPPeverywhere -E -v "ipp://192.168.1.133/ipp/print" -m everywhere
```
