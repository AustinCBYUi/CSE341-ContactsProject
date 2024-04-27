const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log("Contacts Database is already initialized.");
        return callback(null, _db);
    }
    MongoClient.connect(process.env.DB_CONNECTION)
    .then((client) => {
        _db = client;
        callback(null, _db);
    })
    .catch((error) => {
        callback(error);
    });
};

const lassoDb = () => {
    if (!_db) {
        throw Error("Database is not initialized!");
    }
    return _db;
};


module.exports = {
    initDb,
    lassoDb
};