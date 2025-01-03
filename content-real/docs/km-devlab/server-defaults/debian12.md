---
title:  "Debian 12 server files"
date:   2024-11-01
tags:   
    - server
    - debian
---

# Server files for Debian 12 base installation

## Additions to .bashrc

```bash

# You may uncomment the following lines if you want `ls' to be colorized:
export LS_OPTIONS='--color=auto'
eval "$(dircolors)"
alias ls='ls $LS_OPTIONS'
alias lla='ls $LS_OPTIONS -la'
alias ll='ls $LS_OPTIONS -l'
alias l='ls $LS_OPTIONS -lA'
#
# Some more alias to avoid making mistakes:
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

```

## Default .vimrc for sane vim settings

```vimrc

" set line numbers
set nu

" set syntax highliting on
syntax on

" more colors...
if !has('gui_running')
  set t_Co=256
endif

" set initial options
set background=dark
set termguicolors

" relaative line numbers
"set number relativenumber

set ignorecase

set showmode
set hidden
set visualbell

" make the splits work correctly
set splitbelow
set splitright

" title for window in term
set title


" Whitespace stuff
set nowrap
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab

set mouse=a

" make words-with-dashes act as words
set iskeyword+=-

" don't need swapfiles...
set noswapfile
set nobackup
set nowritebackup
set noundofile

```


