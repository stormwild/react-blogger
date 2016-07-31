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
router.route('/courses')
.get(function(req, res) {
  var promise = Course.find().exec();
  
  promise.then(function(courses) {
    res.json(courses);
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
})
.post(function(req, res) {
  var course = new Course(req.body);
  course.id = generateId(course); // This is only unique if the course title is unique

  var promise = Course.findOne({id: course.id}).exec();
  
  promise.then(function(matchingCourse) {
    if (matchingCourse) {
      res.send('Course already exists');
    }
    else {
      return course.save();
    }
  })
  .then(function(savedCourse) {
    res.json(savedCourse);
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
});

router.route('/courses/:courseId')
.get(function(req, res) {
  var promise = Course.findOne({id: req.params.courseId}).exec();

  promise.then(function(course) {
    if (course) {
      res.json(course);
    }
    else {
      res.send('Couldn\'t find a course with ID \"' + req.params.courseId + '\"');
    }
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
})
.put(function(req, res) {
  var promise = Course.findOne({id: req.params.courseId}).exec();

  promise.then(function(course) {
    var reqBody = req.body;

    if (course) {
      // For each property in the request body, change the course's associated property
      for(var key in reqBody) {
        if(reqBody.hasOwnProperty(key)) {
          course[key] = reqBody[key];
        }
      }
      return course.save();
    }
    else {
      res.send('PUT request failed since course doesn\'t exist');
    }
  })
  .then(function(savedCourse) {
    res.json(savedCourse);
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
})
.delete(function(req, res) {
  var promise = Course.findOne({id: req.params.courseId}).exec();

  promise.then(function(course) {
    if (course) {
      return course.remove();
    }
    else {
      res.send('Delete failed, Couldn\'t find a course with ID \"' + req.params.courseId + '\"');
    }
  })
  .then(function() {
    res.status(204).send('Removed'); // The status code sends, but the 'Removed message' does not...
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
});

module.exports = router;
