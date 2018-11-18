# Install NVM manually

NVM recommended installation is:
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
The idea is to install it manually to have better control of where to install it.
At the end the installation is just extracting the archive and sourcing a script.
```bash
wget https://github.com/creationix/nvm/archive/v0.33.11.tar.gz
tar -xvf v0.33.11.tar.gz --directory ~/bin/
```
Then source `nvm.sh` from your `~/.profile`:
```bash
. ~/bin/nvm-0.33.11/nvm.sh
```
