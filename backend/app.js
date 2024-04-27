const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connect");
const getContactsRoute = require("./routes/getContacts");

const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    
    .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

    .use("/getContacts", getContactsRoute);

//Initialize Database
mongodb.initDb((error, mongodb) => {
    if (error) {
        console.log(error);
    } else {
        app.listen(port);
        console.log(`Connected to database, listening on ${port}.`);
    }
});