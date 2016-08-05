var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var initDB = require('./initDB');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function() {
    initDB();
  });
};
