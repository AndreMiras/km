# Jedi vim Python completion

Vim can handle advanced Python code completion and other neat features through [jedi-vim](https://github.com/davidhalter/jedi-vim).

## Install

Ubuntu Bionic 18.04 provides the [vim-python-jedi](https://packages.ubuntu.com/bionic/vim-python-jedi) for it:
```sh
sudo apt install vim-python-jedi
```
However as in version `vim-python-jedi 0.11.1-1` the plugin gets installed in `/usr/share/vim/addons`,
which is not in the default runtimepath of `vim 2:8.0.1453-1ubuntu1`.
Therefore we need to update the `runtimepath` accordingly, in `~/.vimrc` using the following:
```
set runtimepath+=/usr/share/vim/addons
```

## Useful commands

 - Goto definitions `<Leader>` + `d`
 - Show documentation `<Shift>` + `k`
 - Close documentation `<Ctrl>` + `w`, `z`
 - Completion `<Ctrl>` + `<Space>`
 - Jump back file `<Ctrl>` + `o` (not only Jedi)
 - Jump forward file `<Ctrl>` + `i`

## Troubleshooting

### runtimepath
To check the runtimepath, in vim, you can use one of the following commands:
```
echo &runtimepath
set runtimepath
```

### Python 2 support
On Ubuntu Bionic, vim is packaged with Python 3 support only, see [vim python 2.x support missing](https://bugs.launchpad.net/ubuntu/+source/vim/+bug/1654882).
For this reason only `python3complete` would load and `pythoncomplete` would fail with: `Unknown function: pythoncomplete#Complete`.

Check python support with:
```sh
vim --version | grep python
```
Also make sure you're running at least `vim.nox` and not `vim.tiny` that doesn't even have Python 3.
```sh
update-alternatives --display vim
```
