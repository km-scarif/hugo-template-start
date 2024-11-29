---
title: "KW Docs Docker Stack"
date: 2022-10-31T10:56:00-04:00
summary: "Instructions for running KW Docs in Docker"
tags:
  - install
  - kwdocs
  - docker
---

# Docker Compose Stack
  
```yaml
version: '3.8'
services:
  kw-docs:
    deploy:
      labels:
        - "traefik.enable=true"
        - "traefik.http.middlewares.redirect-websecure.redirectscheme.scheme=https"
        - "traefik.http.routers.kw-docs.middlewares=redirect-websecure"
        
        - "traefik.http.routers.kw-docs.rule=Host(`kwdocs.kwtire.com`)"
        - "traefik.http.routers.kw-docs.entrypoints=web"
        - "traefik.http.services.kw-docs.loadbalancer.server.port=80"
        
        - "traefik.http.routers.kw-docs-https.rule=Host(`kwdocs.kwtire.com`)"
        - "traefik.http.routers.kw-docs-https.tls=true"
        - "traefik.http.routers.kw-docs-https.entrypoints=websecure"
      restart_policy:
        condition: on-failure
    image: registry.kwtire.com/kw-docs
    environment:
      GIT_REPO: https://JustinSolo:<key>@bitbucket.org/kwtire/kw-docs.git
    networks:
      - "kwdocs"
      - "traefik-proxy"

      
networks:
  kwdocs:
  traefik-proxy:
    external: true
```
