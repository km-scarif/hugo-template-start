---
title:  "Docker Server"
date:   2024-11-01
---

# Setting up Docker Server

## Install Debian 12
- Base install
- No root password (automatically installs sudo for user)
- Setup with kmadmin user / default password

- Partition full drive
- Only install base utilities and ssh
- server name docker1 (also set in DNS)

### Copy ssh key for access
```bash
ssh-copy-id -i ~/.ssh/id_rsa_server_admin kmadmin@docker1
```
### SSH into server

### Install necessary packages for sysadmin
```bash
sudo apt update

# install sysadmin packages
sudo apt install vim htop

### Add to .bashrc and give some decent vim defaults
```bash
scp server-defaults/debian12/.vimrc  kmadmin@docker1:
cat ./server-defaults/debian12/bashrc-additions| ssh kmadmin@docker1 "cat >> ~/.bashrc"
```

## Install Docker
```bash
# Install prerequisites for Docker
sudo apt install ca-certificates curl

# Add Docker's official GPG key:
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# update the apt list
sudo apt update

# install docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# test docker
sudo docker run hello-world
```

## Add kmadmin to docker group
- `usermod -aG docker kmadmin`
- run `docker ps` to check permissions

## Make directory for docker volumes
- `mkdir /home/kmadmin/docker_volumes`




