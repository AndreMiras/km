# Cross compile cryptography and cffi

## TL;DR
As in [midicase comment](https://github.com/vincentbernat/snimpy/issues/21#issuecomment-73227857), cffi dependent packages can be cross compiled as follow:

1. build and install host cffi
2. build and install target packages that depend in cffi
3. build and install target cffi


## Install build dependencies

    sudo apt-get install python-setuptools
    sudo apt-get install -y --no-install-recommends gcc-arm-linux-gnueabi
    sudo apt-get install -y python-dev

This is the arch we use for cross compiling, but it could be something else, e.g. ```armhf```.

    arch=armel


## Cross compile libpython2.7-dev and deps


### Cross compile zlib1g-dev

Package ```libpython2.7-dev``` requires ```zlib1g-dev```.

    sudo apt-get -y build-dep zlib1g-dev
    apt-get source zlib1g-dev
    dpkg-buildpackage -a$arch -rfakeroot -uc -b
    dpkg --contents zlib1g_*_$arch.deb
    sudo dpkg --install --force-architecture --path-exclude=/usr/share/doc/* zlib1g_*_$arch.deb
    dpkg --contents zlib1g-dev_*_$arch.deb
    sudo dpkg --install --force-architecture --path-exclude=/usr/share/* zlib1g-dev_*_$arch.deb


### Cross compile libpython2.7-dev

    sudo apt-get -y build-dep libpython2.7-dev
    apt-get source libpython2.7-dev

Edit debian/rules and comment out:

    test -f $(d)/usr/lib/python$(VER)/lib-dynload/_bsddb.so

Then build:

    dpkg-buildpackage -a$arch -rfakeroot -uc -b -d
    dpkg --contents libpython2.7-dev_*_$arch.deb
    sudo dpkg --install --force-architecture --path-exclude=/usr/include/python2.7/* --path-exclude=/usr/share/* --path-exclude=/usr/bin/* libpython2.7-dev_*_$arch.deb

You may want to deploy libpython, but this is not requred for compiling later steps:

    dpkg --contents libpython2.7_*_$arch.deb
    sudo dpkg --install --force-architecture --path-exclude=/usr/share/* libpython2.7_*_$arch.deb


## Cross compile cryptography and dependencies


### Cross compile libssl-dev

Installing cryptography requires installing ```libssl-dev```.

    sudo apt-get -y build-dep libssl-dev
    apt-get source libssl-dev
    dpkg-buildpackage -a$arch -rfakeroot -uc -b
    dpkg --contents libssl1.0.0_*_$arch.deb
    sudo dpkg --install --force-architecture --path-exclude=/usr/share/doc/* libssl1.0.0_*_$arch.deb
    dpkg --contents libssl-dev_*_$arch.deb
    sudo dpkg --install --force-architecture libssl-dev_*_$arch.deb --path-exclude=/usr/share/* --path-exclude=/usr/include/openssl/*


### Cross compile libffi-dev

This steps will install ```libffi-dev``` and dependencies for the host, then it will build and install it for the target platform.

    sudo apt-get -y build-dep libffi-dev
    apt-get source libffi-dev
    dpkg-buildpackage -a$arch -rfakeroot -uc -b
    dpkg --contents libffi6_*_$arch.deb
    sudo dpkg --install --force-architecture --path-exclude=/usr/share/* libffi6_*_$arch.deb
    dpkg --contents libffi-dev_*_$arch.deb
    sudo dpkg --install --force-architecture --path-exclude=/usr/share/* libffi-dev_*_$arch.deb


### Cross compile cryptography

Build and install cryptography for the target platform.

    wget https://pypi.python.org/packages/source/c/cryptography/cryptography-0.9.3.tar.gz
    tar -xvzf cryptography-0.9.3.tar.gz
    CC=arm-linux-gnueabi-gcc LDSHARED=arm-linux-gnueabi-gcc LDFLAGS="-shared" python setup.py install --user --prefix=


### Cross compile cffi

Cross compiling cryptography, should implicitly trigger cffi cross compile.
Verify this is the case using the file command:

    file ~/.local/lib/python2.7/site-packages/cffi-1.1.2-py2.7-linux-x86_64.egg/_cffi_backend.so

If not you can cross compile cffi explicitly:

    wget https://pypi.python.org/packages/source/c/cffi/cffi-1.1.2.tar.gz
    tar -xvzf cffi-1.1.2.tar.gz
    CC=arm-linux-gnueabi-gcc LDSHARED=arm-linux-gnueabi-gcc LDFLAGS="-shared" python setup.py install --user --prefix=
