---
title:  "PiHole DNS"
date:   2024-11-01
---

# Setup DNS Server

## Install Pi-Hole
- Install Debian 12 CT on proxmox1
    - Debian 12 image
    - 10GB storage / 2GB Memory
    - 192.160.10.53/24
    - 1.1.1.1 DNS server (Cloudflare)
    - added server-admin key
- `apt update && apt upgrade -y`
- `apt install sudo`
- `adduser kmadmin`
- password - km..admin
- `usermod -aG sudo kmadmin`
- `sudo -l -U kmadmin`
- `su kmadmin`
- `cd`
- `wget -O basic-install.sh https://install.pi-hole.net`
- `sudo bash basic-install.sh`
- use cloudflare DNS servers, all other default options
- change admin password on the command line with `pihole -a -p`

## Setup DNS entries
A Records
- pihole.kmdevlab.com   -> 192.168.10.53
- docker1.kmdevlab.com  -> 192.168.11.40
- proxmox1.kmdevlab.com -> 192.168.10.71
- proxmox2.kmdevlab.com -> 192.168.10.72
- proxmox3.kmdevlab.com -> 192.168.10.73

CNAME Records
- traefik.kmdevlab.com  -> docker1.kmdevlab.com

