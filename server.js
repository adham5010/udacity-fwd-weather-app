// Setup empty JS object to act as endpoint for all routes
const weatherData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of weatherApp
const weatherApp = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
weatherApp.use(bodyParser.urlencoded({ extended: false }));
weatherApp.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
weatherApp.use(cors());

// Initialize the main project folder
weatherApp.use(express.static('website'));
    
// Spin up the server
const port = 4201;
const server = weatherApp.listen(port, function () {
    console.log(`went Live on localhost: ${port}`);
});

// GET route returns weatherData
weatherApp.get('/all', function (request, response) {
    response.send(weatherData);
});

// POST route adds data to weatherData
weatherApp.post('/add', function (request, response) {
    newData = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    };

    weatherData.unshift(newData);
});