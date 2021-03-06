/*eslint-disable no-var*/
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Model = require('./models');
var routeHandler = require('./handlers/routeHandler');
var userHandler = require('./handlers/userHandler');
var blogHandler = require('./handlers/blogHandler');
var auth = require('./auth');

/**
register
**/
router.post('/register', function(req, res, next) {
  Model.User.register(new Model.User({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.send(err);
    }
    passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      })
    });
  });
});

/**
login
**/
//router.post('/login', auth.authenticate);
router.post('/login', passport.authenticate('local'), function(req, res) {
  // If credentials are invalid, passport is already setup to send 401 Unauthorized as a response
  res.send('Logged in');
});

/**
logout
**/
router.route('/logout')
.post(function(req, res) {
  req.logout();
  res.send('Successfully logged out');
});

/**
users
**/
// Note: No need for POST /users because of our register endpoint that uses passport
router.route('/users')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.User);
})
.delete(function(req, res) {
  routeHandler.deleteAll(req, res, [Model.User, Model.Blog, Model.Post]);
});

/**
users/:userId
**/
router.route('/users/:userId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.User, {username: req.params.userId});
})
.put(function(req, res) {
  userHandler.put(req, res, Model, req.params.userId);
})
.delete(function(req, res) {
  routeHandler.deleteOne(req, res, [Model.User, Model.Blog, Model.Post], [{username: req.params.userId}, {userId: req.params.userId}]);
});

/**
users/:userId/blogs
**/
router.route('/users/:userId/blogs')
.get(function(req, res) {
  routeHandler.getMany(req, res, Model.Blog, {userId: req.params.userId});
})
.delete(function(req, res) {
  routeHandler.deleteMany(req, res, [Model.Blog, Model.Post], {userId: req.params.userId});
});

/**
users/:userId/blogs/:blogId
**/
router.route('/users/:userId/blogs/:blogId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Blog, {userId: req.params.userId, blogId: req.params.blogId});
})
.delete(function(req, res) {
  routeHandler.deleteOne(req, res, [Model.Blog, Model.Post], {userId: req.params.userId, blogId: req.params.blogId});
});

/**
users/:userId/blogs/:blogId/posts
**/
router.route('/users/:userId/blogs/:blogId/posts')
.get(function(req, res) {
  routeHandler.getMany(req, res, Model.Post, {userId: req.params.userId, blogId: req.params.blogId});
})
.delete(function(req, res) {
  routeHandler.deleteMany(req, res, Model.Post, {userId: req.params.userId, blogId: req.params.blogId});
});

/**
users/:userId/blogs/:blogId/posts
**/
router.route('/users/:userId/blogs/:blogId/posts/:postId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Post, {userId: req.params.userId, blogId: req.params.blogId, postId: req.params.postId});
})
.delete(function(req, res) {
  routeHandler.deleteOne(req, res, Model.Post, {userId: req.params.userId, blogId: req.params.blogId, postId: req.params.postId});
});

/**
blogs
**/
router.route('/blogs')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.Blog);
})
.post(function(req, res) {
  routeHandler.post(req, res, Model.Blog);
})
.delete(function(req, res) {
  routeHandler.deleteAll(req, res, [Model.Blog, Model.Post]);
});

/**
blogs/:blogId
**/
router.route('/blogs/:blogId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Blog, {blogId: req.params.blogId});
})
.put(function(req, res) {
  blogHandler.put(req, res, Model, req.params.blogId);
})
.delete(function(req, res) {
  routeHandler.deleteOne(req, res, [Model.Blog, Model.Post], {blogId: req.params.blogId});
});

/**
posts
**/
router.route('/posts')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.Post);
})
.post(function(req, res) {
  /** NOTE: CURRENTLY POSSIBLE TO POST TO A BLOG THAT DOESN'T EXIST **/
  routeHandler.post(req, res, Model.Post, {userId: req.body.userId, blogId: req.body.blogId, postId: req.body.postId});
})
.delete(function(req, res) {
  routeHandler.deleteAll(req, res, Model.Post);
});

/**
posts/:postId
**/
router.route('/posts/:postId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Post, {postId: req.params.postId});
})
.put(function(req, res) {
  routeHandler.put(req, res, Model.Post, {postId: req.params.postId}, {lockedFields: ['userId', 'blogId', 'postId']});
})
.delete(function(req, res) {
  routeHandler.deleteOne(req, res, Model.Post, {postId: req.params.postId});
});

// Simplistic route for bulk inserting huge amounts of data into MongoDB
// In the future might want to use a shell script or something
router.route('/bulk-insert')
.get(function(req, res) {
  
  let numOfEntries = 1000000; // 1 million
  var blogs = [];

  for(var i = 0 ; i < numOfEntries; ++i) {
    blogs.push({
      id: i,
      title: '' + Math.random() * (50000 - 1) + 1,
      content: '' + Math.random() * (80000 - 1) + 1
    });
  }
  
  Model.Blog.collection.insert(blogs, function (err, docs) {
    if (err) {
      res.json(err);
    } else {
      res.send('success');
    }
  });
});

module.exports = router;
