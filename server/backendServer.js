/*eslint-disable no-var, no-console*/
var express = require('express');
var colors = require('colors');
// Needed for passport
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Model = require('./models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var router = express.Router();

var config = require('./config')[env];
require('./connectDB')(config); // Connect to MongoDB
require('./express')(app); // Executes all the express middleware, including route delegation

passport.use(new LocalStrategy(function(username, password, done) {
  Model.User.findOne({username: username}).exec(function(err, user) {
    if (user) {
      return done(null, user);
    }
    else {
      return done(null, false);
    }
  });
}));

passport.serializeUser(function(user, done) {
  if (user) {
    done(null, user._id);
  }
});

passport.deserializeUser(function(id, done) {
  Model.User.findOne({_id: id}).exec(function(err, user) {
    if (user) {
      return done(null, user);
    }
    else {
      done(null, false);
    }
  });
});

app.listen(config.port, function() {
  console.log('\nBackend server is running on port %s\n'.green, config.port);
});
