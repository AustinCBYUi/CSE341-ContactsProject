const swaggerAutogen = require("swagger-autogen")();

const document = {
    info: {
        title: "Contacts API",
        description: "Contacts API is designed to CRUD contacts from a database.",
    },
    host: "localhost:8080",
    schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//This is running the function to generate the json.
// swaggerAutogen(outputFile, endpointsFiles, document);
swaggerAutogen(outputFile, endpointsFiles, document).then(async () => {
    await import("./index.js");
});