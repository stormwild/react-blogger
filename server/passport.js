var User = require('./models').User;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser(function() {console.log('hello')}));
  passport.deserializeUser(User.deserializeUser());
};
