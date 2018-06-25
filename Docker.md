# Docker

## Remove docker containers

### 1. Delete all containers
```sh
docker rm $(docker ps -a -q)
```

* -q prints only the container IDs
* -a prints all containers

### 2. Delete all untagged images
```sh
docker rmi $(docker images | grep "^<none>" | awk '{print $3}')
```

awk must use a single quote (this filters all image IDs).

### 3. Delete all images
```sh
docker rmi $(docker images -q)
```

## Conflicting IP/netmask
If the `docker0` interface is conflicting with one of the network interface e.g. `wlp58s0`:
```
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::42:3aff:feee:c0a5  prefixlen 64  scopeid 0x20<link>
        ether 02:42:3a:ee:c0:a5  txqueuelen 0  (Ethernet)
        RX packets 1439270  bytes 75676311 (75.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1869375  bytes 11563424204 (11.5 GB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 3699237  bytes 7591721280 (7.5 GB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 3699237  bytes 7591721280 (7.5 GB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlp58s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1460
        inet 172.17.0.69  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::612f:d476:3c5:d871  prefixlen 64  scopeid 0x20<link>
        ether 9c:b6:d0:e2:0c:61  txqueuelen 1000  (Ethernet)
        RX packets 18664846  bytes 24622112483 (24.6 GB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 6834308  bytes 1055118769 (1.0 GB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
Update `/etc/docker/daemon.json` with a configuration that doesn't conflict e.g.:
```json
{
  "bip": "172.26.0.1/16"
}
```
More info here <https://success.docker.com/article/how-do-i-configure-the-default-bridge-docker0-network-for-docker-engine-to-a-different-subnet>.
