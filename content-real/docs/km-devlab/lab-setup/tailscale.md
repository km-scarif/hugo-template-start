---
title:  "Tailscale Network"
date:   2024-11-01
---

# Tailscale mesh network

## Installed tailscale on Linux servers

### Install command

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

- Then verify url link after install

## Server additional steps

### pihole

- Install tailscale
- Have to run tailscale up with the following:

```bash
tailscale up --accept-dns=false
```

- Tailscale admin console add as custom DNS server
- Split DNS for kmdevlab.com
- Disable key expiry

### router

- Install tailscale
- Enable IP forwarding:

```bash
echo 'net.ipv4.ip_forward = 1' | tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | tee -a /etc/sysctl.d/99-tailscale.conf
sysctl -p /etc/sysctl.d/99-tailscale.conf
```

- Run tailscale up with:

```bash
tailscale up --advertise-routes=192.168.10.0/23
```

- Tailscale admin console and edit route settings and check above routes

## Notes

- For routing to work on Linux boxes tailscale has to be started with:
  `sudo tailscale up --accept-routes`
