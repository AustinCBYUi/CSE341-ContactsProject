const routes = require("express").Router();
const getContacts = require("./getContacts");

routes.use("/", require("./swagger"));
routes.use("/contacts", getContacts);
routes.use(
    "/",
    (docData = (req, res) => {
        let docData = {
            documentationURL: "idk.com",
        };
        res.send(docData);
    })
);

module.exports = routes;