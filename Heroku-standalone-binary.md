# Heroku standalone binary

This is a short how to install the Heroku client manually without root access.

## TL;DR
Simply (adapt and) run these three command lines.
```
wget https://s3.amazonaws.com/assets.heroku.com/heroku-client/heroku-client.tgz
tar -xvzf heroku-client.tgz --directory ~/bin/
echo 'export PATH="${PATH}:~/bin/heroku-client/bin/"' >> ~/.bashrc
```
