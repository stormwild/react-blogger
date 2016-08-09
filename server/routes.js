/*eslint-disable no-var*/

var express = require('express');
var router = express.Router();
var Model = require('./models');
var routeHandler = require('./routeHandler');
var auth = require('./auth');
var passport = require('passport');

// Helper functions
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function generateId(value) {
  if (!value) { return; }
  return replaceAll(value, ' ', '-').toLowerCase();
};

// Actual routes

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
router.route('/users')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.User);
})

/**
users/:userId
**/
router.route('/users/:userId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.User, {username: req.params.userId});
})
.put(function(req, res) {
  routeHandler.put(req, res, Model.User, {username: req.params.userId});
})
.delete(function(req, res) {
  routeHandler.delete(req, res, Model.User, {username: req.params.userId});
});

/**
users/:userId/blogs
**/
router.route('/users/:userId/blogs')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.Blog, {userId: req.params.userId});
});

/**
users/:userId/blogs/:blogId
**/
router.route('/users/:userId/blogs/:blogId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Blog, {blogId: req.params.blogId});
});

/**
users/:userId/blogs/:blogId/posts
**/
router.route('/users/:userId/blogs/:blogId/posts')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.Post, {blogId: req.params.blogId});
});

/**
users/:userId/blogs/:blogId/posts
**/
router.route('/users/:userId/blogs/:blogId/posts/:postId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Post, {postId: req.params.postId});
});

/**
blogs
**/
router.route('/blogs')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.Blog);
})
.post(function(req, res) {
  // Need to attach an additional field to the request, generating a blogId from the title
  req.body.blogId = generateId(req.body.title);
  routeHandler.post(req, res, Model.Blog, {userId: req.body.userId, blogId: req.body.blogId});
});

/**
blogs/:blogId
**/
router.route('/blogs/:blogId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Blog, {blogId: req.params.blogId});
})
.put(function(req, res) {
  // If changing the blog title, need to change the generated blogId as well
  if (req.body.title) {
    req.body.blogId = generateId(req.body.title);
  }
  routeHandler.put(req, res, Model.Blog, {blogId: req.params.blogId});
})
.delete(function(req, res) {
  routeHandler.delete(req, res, Model.Blog, {blogId: req.params.blogId});
});

/**
posts
**/
router.route('/posts')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.Post);
})
.post(function(req, res) {
  // Need to attach an additional field to the request, generating a postId from the title
  /** NOTE: CURRENTLY POSSIBLE TO POST TO A BLOG THAT DOESN'T EXIST **/
  req.body.postId = generateId(req.body.title);
  routeHandler.post(req, res, Model.Post, {userId: req.body.userId, blogId: req.body.blogId, postId: req.body.postId});
});

/**
posts/:postId
**/
router.route('/posts/:postId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Post, {postId: req.params.postId});
})
.put(function(req, res) {
  // If changing the post title, need to change the generated postId as well
  if (req.body.title) {
    req.body.postId = generateId(req.body.title);
  }
  routeHandler.put(req, res, Model.Post, {postId: req.params.postId});
})
.delete(function(req, res) {
  routeHandler.delete(req, res, Model.Post, {postId: req.params.postId});
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
