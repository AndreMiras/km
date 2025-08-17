# Neovim

## NvChad Arch Linux install

```sh
yay -S nvchad-git
sudo pacman -S ttf-jetbrains-mono-nerd
```

Error:

```
UltiSnips requires py >= 2.7 or py3
```

Fix:

```sh
sudo pacman -S python-pynvim
sudo pacman -Rs vim-ultisnips
```

## Language servers LSP

Error:

```
WARNING 'vscode-css-language-server' is not executable. Configuration will not be used.
WARNING 'vscode-html-language-server' is not executable. Configuration will not be used.
WARNING 'lua-language-server' is not executable. Configuration will not be used.
```

Fix:

```sh
MasonInstall css-lsp
MasonInstall html-lsp
MasonInstall lua-language-server
```
