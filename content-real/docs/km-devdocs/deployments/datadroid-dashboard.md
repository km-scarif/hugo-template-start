---
title: "DataDroid Dashboard"
date: 2022-11-03T11:30:02-04:00
summary: "Deployment Instructions for deploying the dashboard for DataDroid"
tags:
  - deploy
  - datadroid
  - dashboard
---

# Datadroid Dashboard

## TLS Setup

You must only do this setup one time.  

- Using the default namespace...

`kubens default`

- Create a tls secret.

`kubectl create secret tls kw-wildcard-cert --cert=/path/to/star_kwtire_com.pem --key=/path/to/star_kwtire_com.key`

- Create a TLS Store.

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: TLSStore
metadata:
  name: default
spec:
  defaultCertificate:
    secretName: kw-wildcard-cert
```

## Deploy

Checkout the dd-deployments project from Bitbucket.

`https://bitbucket.org/kwtire/dd-deployments/src/master/`

Ensure you are in the correct kubectx, then under kube/datadroid-dashboard...

- Create the namespace

`kubectl apply -f dd-namespace.yaml`

- Deploy the desired [environment] (production | testing | development)

`kubectl apply -k environments/[environment]`
