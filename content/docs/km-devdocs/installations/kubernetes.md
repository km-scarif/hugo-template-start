---
title: "Kubernetes Tools"
date: 2024-10-23T12:41:00-04:00
summary: "Instructions for installing tooling for Kubernetes Development"
tags:
  - install
  - kubernetes
  - development
  - deploy
tablecontents:
  - "Krew"
  - "Krew Plugins"
  - "Context Config"
  - "K9s"
---

# Kubernetes Tools

## Krew

**Krew** is the plugin manager for the **kubectl** command-line tool.

Visit the ![Krew Documentation](https://krew.sigs.k8s.io/docs/user-guide/setup/install/) for installation instructions

## Krew Plugins

The following plugins should be installed to easily and correctly deploy kubernetes application stacks.  
**TL;DR:**

```bash
kubectl krew install konfig
kubectl krew install ctx
kubectl krew install ns
```

### konfig

This plugin allows for multi-environment deployment.  You can easily setup testing and production environments. Install the plugin with...

```bash
kubectl krew install konfig
```

### ctx

This plugin allows you to switch between contexts in your kubeconfig. Install the plugin with...

```bash
kubectl krew install ctx
```

You can switch contexts using `kubectl ctx`  

*Convenience*: You can make an alias in your .bashrc or .zshrc file for *kubectx*.  

```bash
alias kubens='kubectl ctx'
```

Now you can switch contexts using `kubectx`  

### ns

This plugin allows you to switch between Kubernetes namespaces. Install the plugin with...

```bash
kubectl krew install ns
```

You can switch namespaces using `kubectl ns`  

*Conveniecne*: You can make an alias in your .bashrc or .zshrc file for *kubens*.  

```bash
alias kubens='kubectl ns'
```

Now you can switch namespaces using `kubens`

## Context Configs

Kubernetes config yamls will be placed in `~/.kube/config.d`

Place the following in your .bashrc or .zshrc file...

```bash
export KUBECONFIG=~/.kube/config$(find ~/.kube/config.d -type f 2>/dev/null | xargs -I % echo -n ":%")
```

## K9s

K9s is a terminal based UI to interact with your Kubernetes clusters.  It's fast, looks great and is easy to use.  
Visit the ![official site](https://k9scli.io/topics/install/) for installation instructions.

![K9s Screenshot](/img/k9s.png)
