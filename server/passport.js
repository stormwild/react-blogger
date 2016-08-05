var Model = require('./models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  passport.use(new LocalStrategy(function(username, password, done) {
    Model.User.findOne({username: username}).exec(function(err, user) {
      if (user && user.authenticate(password)) {
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
};
