---
title: Forecasting API
date:  2023-10-01
---

## About Forecasting API
This software is a reworked excerpt that was being developed for use in Tiresoft v3.
This api allows generating forecasting constants and forecasting a single item.

## Built With
- Python 3.9.12
- Flask 2.1.1
- waitress 2.1.1
- matplotlib 3.5.1
- numpy 1.22.3
- pandas 1.4.1
- scipy 1.8.0
- geopandas 0.10.2

## Getting Started
This project requires Docker to get up and running.

Checkout the code at https://github.com/km-scarif/datadroid. 
Run the deploy.sh script in the root of the project to build the image and push it to the registry at registry.kmdevlab.com.

Run like this...  
(w/live reload) FLASK_APP=dataframes FLASK_ENV=development flask run -p <port>
(container) docker-compose up

## Deploy
Deploy the container using the kubernetes yamls in datadroid. See https://github.com/km-scarif/datadroid.
