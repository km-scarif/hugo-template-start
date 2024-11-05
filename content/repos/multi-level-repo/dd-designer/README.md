---
title: About DD-Designer
---

## About dd-designer
This is a Rails website used for easily designing DataDroid reports.  
This project is still a WIP.

## Built With
- Ruby on Rails
  - Ruby 3.3.3
  - Rails 7.2
- Redis
- Tailwind CSS

## Development
Create a .env file in the root of the project and place all the needed environment variables. 
```
REDIS_SESSION_URL=redis://localhost:6379/7
REDIS_WORKSPACE_URL=redis://localhost:6379/6
REDIS_CACHE_URL=redis://localhost:6379/0
REPO_PATH=[/path/to/user/tmp/dd-designer
SEARCH_URL=http://localhost:5200
SEARCH_COLLECTION_PREFIX=dd-designer
DATADROID_SERVICE_URL=http://localhost:4000/api/v1
```

Run this command to set them...```export $(cat .env | xargs)```  
Then, run the project in development mode using ```./bin/dev```
