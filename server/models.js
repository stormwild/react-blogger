var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var courseSchema = mongoose.Schema({
  id: String,
  title: String,
  watchHref: String,
  authorId: String,
  length: String,
  category: String
});

var blogSchema = mongoose.Schema({
  id: String,
  title: String,
  content: String
});

module.exports = {
  Course: mongoose.model('Course', courseSchema),
  Blog: mongoose.model('Blog', blogSchema)
};
