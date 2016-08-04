/*eslint-disable no-var*/

var express = require('express');
var router = express.Router();
var routeHandler = require('./routeHandler');
var Model = require('./models');

// Helper functions
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function generateId(course) {
  return replaceAll(course.title, ' ', '-').toLowerCase();
};

// Actual routes

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
  
  Blog.collection.insert(blogs, function (err, docs) {
    if (err) {
      res.json(err);
    } else {
      res.send('success');
    }
  });

});

/**
users
**/
router.route('/users')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.User);
})
.post(function(req, res) {
  routeHandler.post(req, res, Model.User);
});

/**
users/:userId
**/
router.route('/users/:userId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.User, req.params.userId, 'username');
})
.put(function(req, res) {
  routeHandler.put(req, res, Model.User, req.params.userId);
})
.delete(function(req, res) {
  routeHandler.delete(req, res, Model.User, req.params.userId);
});

/**
users/:userId/blogs
**/
router.route('/users/:userId/blogs')
.get(function(req, res) {
  // Displays all the blogs of a specific user
  Model.Blog.find({userId: req.params.userId}).exec()
  .then(function (matches) {
    res.json(matches);
  })
});

/**
users/:userId/blogs/:blogId/posts
**/
router.route('/users/:userId/blogs/:blogId/posts')
.get(function(req, res) {
  // Displays all the posts of a specific blog
  Model.Post.find({blogId: req.params.blogId}).exec()
  .then(function (matches) {
    res.json(matches);
  })
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
});

/**
blogs/:blogId
**/
router.route('/blogs/:blogId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Blog, req.params.blogId);
})
.put(function(req, res) {
  routeHandler.put(req, res, Model.Blog, req.params.blogId);
})
.delete(function(req, res) {
  routeHandler.delete(req, res, Model.Blog, req.params.blogId);
});

/**
posts
**/
router.route('/posts')
.get(function(req, res) {
  routeHandler.getAll(req, res, Model.Post);
})
.post(function(req, res) {
  routeHandler.post(req, res, Model.Post);
});

/**
posts/:postId
**/
router.route('/posts/:postId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Model.Post, req.params.postId);
})
.put(function(req, res) {
  routeHandler.put(req, res, Model.Post, req.params.postId);
})
.delete(function(req, res) {
  routeHandler.delete(req, res, Model.Post, req.params.postId);
});

module.exports = router;
