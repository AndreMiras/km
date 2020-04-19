# Arch install notes on Dell XPS 13 9360 & 7390

<https://wiki.archlinux.org/index.php/Installation_guide>
<https://wiki.archlinux.org/index.php/Install_Arch_Linux_from_existing_Linux>

## TODO
Install the custom wifi firmware?
<https://wiki.archlinux.org/index.php/Dell_XPS_13_(9360)#Wireless>

## Misc
```
/tmp/root.x86_64/bin/arch-chroot /tmp/root.x86_64/
```

## Graphics

```sh
pacman -S mesa
```

## Desktop Environment
```sh
pacman -S \
    plasma-desktop \
    plasma-nm \
    sddm
systemctl enable sddm
```

## Sound system
```sh
pacman -S pulseaudio plasma-pa
pulseaudio --start
```

## Touchpad
https://wiki.archlinux.org/index.php/Libinput
```sh
pacman -S xf86-input-libinput xorg-xinput
```

## Network
```sh
pacman -S \
    core/dhcpcd \
    core/inetutils \
    extra/networkmanager \
    core/wpa_supplicant
sytemctl enable NetworkManager
```

## Grub
Using the Gentoo one for now:
```
[andre:/tmp] $ sudo grub-mkconfig -o /boot/grub/grub.cfg
Password: 
Sorry, try again.
Password: 
Generating grub configuration file ...
Found linux image: /boot/kernel-genkernel-x86_64-4.15.14-gentoo
Found initrd image: /boot/initramfs-genkernel-x86_64-4.15.14-gentoo
Found linux image: /boot/kernel-genkernel-x86_64-4.12.12-gentoo
Found initrd image: /boot/initramfs-genkernel-x86_64-4.12.12-gentoo
Found linux image: /boot/kernel-genkernel-x86_64-4.12.0-gentoo
Found initrd image: /boot/initramfs-genkernel-x86_64-4.12.0-gentoo
Found linux image: /boot/kernel-genkernel-x86_64-4.11.7-gentoo
Found initrd image: /boot/initramfs-genkernel-x86_64-4.11.7-gentoo
  /run/lvm/lvmetad.socket: connect failed: No such file or directory
  WARNING: Failed to connect to lvmetad. Falling back to internal scanning.
Found Arch Linux on /dev/nvme0n1p4
done
```

But still let's install grub on the Arch:
```sh
pacman -S grub
```

## Additional packages
```sh
pacman -S \
    keepass \
    sudo \
    tmux \
    vim \
    wget
yay -S \
    aur/brave-bin \
    community/vim-ultisnips
```

## Power management
<https://wiki.archlinux.org/index.php/Acpid>
```sh
pacman -S acpid powerdevil
systemctl enable acpid
gpasswd -a andre video
```
