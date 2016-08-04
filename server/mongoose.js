var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var connectionString = require('./dbConnectionString');
var Model = require('./models');
var dummyData = require('./dummyData');

module.exports = function() {
  mongoose.connect(connectionString);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function() {
    initDB();
  });

  function initDB() {
    console.log('app db opened');
    return new Promise(function(resolve, reject) {
      return Model.User.find({}).exec(function(err, users) {
        if (users.length > 0) {
          console.log('db already initialized');
          reject(users);
        }
        else {
          resolve(users);
        }
      }); 
    })
    .then(function() {
      return Model.User.remove({}).exec();
    })
    .then(function() {
      return Model.Blog.remove({}).exec()
    })
    .then(function() {
      return Model.Post.remove({}).exec()
    })
    .then(function() {
      return Model.User.create(dummyData.users);
    })
    .then(function() {
      return Model.Blog.create(dummyData.blogs);
    })
    .then(function(createdBlogs) {
      return Model.Post.create(dummyData.posts(createdBlogs));
    })
    .then(function() {
      console.log('db successfully initialized');
    });
  }
};
