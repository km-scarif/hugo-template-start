---
title:  Install Docker Registry
date:  2022-10-10
---

# Install Docker Registry

## Create directories on docker server

```bash
cd docker_volumes
mkdir registry
cd registry
mkdir data
```

## Docker compose yaml

```yaml
version: "3"

services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    environment:
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /data
    volumes:
      - /home/kmadmin/docker_volumes/registry/data:/data
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.registry.rule=Host(`registry.kmdevlab.com`)"
      - "traefik.http.routers.registry.entrypoints=https"
      - "traefik.http.routers.registry.tls=true"
      - "traefik.http.services.registry.loadbalancer.server.port=5000"
    networks:
      - proxy

networks:
  proxy:
    external: true
```

## Deployment

- Deployed via Portainer on Docker server
