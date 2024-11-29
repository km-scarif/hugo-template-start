---
title: "Ruby"
date: 2024-07-08T08:41:02-04:00
summary: "How to insall a new version of Ruby"
tags:
  - install
  - ruby
  - rvm
  - asdf
  - openssl
---

# Ruby

## Using RVM

To install RVM, see the [official website](https://rvm.io/)  

To install a new ruby version, it must know which openssl library to use.
Use the following command...  
`rvm install x.y.z --with-openssl-dir=$(brew --prefix openssl@v)`

where **x.y.z** is the version of ruby and **v** is the version of openssl.

ie.
`rvm install 3.1.0 --with-openssl-dir=$(brew --prefix openssl@3)`

## Using ASDF

To install ASDF, see the [official github repo](https://github.com/asdf-vm/asdf)

You will then need to install the ruby plugin using the following command...  
`asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git`

To install a new ruby version, use the following command...  
`asdf install ruby x.y.z`  

where **x.y.z** is the version of ruby
