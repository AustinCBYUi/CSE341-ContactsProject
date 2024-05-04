/*
* contacts.js is the controller, which embodies the 'endpoints' or functions that control the API commands basically.
*/
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;


/*
* getAll is an asynchronous function, it will establish connection with the database,
* then convert all data inside as a json to be displayed.
*/
const getAll = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const result = await mongodb.lassoDb().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};


/*
* getSingle is an asynchronous function, it will establish connection with the database,
* then convert one single ID request into a json to be displayed to the user.
*/
const getSingle = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contactId = ObjectId.createFromHexString(req.params.id); //Was new ObjectId(req.params.id);
    const result = await mongodb.lassoDb().db().collection("contacts").find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
};


/*
* createContact is an asynchronous function, it will establish connection with the database,
* then create a new contact with firstname, lastname, email, favcolor, and birthday as datapoints.
* It will use the insertOne function to then add the new contact to the database.
*/
const createContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.lassoDb().db().collection("contacts").insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to create the contact.");
    }
};


/*
* updateContact is an asynchronous function, it will establish connection with the database
* then update a contact with firstname, lastname, email, favcolor, and birthday as datapoints.
* It will update whatever has been modified.
*/
const updateContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contactId = ObjectId.createFromHexString(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.lassoDb().db().collection("contacts").replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to update the contact..!");
    }
};


/*
* deleteContact is an asynchronous function, it will establish connection with the database
* then delete a contact specified by the contactId.
*/
const deleteContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contactId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.lassoDb().db().collection("contacts").deleteOne({ _id: contactId });
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to delete the contact..!");
    }
};


/*
* Exports the endpoints to other portions of the API.
*/
module.exports = { 
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};