var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var encryption = require('./encryption');
var utils = require('./utils/utils');

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

userSchema.pre('validate', function(next) {
  if (this.isModified('email')) {
    Model.User.find({email: this.email}, function(err, matches) {
      if (matches.length > 0) {
        next(new Error('This email is already in use'));
      }
      next();
    });
  }
  else {
    // Without the else block, the next() will execute regardless and get in a race condition with Model.Blog.find
    next();
  }
});

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
    type: String
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

blogSchema.pre('validate', function(next) {
  if (this.isModified('title')) {
    // Need to generate the blogId in the pre-validation hook since the pre-save hook is too late
    this.blogId = utils.generateIdFromTitle(this.title);

    // Verify that there aren't any other blogs belonging to this user with the same blogId
    Model.Blog.find({userId: this.userId, blogId: this.blogId}, function(err, matches) {
      if (matches.length > 0) {
        next(new Error('There already exists a blog with this title'));
      }
      next();
    });
  }
  else {
    // Without the else block, the next() will execute regardless and get in a race condition with Model.Blog.find
    next();
  }
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
    type: String
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

postSchema.pre('validate', function(next) {
  if (this.isModified('title')) {
    // Need to generate the postId in the pre-validation hook since the pre-save hook is too late
    this.postId = utils.generateIdFromTitle(this.title);

    // Verify that there aren't any other posts belonging to this user/blog combo
    Model.Post.find({userId: this.userId, blogId: this.blogId, postId: this.postId}, function(err, matches) {
      if (matches.length > 0) {
        next(new Error('There already exists a post with this title'));
      }
      next();
    });
  }
  else {
    // Without the else block, the next() will execute regardless and get in a race condition with Model.Blog.find
    next();
  }
});

postSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

var Model = {
  User: mongoose.model('User', userSchema),
  Blog: mongoose.model('Blog', blogSchema),
  Post: mongoose.model('Post', postSchema)
};

module.exports = Model;
