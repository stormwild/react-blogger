/*eslint-disable no-var*/

var express = require('express');
var router = express.Router();
var Course = require('./models');

// Helper functions
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function generateId(course) {
  return replaceAll(course.title, ' ', '-').toLowerCase();
};

// Actual routes
router.get('/courses', function(req, res) {
  var query = Course.find();
  query.exec(function(err, results) {
    res.json(results);
  });
});

router.post('/courses', function(req, res) {
  var course = new Course(req.body);
  course.id = generateId(course); // This is only unique if the course title is unique

  course.save(function(err, results) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(results);
    }
  });

});

module.exports = router;
