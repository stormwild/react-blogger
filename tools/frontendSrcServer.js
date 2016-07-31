/*eslint-disable*/

var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('../webpack.config.dev');
var open = require('open');
var proxy = require('http-proxy-middleware');
var colors = require('colors');

var frontendPort = 3000;
var backendPort = 5000;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Any request to the frontend server at localhost:3000/api/* will be forwarded to the backend server at localhost:5000/api/*
app.use('/api', proxy({
  target: 'http://localhost:' + backendPort
}));

app.get('*', function(req, res) {
  if (req.accepts('html')) {
    res.sendFile(path.join( __dirname, '../src/index.html'));
  }
});

app.listen(frontendPort, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('\nFrontend dev server is running on port %s\n'.green, frontendPort);
    open('http://localhost:' + frontendPort);
  }
});
