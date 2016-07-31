/*eslint-disable no-var*/

var express = require('express');
var router = express.Router();

router.get('/route1', function(req, res) {
  res.json({route: 'one'});
});

router.get('/route2', function(req, res) {
  res.json({route: 'two'});
});

module.exports = router;
