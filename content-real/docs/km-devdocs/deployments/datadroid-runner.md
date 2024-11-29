---
title: "DataDroid Runner"
date: 2022-11-03T11:30:02-04:00
summary: "Deployment Instructions for deploying the runner for DataDroid"
tags:
  - deploy
  - datadroid
  - runner
  - reports
---

# DataDroid Runner

## Deploy

Checkout the dd-deployments project from Bitbucket.

`https://bitbucket.org/kwtire/dd-deployments/src/master/`

Ensure you are in the correct kubectx, then under kube/datadroid-runner...

- Create the namespace

`kubectl apply -f dd-namespace.yaml`

- Deploy the desired [environment] (production | testing | development)

`kubectl apply -k environments/[environment]`
