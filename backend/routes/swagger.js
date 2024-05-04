/*
* Used to just generate documentation for the api.
* This is executed as a route on its own, similar to the contacts routes.
*/

//Declarations
const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

//Routes
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

//Export to router.
module.exports = router;