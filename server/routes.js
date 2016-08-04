/*eslint-disable no-var*/

var express = require('express');
var router = express.Router();
var Course = require('./models').Course;
var Blog = require('./models').Blog;
var routeHandler = require('./routeHandler');

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
courses
**/
router.route('/courses')
.get(function(req, res) {
  routeHandler.getAll(req, res, Course);
})
.post(function(req, res) {
  routeHandler.post(req, res, Course);
});

/**
courses/:courseId
**/
router.route('/courses/:courseId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Course, req.params.courseId);
})
.put(function(req, res) {
  routeHandler.put(req, res, Course, req.params.courseId);
})
.delete(function(req, res) {
  routeHandler.delete(req, res, Course, req.params.courseId);
});

/**
blogs
**/
router.route('/blogs')
.get(function(req, res) {
  routeHandler.getAll(req, res, Blog);
})
.post(function(req, res) {
  routeHandler.post(req, res, Blog);
});

/**
blogs/:blogId
**/
router.route('/blogs/:blogId')
.get(function(req, res) {
  routeHandler.getOne(req, res, Blog, req.params.blogId);
})
.put(function(req, res) {
  routeHandler.put(req, res, Blog, req.params.blogId);
})
.delete(function(req, res) {
  routeHandler.delete(req, res, Blog, req.params.blogId);
});

module.exports = router;
