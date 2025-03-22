# macOS Ventura Post Install

## Install Homebrew

https://docs.brew.sh/Installation

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
```

## Install Docker

Install:

```sh
brew install --cask docker
```

Start:

```sh
open -a Docker
```

Test:

```sh
docker run --rm -it alpine:latest sh -c "uname -a"
```

## Misc tools

```sh
brew install \
    tmux \
    wget
```
