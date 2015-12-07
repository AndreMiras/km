# Install Heroku sandalone client without root

This is how to install simply the Heroku standalone client without a root access on Ubuntu.

```shell
wget https://s3.amazonaws.com/assets.heroku.com/heroku-client/heroku-client.tgz
tar -xvzf heroku-client.tgz
mkdir -p ~/bin/
mv heroku-client ~/bin/
ln -sfn ~/bin/heroku-client/bin/heroku ~/bin/
```
It should be enough as default Ubuntu install have this in ~/.profile.
```shell
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi
```
Therefore, next time you log on your shell, you should have heroku binary available in your PATH.

## Credit
https://toolbelt.heroku.com/install.sh