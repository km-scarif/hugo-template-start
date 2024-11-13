---
title: "Overview of DataDroid Reporting Stack"
date:  2024-10-01
---

## About DataDroid
This is the DataDroid Reporting stack. This includes the DataDroid engine and runner.

## Apps
- dd-service (Rails) - DataDroid Service API
- dd-service-yaml-provider (Node.js) - YAML provider service
- dd-search (Node.js) - Search service
- dd-post-formatter (Node.js) - Post processing service
- dd-dataframes (Python) - Pandas dataframe service
- dd-render-chart (Node.js) - Chart rendering service
- dd-render-html (Node.js) - HTML rendering service
- dd-runner (Rails) - Developer Tool UI to run reports

## Documentation
See the [DataDroid Documentation](https://dd-service.kmdevlab.com/docs) for complete details on how to create and design DataDroid report yamls.

## Deploy
Build each app using the supplied ```deploy.sh``` script in each app folder.

The DataDroid stack is deployed using Kubernetes.  All the yamls for the entire stack, including any microservice dependencies, are included in the *deployments* folder.

To manage deployments to mutiple environments and contexts, some tools should be installed, like k9s, krew, konfig, ctx, ns. For more information, see the kubernetes documentation at https://docs.kmdevlab.com.

Open a terminal from the deployments folder to run any of the Kubernetes deployment commands.

### Namespace
For a fresh install you first need to create the namespace
```
kubectl apply -f namespace.yaml
kubens [namespace name]
```

**Note:**
```kubens``` command assumes you installed the kubernetes tool ns and created an alias for this command.  See the kubernetes notes at https://docs.kmdevlab.com. 

### Secrets
For a fresh install you next need to setup the secrets. Create a ```secrets``` folder in the environment you wish to deploy.  These **MUST NOT** be checked into git...after all, they are *secrets*.

Create a secret yaml in the secrets folder with the following template...
```
apiVersion: v1
kind: Secret
metadata:
  name: [secret-name]
  namespace: [namespace]
type: Opaque
data:
  [key]: [value as base64]
```

The ```key``` will be the name of the key being defined.  
The ```value as base64``` will be a base64 encoded string of the value desired.

You can build these base64 strings like so...
```
echo -n 'the-secret-password-or-token' | base64
```

For example, "supersecretvalue" would output ```c3VwZXJzZWNyZXR2YWx1ZQ==```

The DataDroid stack requires a number of secrets and keys.

datadroid-runner uses...
- dd-auth.yaml
  - password

datadroid-engine uses...
- email-auth.yaml
  - username
  - password
- mailgun-auth.yaml
  - key
- tiresoft-auth.yaml
  - authtoken (this was being developed for Tiresoft API calls)

Once all the secret yamls are created, you can apply them like this.
```
kubectl apply -f environments/[environment]/secrets
```
where environment is production or testing, etc.

### Deploy Configuration
Anytime a yaml file changes OR on a fresh install, you apply the kustomization environment using...
```
kubectl apply -k environments/[environment]
```
where environment is production or testing, etc.

### Deploy Docker Images
When you simply need to update some pods with a new Docker image file, you need to do a rollout of the deployment.

This is done with the following command...
```
kubectl rollout restart deployment [name of deployment]
```

The name of the deployment is the name of the container defined in the deployment.yaml. An easy way to tell is just to look at your running pods in k9s.
