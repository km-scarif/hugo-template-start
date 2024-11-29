---
title: "KW Info Deploy"
date: 2023-11-09T13:30:00-04:00
summary: "Deployment Instructions for deploying the info site"
tags:
  - deploy
  - info
---

# KW Info Deploy

Checkout the kw.info.deployments project from Bitbucket.

`https://bitbucket.org/kwtire/kw.info.deployments/src/master/`

Ensure you are in the correct kubectx, then...

- Create the namespace

`kubectl apply -f namespace.yaml`

- Deploy the desired [environment] (prod | test | dev)

`kubectl apply -f redis-session`

`kubectl apply -f meilisearch`

`kubectl apply -f kw-search`

`kubectl apply -f kw-info`
