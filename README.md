# Inventory test

## Description:

Back end solution for the inventory test

It is composed of 2 routes.

### Delete Product

there is a delete request to /products
it needs at least a where query param or else the request will not go through
the request looks like:

```bash
curl --location -g --request DELETE 'http://localhost:5000/products?where[0][name]=Dining%20Table'
or
http://localhost:5000/products?where[0][name]=Dining Table

```

### Get Inventory

there is also a get request to /inventory
this can be done with or without a where param

For example, to get all the articles in the inventory you can do:

```bash
curl --location --request GET 'http://localhost:5000/inventory'

or

http://localhost:5000/inventory

```

if you want to get a spececific product you would do like:

```bash
curl --location -g --request GET 'http://localhost:5000/inventory?where[0][name]=table%20top'

or

http://localhost:5000/inventory?where[0][name]=table top
```

## Run it

### Run local

Clone it, create a .env file folowing the .example.env, run redis locally, npm install and:

```bash
npm run start:tsnode
```

### Run with docker:

Clone it, create a .env file folowing the .example.docker.env, and:

```bash
docker-compose build
docker-compose up
```

I mapped port 5000 so if you execute it on your local machine just do after do http://localhost:5000/inventory

```bash

```
