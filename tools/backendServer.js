/*eslint-disable no-var, no-console*/

var express = require('express');
var colors = require('colors');

var port = 5000;
var app = express();

app.get('/api', function(req, res) {
  res.json({key: 'value'});
});

app.get('*', function(req, res) {
  res.send('Backend server working correctly');
});

app.listen(port, function() {
  console.log('\nBackend server is running on port %s\n'.green, port);
});
