var dummyData = require('./dummyData');
var Model = require('./models');

module.exports = function() {
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
    return Promise.all([
      Model.User.remove({}).exec(),
      Model.Blog.remove({}).exec(),
      Model.Post.remove({}).exec()
    ]);
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
};
