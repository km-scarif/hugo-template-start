---
title:  "dd-render-html HTML Rendering Microservice"
date:   2024-10-15
tags:   microservice
---

## About Render HTML
This microservice processes a DataDroid datasource and formats to HTML using Handlebars templating.

## Built With
- Node.js
- Express 4.17
- Handlebars 4.7.7

## Development
Create a .env file in the root of the project and place all the needed environment variables. 
```
NODE_ENV=development
PORT=5100
```

Run this command to set them...```export $(cat .env | xargs)```  
Then, run the project in development mode using ```node index.js``` or ```nodemon index.js```

## Deploy
Deploy the container using the kubernetes yamls in datadroid. See https://github.com/km-scarif/datadroid.

## Routes
POST /render
```
header: {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

body: {
    template: [handlebars-template-contents],
    data: [
        {"field1":"value1", "field2":"value2", ...},
        ...
    ]
}
```
