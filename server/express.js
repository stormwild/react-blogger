var cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
logger = require('morgan'),
routes = require('./routes'),
passport = require('passport'),
path = require('path'),
express = require('express');

module.exports = function(app) {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({secret: 'spartacus was here', resave: false, saveUninitialized: false}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, '../src/public')));

  // Delegate API routes
  app.use('/api', routes);

  // Catch API 404s and forward to the error handler
  app.use('/api/*', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // API Error handler itself
  app.use('/api/*', function(err, req, res, next) {
    res.status(err.status || 500);
    if (app.get('env') === 'development') {
      res.json({
        message: err.message,
        error: err
      });
    }
    // In production, don't leak the stack trace to the user
    res.json({
      message: err.message,
      error: {}
    });
  });

  // For all non-API routes, serve the index page (React Router resolves the route on the client side)
  app.get('*', function(req, res) {
    console.log(req.user);
    res.render(path.join( __dirname, '../src/index.ejs'), {
      user: req.user || 'unauthenticated'
    });
  });
}
