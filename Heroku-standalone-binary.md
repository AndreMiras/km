# Heroku standalone binary

This is how to install the Heroku standalone client without a root access.

## TL;DR
Simply (adapt and) run the three command lines below.
```
wget https://s3.amazonaws.com/assets.heroku.com/heroku-client/heroku-client.tgz
tar -xvzf heroku-client.tgz --directory ~/bin/
ln -sfn ~/bin/heroku-client/bin/heroku ~/bin/
```

On Ubuntu, it should be enough since it already has the following in ~/.profile.
```shell
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi
```
Therefore, next time you log on your shell, you should have heroku binary available in your PATH.

## Credit
https://toolbelt.heroku.com/install.sh
