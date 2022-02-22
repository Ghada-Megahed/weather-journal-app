// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Require cors
const cors = require("cors");
// Require bodyParser
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 8080;
// Setup Server
app.listen(port, listening);
function listening() {
    console.log(`The server is running on localhost: ${port}`);
};

// GET route setup 
app.get("/all", sendData);
function sendData(req, res) {
    // Return Endpoint Data
    res.send(projectData);
}

// POST Route
app.post("/setData", postData);
function postData(req, res) {
    projectData = req.body;
    res.send();
}


