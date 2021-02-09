// Packages
const express = require('express'); //express framework
const bodyParser = require('body-parser'); //body parser helper
const fs = require('fs'); //serve JSON files

const port = 3000; //port

// Create an instance of express
const app = express();

// Configurating body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes/routes.js')(app,fs); //various routes

const server = app.listen(port, () => {
  console.log(`Connect with ${port}!`);
});
