var User = require('../models').User;

module.exports = function(username, email, password) {
  User.register(new User({ username : username, email: email }), password, function(err, account) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Registered user ' + account.username);
    }
  });
};
