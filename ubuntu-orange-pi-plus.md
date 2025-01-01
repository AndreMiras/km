# Installing Ubuntu on Orange Pi Plus

## Orange Pi Image

Download the Ubuntu image from the "Third Party Images" in
http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-5-plus.html

- http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-5-plus.html
- https://github.com/Joshua-Riek/ubuntu-rockchip

More particularly we will be running the
`ubuntu-24.04-preinstalled-desktop-arm64-orangepi-5-plus.img.xz` image from:
https://github.com/Joshua-Riek/ubuntu-rockchip/releases/tag/v2.4.0

We don't use the official Ubuntu image from Orange Pi because they seemed to
have customized a kernel parameter that can lead to memory allocation issues,
refs:

- https://github.com/paradigmxyz/reth/issues/2211
- https://github.com/erigontech/erigon/issues/4871

Let's set the `IMAGE` variable:

```sh
IMAGE=ubuntu-24.04-preinstalled-desktop-arm64-orangepi-5-plus.img.xz
```

## Download and verify

Download the image and checksum.

```sh
wget https://github.com/Joshua-Riek/ubuntu-rockchip/releases/download/v2.4.0/$IMAGE
wget https://github.com/Joshua-Riek/ubuntu-rockchip/releases/download/v2.4.0/$IMAGE.sha256
```

Then verify the image against the checksum:

```sh
sha256sum $IMAGE
```

Output:

```
1444bd0df073e9d7bdd384861dfeae8d4ff212bfbd0044d87f74235cd748dd5a  ubuntu-24.04-preinstalled-desktop-arm64-orangepi-5-plus.img.xz
```

The output should match with the downloaded checksum:

```sh
cat $IMAGE.sha256
```

Output:

```
1444bd0df073e9d7bdd384861dfeae8d4ff212bfbd0044d87f74235cd748dd5a  ubuntu-24.04-preinstalled-desktop-arm64-orangepi-5-plus.img.xz
```

## Burn the image on SD card

```sh
xzcat $IMAGE | sudo dd of=/dev/mmcblk0 bs=4M status=progress
```

## Boot on the SD card

Install the OS on the NVMe disk, see
https://github.com/Joshua-Riek/ubuntu-rockchip/wiki/Ubuntu-24.04-LTS for
detailed instructions.

```sh
sudo u-boot-install-mtd
sudo ubuntu-rockchip-install /dev/nvme0n1
```
