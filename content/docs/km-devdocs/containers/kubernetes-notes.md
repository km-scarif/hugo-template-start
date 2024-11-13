---
title: "Kubernetes Notes"
date: 2022-07-31T11:30:02-04:00
summary: "Things we have learned about Kubernetes"
tags:
  - sysadmin
  - kubernetes
  - tls
  - ingress
---

# Kubernetes Notes

## Create a secret from values in a file

```bash
kubectl create secret generic name-of-secret 
  --from-file=filename.ext=/path/to/file.ext 
  --from-file=another.one=/path/to/file/another.ext
```

## Create TLS Secret and Store for certificates

### Create Secret

First create a TLS secret in the default namespace.

```bash
kubectl create secret tls name-of-secret --cert certificate_name.pem --key certificate_name.key
```

### TLS Store

Then create a TLS Store pointing to your TLS secret.

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: TLSStore
metadata:
  name: default
spec:
  defaultCertificate:
    secretName: kw-wildcard-cert
```

## HTTPS Redirect and Ingress

### Redirect

Create middleware to handle the redirect from http to https.

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: redirect
  namespace: my-namespace
spec:
  redirectScheme:
    scheme: https
    permanent: true
```

### Ingress

#### HTTP

Add these annotations to the http ingress yaml.

**Note:** The middleware name syntax is `namespaceName-middlewareName`

```yaml
annotations:
  traefik.ingress.kubernetes.io/router.entrypoints: web
  traefik.ingress.kubernetes.io/router.middlewares: my-namespace-redirect@kubernetescrd
```

#### HTTPS

Add these annotations to the https ingress yaml.

```yaml
annotations:
  traefik.ingress.kubernetes.io/router.entrypoints: websecure
  traefik.ingress.kubernetes.io/router.tls: "true"
```

## Mount Config File

### ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: name-of-my-config
  namespace: my-namespace
data:
  name-of-file.yaml: |
    file-contents:
      - go here
      - and here
```

### Deployment

Add the following to your deployment...

**Note:** The `name-of-my-config` must match the name of the ConfigMap above. The `mountPath` will be the location of the file in the container.

```yaml
spec:
  template:
    spec:
      volumes:
        - name: config
          configMap:
            name: name-of-my-config
      containers:
        - image: registry.kwtire.com/image-name
          name: name-of-container
          volumeMounts:
            - name: config
              mountPath: "/app/mounted/path/"
              readOnly: true
```

## Mount Secret as File

Add the following to your deployment...

**Note:** The `mountPath` will be the location of the file in the container.

```yaml
spec:
  template:
    spec:
      volumes:
        - name: config
          secret:
            secretName: name-of-secret
            optional: false
      containers:
        - image: registry.kwtire.com/image-name
          name: name-of-container
          volumeMounts:
            - name: config
              mountPath: "/app/mounted/path/"
              readOnly: true
```
