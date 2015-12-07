# Find Raspberry PI address on local network

You can ping all the subnetwork and look for the Raspberry ARP address prefix from the arp cache:
```shell
nmap -sn 192.168.1.0/24
arp -an | grep -i B8:27:EB
```

Next time install avahi-daemon:
```shell
sudo apt-get install avahi-daemon
```
On Windows you need to install  [Bonjour](http://support.apple.com/kb/DL999).


Then it will be possible to ping the Raspberry by its hostname:
```shell
ping raspberrypi.local
```