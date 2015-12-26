# AutoFS with Samba on Ubuntu

AutoFS makes it possible to automount network shares when they accessed an unmount them when they're not.
This particularly convenient for mounting Samba shares.

Here's a custom configuration example for autodiscovering and automounting server shares which is part of Windows domain.
* the auto.master file is the landing template pointing to one or more other templates for specific media types
* the auto.smb2 is the custom Samba configuration, it draws it inspiration from the auto.smb provided by Ubuntu, but adds support for user/password thanks to an external credential file

Install autofs then copy these files to /etc/.

    sudo apt-get install autofs

You would also have to update the credential file with your user/password and optional domain. The file must sit in /etc/auto.smb2.$key, with $key being the server you want to access to and should contain the following lines:

    domain=your_optional_domain
    username=your_username
    password=your_password

## Attachments

* [auto.master](https://raw.github.com/AndreMiras/km/master/attachments/auto.master)
* [auto.smb2](https://raw.github.com/AndreMiras/km/master/attachments/auto.smb2)


## Troubleshooting
You need to be able to resolve the server name, the cifs-utils package may be useful.

    sudo apt-get install cifs-utils

The auto.smb2 file must have the execute mode.

    sudo chmod +x /etc/auto.smb2

Debug issues by stopping autofs (sudo service autofs stop) and running automount.

    sudo automount --verbose --debug --foreground /etc/auto.master

Make sure smbclient is installed (sudo apt-get install smbclient).
