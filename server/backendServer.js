/*eslint-disable no-var, no-console*/

var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require('./routes');

var port = 5000;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

require('./mongoose')();
app.use('/api', routes);

app.listen(port, function() {
  console.log('\nBackend server is running on port %s\n'.green, port);
});
