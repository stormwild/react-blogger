/*eslint-disable*/

var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('../config');
var webpackConfig = require('../webpack.config.dev');
var open = require('open');
var proxy = require('http-proxy-middleware');
var colors = require('colors');

var frontendPort = 3000;
var backendPort = 5000;
var app = express();
var compiler = webpack(webpackConfig);

app.set('view engine', 'ejs');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

if (config.hotReloadEnabled) {
  app.use(require('webpack-hot-middleware')(compiler));
}

// Forward all requests to a separate server. By doing this, the backend can use nodemon without rebuilding the webpack bundle on each server file change.
app.use('*', proxy({
  target: 'http://localhost:' + backendPort
}));

app.listen(frontendPort, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('\nFrontend dev server is running on port %s\n'.green, frontendPort);
    open('http://localhost:' + frontendPort);
  }
});
