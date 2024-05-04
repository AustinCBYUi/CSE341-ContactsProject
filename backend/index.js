/*
* Index.js is the api's heart, it controls where to find database connection, and how to find routes.
*/


/*
* Setting up 'wiring' of the api. Most of them are packages.
*/
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connect");
const getContactsRoute = require("./routes/getContacts");


/*
* Swagger controls that are used in other js files to generate the documentation
* for the API.
*/
const swaggerAutogen = require("swagger-autogen");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


/*
* Creating the port that is used in the .env file, OR default the port to 3000
* if it is either not running on a host / not working.
* Additionally, setting up the 'app' to use express.
*/
const port = process.env.PORT || 3000;
const app = express();


/*
* Setting up all of the app.use calls; most of these are packages or establishing the
* getContacts route.
*/
app
    .use(bodyParser.json())
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    
    .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})
    //Routes
    .use("/getContacts", getContactsRoute)


/* 
* Instantiate the connection to the database.
*/
mongodb.initDb((error) => {
    if (error) {
        console.log(error);
    } else {
        app.listen(port);
        console.log(`Connected to database, listening on ${port}.`);
    }
});