---
title:  "dd-runner DataDroid Reporting Frontend"
date:   2024-10-15
---

## About dd-runner
This is a Rails website used for easily running DataDroid reports.

## Built With
- Ruby on Rails
  - Ruby 3.1.0
  - Rails 7
- Redis
- Tailwind CSS

## Development
Create a .env file in the root of the project and place all the needed environment variables. 
```
RAILS_ENV=development
RAILS_SERVE_STATIC_FILES=true
RAILS_LOG_TO_STDOUT=true
DD_SERVICE_YAML_PROVIDER_URL=http://localhost:5800
DD_SERVICE_URL=http://localhost:4000/api/v1
DD_SEARCH_URL=http://localhost:5200
DD_PASSWORD=[password]
REDIS_URL=[redis-connection-url]
```

Run this command to set them...```export $(cat .env | xargs)```  
Then, run the project in development mode using ```./bin/dev```

## Deploy
Build and push the docker image using the ```deploy.sh``` script. Deploy the container using the kubernetes yamls in datadroid. See https://github.com/km-scarif/datadroid.
