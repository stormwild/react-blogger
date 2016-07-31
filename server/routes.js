/*eslint-disable no-var*/

var express = require('express');
var router = express.Router();
var Courses = require('./models');

router.get('/route1', function(req, res) {
  res.json({route: 'one'});
});

router.get('/route2', function(req, res) {
  res.json({route: 'two'});
});

router.get('/courses', function(req, res) {
  var query = Courses.find();
  query.exec(function(err, results) {
    res.json(results);
  });
});

module.exports = router;
