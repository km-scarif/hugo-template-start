---
title: "Elastic / Kibana"
date: 2022-10-26T11:30:02-04:00
summary: "Instructions for running Elastic Search and Kibana in Docker"
tags:
  - install
  - elastic
  - kibana
  - docker
---

# Elastisearch / Kibana

## Setup

Running elastic search requires a change to the host machine.

- Edit `/etc/sysctl.conf`
- Add the following to the file: `vm.max_map_count=262144`
- Load this change with the following command: `sudo sysctl --system`

## Docker Stack

**Note:** Version 7 is the last one to not use enrollment tokens.
  
```yaml
version: "3"
services:
  elasticsearch:
    image: elasticsearch:7.17.6
    container_name: elasticsearch
    environment:
    - node.name=elasticsearch
    - cluster.initial_master_nodes=elasticsearch
    - bootstrap.memory_lock=false
    - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    ulimits:
      memlock:
        soft: -1
        hard: -1
  kibana:
    image: kibana:7.17.6
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      ELASTICSEARCH_URL: http://elasticsearch:9200
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
      SERVER_PUBLICBASEURL: http://docker1.kwtire.com:5601
```
