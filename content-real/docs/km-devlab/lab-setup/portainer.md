---
title:  "Portainer Install"
date:   2024-11-01
---

# Install Portainer

## Install via docker compose to run through traefik 

### First install Traefik and confirm running correctly

### Portainer Installation

- Create portainer required volume
```bash
docker volume create portainer_data
```
- Make directory for files
```bash
mkdir docker_volumes/portainer
```
- Creat docker-compose.yaml in portainer dir with the following
```yaml
services:
  portainer:
    image: portainer/portainer-ce:2.21.2
    command: -H unix:///var/run/docker.sock
    restart: always
    networks:
      - proxy
    # uncomment if you want to access on 9000
    # ports:
    #   - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data
    labels:
      # Frontend
      - "traefik.enable=true"
      - "traefik.http.routers.portainer.rule=Host(`portainer.kmdevlab.com`)"
      - "traefik.http.routers.portainer.entrypoints=https"
      - "traefik.http.routers.portainer.tls=true"
      - "traefik.http.services.portainer.loadbalancer.server.port=9000"

volumes:
  portainer_data:

networks:
  proxy:
    external: true

```
### Set password
- admin : km..admin.docker




## Install from command line without Traefik

### Create volume and run

```bash
docker volume create portainer_data

docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.21.2

```
### Login to Portainer web interface and set password
- [https://docker1:9443]
- Set default password -> docker..admin

