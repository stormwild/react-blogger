var cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
logger = require('morgan'),
routes = require('./routes'),
passport = require('passport');

module.exports = function(app) {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({secret: 'spartacus was here', resave: false, saveUninitialized: false}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(logger('dev'));

  // Delegate routes
  app.use('/api', routes);

  // Catch 404 and forward to error handler
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  // The error handler itself
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
          message: err.message,
          error: err
      });
  });
}
