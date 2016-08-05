/*eslint-disable no-var, no-console*/
var express = require('express');
var colors = require('colors');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var router = express.Router();

var config = require('./config')[env];
require('./connectDB')(config); // Connect to MongoDB
require('./express')(app); // Executes all the express middleware, including route delegation
require('./passport')();

app.listen(config.port, function() {
  console.log('\nBackend server is running on port %s\n'.green, config.port);
});
