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

module.exports = mongoose.model('Course', courseSchema);
