/*eslint-disable no-var, no-console*/

var express = require('express');
var colors = require('colors');
var routes = require('./routes');

var port = 5000;
var app = express();

require('./mongoose')();
app.use('/api', routes);

app.listen(port, function() {
  console.log('\nBackend server is running on port %s\n'.green, port);
});
