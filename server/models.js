var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var encryption = require('./encryption');

// Username and email must be unique
// Email should be required in the future
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'No username supplied']
  },
  password: {
    type: String,
    required: [true, 'No password supplied']
  },
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Adds a username, hash and salt field
// Also adds some methods, see https://github.com/saintedlama/passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', function(next) {
  // Note: When a new user is created, it sets updatedAt as slightly ahead of createdAt. Not sure if this is really an issue.
  console.log('Initiating user save');
  this.updatedAt = new Date();
  next();
});

// Maybe add a logo field. No sense in having a content field since the posts contain the content
// blogId generated from title, must be unique with respect to the user and url friendly
var blogSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'No userId supplied']
  },
  blogId: {
    type: String,
    required: [true, 'no blogId supplied']
  },
  title: {
    type: String,
    required: [true, 'No blog title supplied']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

blogSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// postId generated from title, must be unique with respect to the blog and url friendly
var postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'No userId supplied']
  },
  blogId: {
    type: String,
    required: [true, 'no blogId supplied']
  },
  postId: {
    type: String,
    required: [true, 'No postId supplied']
  },
  title: {
    type: String,
    required: [true, 'No post title supplied']
  },
  content: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

postSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Blog: mongoose.model('Blog', blogSchema),
  Post: mongoose.model('Post', postSchema)
};
