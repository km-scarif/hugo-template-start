---
title:  "dd-render-chart Render Chart"
date:   2024-10-15
tags:   microservice
---

## About Render Chart
This microservice processes a DataDroid datasource and outputs a chart using the D3 library.

## Built With
- Node.js
- Express 4.17
- D3 7.3.0

## Development
Create a .env file in the root of the project and place all the needed environment variables. 
```
NODE_ENV=development
PORT=5300
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
    data: [
        {"field1":"value1", "field2":"value2", ...},
        ...
    ],
    settings: {
        [chart-settings-go-here]
    }
}
```

See the detailed [DataDroid documentation](https://dd-service.kmdevlab.com/docs#display) for the chart settings.
