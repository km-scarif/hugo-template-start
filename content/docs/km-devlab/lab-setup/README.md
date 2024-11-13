---
title:  "KM Devlab Setup Overview"
date:   2024-11-01
weight: 1
---

# Server setup and configuration for KMDevLab

## Setup Proxmox servers

- proxmox1 and proxmox2
- bare metal proxmox installs

## Install PiHole server

- Installed on LXC container (debian12 template) on Proxmox server

## Install Docker server

- Installed on Debian 12

## Install Traefik with certs

- Installed in Docker on docker1

## Install Portainer

- Installed in Docker on docker1 through traefik

## Install registry

- Installed in Docker on docker1

## Installed k3s server

- Installed in Debian12 vm on proxmox1

## Installed MySQL dev server

- Installed in Debian12 vm on proxmox1

## Installed tailscale on servers

## Installed Docker Dev server

- Installed in Debian12 vm on proxmox2

## Installed Docker dev server

- Installed in Debian12 vm on proxmox2

### Installed router for tailscale

- Installed in LXC container (debian12 template) on proxmox1

## Current DNS and IP settings

### A records

- docker1: 192.168.10.40
  - dns A -> docker1.kmdevlab.com
- pihole: 192.168.10.53
  - dns A -> pihole.kmdevlab.com
- router: 192.168.10.60
  - dns A -> router.kmdevlab.com
- k3s: 192.168.10.61
  - dns A -> k3s.kmdevlab.com
- docker-dev: 192.168.10.50
  - dns A -> docker-dev.kmdevlab.com

### CNAME records

- proxmox1: 192.168.10.71
  - ssl cert via dns through traefik
  - dns CNAME -> docker1
    - proxmox1.kmdevlab.com
- proxmox2: 192.168.10.72
  - ssl cert via dns through traefik
  - dns CNAME -> docker1
    - proxmox2.kmdevlab.com
- portainer
  - dns CNAME -> docker1
  - portainer.kmdevlab.com
