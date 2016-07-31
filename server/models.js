var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = mongoose.Schema({
  title: String,
  author: String,
  category: String,
  length: String
});

module.exports = mongoose.model('Course', courseSchema);
