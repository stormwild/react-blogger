var cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
logger = require('morgan'),
routes = require('./routes'),
passport = require('passport'),
path = require('path');

module.exports = function(app) {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({secret: 'spartacus was here', resave: false, saveUninitialized: false}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(logger('dev'));

  // Delegate API routes
  app.use('/api', routes);

  // For all non-API routes, serve the index page (React Router resolves the route on the client side)
  app.get('*', function(req, res) {
    console.log(req.user);
    res.render(path.join( __dirname, '../src/index.ejs'), {
      user: req.user
    });
  });
}
