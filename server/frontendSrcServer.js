/*eslint-disable*/

var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('../config');
var webpackConfig = require('../webpack.config.dev');
var open = require('open');
var proxy = require('http-proxy-middleware');
var colors = require('colors');
var webpackDevMiddleware = require('webpack-dev-middleware');
var WebpackDevServer = require('webpack-dev-server');
var compiler = webpack(webpackConfig);

var frontendPort = 3000;
var backendPort = 5000;
var app = express();

if (config.hotReloadEnabled) {
  app.set('view engine', 'ejs');

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

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
}
else {
  webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080');

  var server = new WebpackDevServer(compiler, {
    contentBase: './src',
    quiet: true
  });
  server.listen(8080);
}
