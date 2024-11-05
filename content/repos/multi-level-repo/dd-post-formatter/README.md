---
title: About Post Formatter
date:  2023-09-09
---

## About Post Formatter
This microservice processes a DataDroid datasource and formats values like dates, numbers, phones.

## Built With
- Node.js
- Express 4.17
- Moment 2.29
- Numeral 2.0

## Development
Create a .env file in the root of the project and place all the needed environment variables. 
```
NODE_ENV=development
PORT=5000
```

Run this command to set them...```export $(cat .env | xargs)```  
Then, run the project in development mode using ```node index.js``` or ```nodemon index.js```

## Deploy
Deploy the container using the kubernetes yamls in datadroid. See https://github.com/km-scarif/datadroid.

## Routes
POST /format
```
header: {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

body: {
    datasource: [
        {"field1":"value1", "field2":"value2", ...},
        ...
    ],
    config: [
        {
            "fields": [
                "[field-name]",
                ...
            ],
            "format_type": "date | number | phone",
            "pattern": "[pattern-here]"
        },
        ...
    ]
}
```

Dates use [moment.js](https://momentjs.com/docs/#/displaying/) for patterns.  
Numbers use [numeral.js](http://numeraljs.com/#format) for patterns.
