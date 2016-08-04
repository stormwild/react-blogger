var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

// Username and email must be unique
var userSchema = mongoose.Schema({
  username: String,
  email: String,
  hashedPwd: String
});

// Maybe add a logo field. No sense in having a content field since the posts contain the content
// titleString generated from title, must be unique with respect to the user and url friendly
var blogSchema = mongoose.Schema({
  userId: String,
  title: String,
  titleString: String
});

var postSchema = mongoose.Schema({
  userId: String,
  blogId: String,
  title: String,
  content: String
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Blog: mongoose.model('Blog', blogSchema),
  Post: mongoose.model('Post', postSchema)
};
