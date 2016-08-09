module.exports = {
  getAll: function (req, res, Model, queryObj) {
    queryObj = queryObj || {};
    Model.count({}).exec()
    .then(function(count) {
      // Want to limit the returned results or the query will take forever (ex/ a million results)
      // Also want to allow pagination through ?offset=value, defaults to 0
      // NOTE: skip doesn't scale, only a temporary solution
      // offset=0 takes 45ms, offset=1000000 takes ~1s
      if (count > 50) {
        var offset = req.query.offset || 0;
        return Model.find(queryObj).sort({_id: 1}).skip(offset).limit(50).exec();
      }
      return Model.find(queryObj).exec();
    })
    .then(function(match) {
      res.json(match);
    });
  },
  post: function (req, res, Model, queryObj) {
    var modelInstance = new Model(req.body);
    
    Model.findOne(queryObj).exec()
    .then(function(match) {
      console.log(match);
      if (match) {
        res.status(500).json({error: 'duplicate entry'});
      }
      else {
        return modelInstance.save();
      }
    })
    .then(function(savedResult) {
      res.json(savedResult);
    })
    .catch(function(err) {
      res.json(err);
    });
  },
  getOne: function (req, res, Model, queryObj) {
    Model.findOne(queryObj).exec()
    .then(function(match) {
      if (match) {
        res.json(match);
      }
      else {
        res.status(500).json({error: 'no match found'});
      }
    });
  },
  put: function(req, res, Model, queryObj) {
    Model.findOne(queryObj).exec()
    .then(function(match) {
      if (match) {
        // For each property in the request body, change the match's associated property
        for(var key in req.body) {
          if(req.body.hasOwnProperty(key)) {
            match[key] = req.body[key];
          }
        }
        return match.save();
      }
      else {
        res.status(500).json({error: 'no match found'});
      }
    })
    .then(function(savedCourse) {
      res.json(savedCourse);
    });
  },
  deleteOne: function(req, res, Model, queryObj) {
    Model.findOneAndRemove(queryObj)
    .then(function() {
      res.status(204).end();
    });
  },
  deleteMany: function(req, res, Model, queryObj) {
    Model.remove(queryObj)
    .then(function(deleteRes) {
      res.json(deleteRes);
    });
  },
  deleteAll: function(req, res, Model) {
    Model.remove({})
    .then(function(deleteRes) {
      res.json(deleteRes);
    });
  }
};
