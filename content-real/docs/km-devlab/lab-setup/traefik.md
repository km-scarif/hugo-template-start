---
title:  "Traefik Installation"
date:   2024-11-01
---

# Install Traefik

- Based on [https://technotim.live/posts/traefik-3-docker-certificates/]
- Installed on Docker server

## Traefik install with test cert

- Install the apache2-utils package to get htpasswd needed later

```bash
sudo apt install apache2-utils
```

- Make the Traefik directory

```bash
mkdir traefik
cd traefik
touch docker-compose.yaml
```

- Edit docker-compose.yaml with the following

```yaml
services:
  traefik:
    image: traefik:v3.1
    container_name: traefik
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    networks:
      - proxy
    ports:
      - 80:80
      - 443:443
      - 3306:3306
      # - 443:443/tcp # Uncomment if you want HTTP3
      # - 443:443/udp # Uncomment if you want HTTP3
    environment:
      #CF_DNS_API_TOKEN_FILE: /run/secrets/cf_api_token # note using _FILE for docker secrets
      CF_DNS_API_TOKEN: ${CF_DNS_API_TOKEN} # if using .env
      TRAEFIK_DASHBOARD_CREDENTIALS: ${TRAEFIK_DASHBOARD_CREDENTIALS}
    #   secrets:
    #     - cf_api_token
    env_file: .env # use .env
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./data/traefik.yml:/traefik.yml:ro
      - ./data/acme.json:/acme.json
      # - ./data/config.yml:/config.yml:ro
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.traefik.entrypoints=http"
      - "traefik.http.routers.traefik.rule=Host(`traefik.kmdevlab.com`)"
      - "traefik.http.middlewares.traefik-auth.basicauth.users=${TRAEFIK_DASHBOARD_CREDENTIALS}"
      - "traefik.http.middlewares.traefik-https-redirect.redirectscheme.scheme=https"
      - "traefik.http.middlewares.sslheader.headers.customrequestheaders.X-Forwarded-Proto=https"
      - "traefik.http.routers.traefik.middlewares=traefik-https-redirect"
      - "traefik.http.routers.traefik-secure.entrypoints=https"
      - "traefik.http.routers.traefik-secure.rule=Host(`traefik.kmdevlab.com`)"
      - "traefik.http.routers.traefik-secure.middlewares=traefik-auth"
      - "traefik.http.routers.traefik-secure.tls=true"
      - "traefik.http.routers.traefik-secure.tls.certresolver=cloudflare"
      - "traefik.http.routers.traefik-secure.tls.domains[0].main=kmdevlab.com"
      - "traefik.http.routers.traefik-secure.tls.domains[0].sans=*.kmdevlab.com"
      - "traefik.http.routers.traefik-secure.service=api@internal"

#secrets:
#  cf_api_token:
#    file: ./cf_api_token.txt

networks:
  proxy:
    external: true
```

- make the traefik data dir and create files

```bash
# make the .env file
touch .env
# make the data dir
mkdir data
# change to the data dir
cd data
touch acme.json
chmod 600 acme.json
touch traefik.yml
```

- copy the following into traefik.yml

```yaml
api:
  dashboard: true
  debug: true
entryPoints:
  http:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: https
          scheme: https
  https:
    address: ":443"
  mysql:
    address: ":3306"
serversTransport:
  insecureSkipVerify: true
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
  # file:
  #   filename: /config.yml
certificatesResolvers:
  cloudflare:
    acme:
      email: jeffrey.hood@gmail.com
      storage: acme.json
      # caServer: https://acme-v02.api.letsencrypt.org/directory # prod (default)
      caServer: https://acme-staging-v02.api.letsencrypt.org/directory # staging
      dnsChallenge:
        provider: cloudflare
        #disablePropagationCheck: true # uncomment this if you have issues pulling certificates through cloudflare, By setting this flag to true disables the need to wait for the propagation of the TXT record to all authoritative name servers.
        #delayBeforeCheck: 60s # uncomment along with disablePropagationCheck if needed to ensure the TXT record is ready before verification is attempted
        resolvers:
          - "1.1.1.1:53"
          - "1.0.0.1:53"
```

- Create the Docker proxy network
  `docker network create proxy`
- Create the Cloudflare api token file on Cloudflare
- Create the hashed password (used the same password as the login for the kmadmin user)

```bash
echo $(htpasswd -nB admin) | sed -e s/\\$/\\$\\$/g
```

- Copy the result to put in the .env file
- Edit the .env and put in the following (keys and values)

```
TRAEFIK_DASHBOARD_CREDENTIALS=admin:$$2y$$05$$jQ/AoPPZtoTsMH/VtT67CO8VbSPTX5Q3YFkbpVg6sYKc/ZH9wEPmu
CF_DNS_API_TOKEN=LM4IRDPN6axQiF2mbOTpOxtINe6WkerSnFruuE27
```

- Start the stack
  `docker compose up -d --force-recreate`
- Check if running correctly
  - `docker logs traefik` should not have errors
  - `cat data/acme.json` should show data
  - `docker ps` should show container running with no crash loop
  - `docker exec -it traefik /bin/sh` if necessary for further troubleshooting
- Make DNS entries pointing to the server, and confirm everything is working with going to
  - traefik.kmdevlab.com
  - Should see the traefik login page and be able to get into the web interface

## Switch to production certs

- In the traefik.yml file, switch to the production caServer url
- Delete the data/acme.json file and recreate

```bash
rm acme.json
touch acme.json
chmod 600 acme.json
```

- Restart Traefik
- Give it a minute to get the cert
- Check logs and check cert on login page

## Config for external services

- Create config.yml in the data dir (docker_volumes/traefik/data)

```yaml
http:
  #region routers
  routers:
    proxmox:
      entryPoints:
        - "https"
      rule: "Host(`proxmox.kmdevlab.com`)"
      middlewares:
        - default-headers
        - https-redirectscheme
      tls: {}
      service: proxmox
    pihole:

  #endregion
  #region services
  services:
    proxmox:
      loadBalancer:
        servers:
          - url: "https://192.168.10.71:8006"
        passHostHeader: true
  #endregion
  middlewares:
    https-redirectscheme:
      redirectScheme:
        scheme: https
        permanent: true
    default-headers:
      headers:
        frameDeny: true
        browserXssFilter: true
        contentTypeNosniff: true
        forceSTSHeader: true
        stsIncludeSubdomains: true
        stsPreload: true
        stsSeconds: 15552000
        customFrameOptionsValue: SAMEORIGIN
        customRequestHeaders:
          X-Forwarded-Proto: https

    default-whitelist:
      ipAllowList:
        sourceRange:
          - "10.0.0.0/8"
          - "192.168.0.0/16"
          - "172.16.0.0/12"

    secured:
      chain:
        middlewares:
          - default-whitelist
          - default-headers
```

- Uncomment line in docker-compose.yaml
  `- ./data/config.yml:/config.yml:ro`
- Uncomment lines in traefik.yml

```yaml
file:
  filename: /config.yml
```
