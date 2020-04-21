
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

/**
 * We create the app variable and initialize it to be an Express Application
 */
const app = express();

// body parser is quite detailed so read the following article to understand how it works.
// Understanding how Body Parser works : https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point to static path to dist
// __dirname is retrieved from javascript as the directory name of the location of this file.
// which should be ~/Angular-CLI-Fullstack
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * Here we make a variable Routes equal to the routes.js file located in the server folder.
 * In the routes.js file we will make a function that returns all routes for the entire application
 * We then call the function in the Routes variable, giving it the express app variable and __dirname
 */
const Routes = require('./server/routes'); // Import all route endpoints
Routes(app, __dirname);

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// CREATE HTTP SERVER
const server = http.createServer(app);

// LISTEN ON PORT
server.listen(port, () => console.log(`API RUNNING ON LOCALHOST: ${port}`));