var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var courseSchema = mongoose.Schema({
  title: String,
  watchHref: String,
  authorId: String,
  length: String,
  category: String
});

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  hashedPwd: String
});

// Maybe add a logo field. No sense in having a content field since the posts contain the content
var blogSchema = mongoose.Schema({
  userId: String,
  title: String
});

var postSchema = mongoose.Schema({
  userId: String,
  blogId: String,
  title: String,
  content: String
});

module.exports = {
  Course: mongoose.model('Course', courseSchema),
  User: mongoose.model('User', userSchema),
  Blog: mongoose.model('Blog', blogSchema),
  Post: mongoose.model('Post', postSchema)
};
