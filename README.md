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

Clone it, create a .env file folowing the .example.env, npm install and:

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

## Structure:

The application is fairly simple. My intention is to have a little node app that can scale pretty easy by adding new functionalities.

I use express with typescript since I am more familiar to that approach, but I have used other frameworks as well and plain node

The project structure is quite simple. We have a main index file where we inject the routes and middleware to be used application wide

Then, there is the routes folder. I like to keep that separated from the handlers. Like that I can also inject some middleware for the routes individually, validations, etc…. In this app, since it is a test and I don’t have much time, I added a simple validation for the Products route.

After that we have the middlewares, the general ones are a logger to log every request coming. I included a little sanitation function in utils to delete any sensitive information from the logs, like passwords

There is also an error middleware to get all the errors that we didn’t catch in our app, apart from that we also have the uncaughtException and unhandledRejection. But this way, the application will not become unstable and we can log the error and continue receiving more requests

And other middleware that are self explanatory by looking at the code.

Then, we have the handlers, those are the ones that receive the express requests and and call the right service to handle the requests. Also, there is a try catch on each handler, so any errors that happen below will be catch there. That’s why you will not see many try and catches in the services, cause the intention is to catch them at the highest level and handle them

Then, each domain or subdomain will get their own module or folder, so the inventory functionalities are in their own folder and so for the products.

Here we handle the business logic that we need, like erasing products but also updating the inventory. Obviously this is very light in this app since it is a test. In a real world up there would be more things to take in consideration, like transactions , etc…..

Also, the routes are not authenticated nor authorized in this test. Again, in a real world app we would have some kind or Role based Accessed Control with JWTs or the like. This routes in this test are not secured at all, no checking for injections either. But not been here does not mean I don’t know about those things

Also, as you can see in this app, I am a fun of Functional programming. I am used to developing micro services and found that a functional approach is faster, less error prone and easier to be tested since we normally use pure functions.
I included some basic test with Jest here, again just for this test and the time I had I did not include a lot of tests, but just to show you that I know how to do it.

Anyway, I hope I get the chance to explain this better over a video call in case you have further questions
