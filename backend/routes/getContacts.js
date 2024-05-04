/*
* Should be renamed to just contacts.js, but going to keep it as it is because it still retrieves contacts in some fashion.
*/

//Requires Express package.
const express = require("express");
//Declaring the contactController which is contacts.js
const contactController = require("../controllers/contacts");

//Using the express package's Router() function
const router = express.Router();

/*
* Establishing the imported functions from the controller, and how the router will use them.
* Any endpoint that is called with "/:id" will require an ID to work appropriately.
*/

//- Get Contact by all or single ID
router.get("/", contactController.getAll);
router.get("/:id", contactController.getSingle);

//- Create a new Contact
router.post("/", contactController.createContact);

//- Update a new contact by ID.
router.put("/:id", contactController.updateContact);

//- Delete a contact by ID.
router.delete("/:id", contactController.deleteContact);


module.exports = router;