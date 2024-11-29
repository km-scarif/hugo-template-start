---
title: "Wholesale API - [FM title]"
date: 2022-10-21
summary: "Wholesale API Documentation"
tags:
  - api
---

# Wholesale API

## HTTP Request

Base URL for all requests: `https://wholesale.kwtire.com`

All API requests must include the following in the request headers:

- X-*CLIENTCODE*-authtoken
- X-*CLIENTCODE*-accountnumber
- X-*CLIENTCODE*-accountpassword
  
*CLIENTCODE* will be replaced with the api code assigned to your integration.
All error responses have X-Status-Reason header.

## Available Services

- Account Shipping Addresses
- Vendor Listing
- Inventory Listing
- Inventory Detail
- Order Placement

### Account Shipping Addresses
  
Returns the account shipping address
  
#### Shipping Address URL: (GET)

`/api/:client_code/ship_address`

#### Shipping Address Parameters

- required: none
- optional: none

#### Shipping Address Return Value

```json
[
    {
        "id": 233,
        "company": "Bob's Tire",
        "address1": "123 Main Street",
        "address2": "",
        "city": "Lancaster",
        "state": "PA",
        "zip": "17603",
        "is_default": true
    }
]
```

### Vendor Listing

Returns available vendors

#### Vendor Listing URL: (GET)

`/api/:client_code/vendors`

#### Vendor Listing Parameters

- required:  none
- optional:  none

#### Vendor Listing Return Value

```json
[
    {
        "code":     "COOPER",
        "vendor":   "Cooper"
    },
    {
        "code":     "NEXEN",
        "vendor":   "Nexen"
    },
    {
        "code":     "GENERA",
        "vendor":   "General"
    }
]
```

### Inventory Listing

Returns available inventory and pricing

#### Inventory Listing URL: (GET)

`/api/:client_code/inventory`

#### Inventory Listing Parameters

- required:  none
- optional:  vendor_code, item_number, tire_size

#### Inventory Listing Return Value

```json
[
    {
        "vendor_part_number":   "11125",                            // part number
        "part_number":          "5832",                             // inventory id
        "size":                 "2256016",                          // tire size
        "manufacturer":         "Cooper",                           // vendor
        "ref_code":             "01",                               // division code
        "speed_rating":         "97S",                              // speed rating
        "ply":                  "SL",                               // ply
        "description":          "TRENDSETTER SE",                   // description
        "lettering":            "WW",                               // lettering code
        "qty":                  26,                                 // calculated
        "price":                100.32                              // calculated
    },
    {
        "vendor_part_number":   "11127",
        "part_number":          "5833",
        "size":                 "2256017",
        "manufacturer":         "Cooper",
        "ref_code":             "01",
        "speed_rating":         "97S",
        "ply":                  "SL",
        "description":          "TRENDSETTER SE",
        "lettering":            "WW",
        "qty":                  16,
        "price":                123.97
    }
]
```

### Inventory Detail

Returns additional details and image (if available)

#### Inventory Detail URL: (GET)

`/api/:client_code/inventory/:part_number/detail`

#### Inventory Detail Parameters

- required: part_number (placed in url)
- optional: none

#### Inventory Detail Return Value

```json
{
    "inventory_item_detail": {
        "attributes": [
          "Passenger",
          "Snow"
        ],
        "utqg": "440 A B",
        "unit_of_measure": "1",
        "weight": 20,
        "image": "http://kw-tiresoft-tire-images.s3.amazonaws.com/co_trendsetter_se_l.jpg"
    }
}
```

### Order Placement

Accepts an order and returns confirms successful placement

#### Order Placement URL: (POST)

`/api/:client_code/order`

#### Order Placement Parameters

- required:   order (json document)

```json
{
    "account_number":   "112345",
    "shipping_address": "233",                  // blank if default
    "po_number":        "1138",                 // customer generated number
    "notes":            "notes for the order",
    "items":
        [
            {
                "part_number":  "5832",  //01310
                "qty":          2
            },
            {
                "part_number":  "5833",  //01311
                "qty":          5
            }
        ]
}
```

#### Order Placement Return Value

```json
{
    "success": true,
    "validation_messages": [ "message about what was modified due to invalid quantities" ]
}
```
