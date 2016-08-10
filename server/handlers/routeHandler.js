var intersection = require('lodash/intersection');

// For each property in the request body, change the match's associated property
function modifyReq(match, reqBody) {
  for(var key in reqBody) {
    if (reqBody.hasOwnProperty(key)) {
      match[key] = reqBody[key];
    }
  }
}

function putOne(reqBody, res, Model, queryObj, options) {
  // Prevent PUT requests from updating locked fields
  if (options && options.lockedFields && intersection(Object.keys(reqBody), options.lockedFields).length > 0 ) {
    return res.status(500).json({
      error: 'Cannot update a locked field',
      lockedFields: options.lockedFields
    });
  }

  return Model.findOne(queryObj).exec()
  .then(function(match) {
    if (match) {
      modifyReq(match, reqBody);
      return match.save();
    }
    else {
      return res.status(500).json({error: 'no match found'});
    }
  })
  .catch(function(err) {
    return res.status(500).json(err);
  });
}

module.exports = {
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
  getMany: function(req, res, Model, queryObj) {
    Model.find(queryObj).exec()
    .then(function(matches) {
      res.json(matches);
    });
  },
  getAll: function (req, res, Model) {
    Model.count({}).exec()
    .then(function(count) {
      // Want to limit the returned results or the query will take forever (ex/ a million results)
      // Also want to allow pagination through ?offset=value, defaults to 0
      // NOTE: skip doesn't scale, only a temporary solution
      // offset=0 takes 45ms, offset=1000000 takes ~1s
      if (count > 50) {
        var offset = req.query.offset || 0;
        return Model.find({}).sort({_id: 1}).skip(offset).limit(50).exec();
      }
      return Model.find({}).exec();
    })
    .then(function(match) {
      res.json(match);
    });
  },
  post: function (req, res, Model) {
    var modelInstance = new Model(req.body);
    modelInstance.save(function(err, savedResult) {
      if (err) {
        return res.status(500).json({error: 'duplicate entry'});
      }
      return res.json(savedResult);
    });
  },
  put: function(req, res, Model, queryObj, options) {
    putOne(req.body, res, Model, queryObj, options)
    .then(function(savedCourse) {
      res.json(savedCourse);
    });
  },
  deleteOne: function(req, res, Model, queryObj) {
    if (Model.constructor === Array) {
      // It is assumed that you only delete one entry from the first model, and all entries of subsequent models
      // For example, delete one user, but also delete all his associated blogs and posts
      Promise.all(Model.map(function(model, index) {
        if (index === 0) {
          // This is a bit of a hack to get around the fact that /users uses a username, but everywhere else uses a userId
          // Making userId used everywhere involves messing with passport, possibly having to revert to the old implementation
          // (No mongoose-passport-local library)
          if (queryObj.constructor === Array) {
            return model.findOneAndRemove(queryObj[0]);
          }
          return model.findOneAndRemove(queryObj);
        }
        if (queryObj.constructor === Array) {
          return model.remove(queryObj[1]);
        }
        return model.remove(queryObj);
      }))
      .then(function() {
        res.status(204).end();
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
    }
    else {
      Model.findOneAndRemove(queryObj)
      .then(function() {
        res.status(204).end();
      });      
    }
  },
  deleteMany: function(req, res, Model, queryObj) {
    if (Model.constructor === Array) {
      Promise.all(Model.map(function(model) {
        return model.remove(queryObj).exec();
      }))
      .then(function() {
        res.status(204).end();
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
    }
    else {
      Model.remove(queryObj)
      .then(function(deleteRes) {
        res.json(deleteRes);
      });
    }
  },
  deleteAll: function(req, res, Model) {
    if (Model.constructor === Array) {
      Promise.all(Model.map(function(model) {
        return model.remove({}).exec();
      }))
      .then(function() {
        res.status(204).end();
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
    }
    else {
      Model.remove({})
      .then(function(deleteRes) {
        res.json(deleteRes);
      });
    }
  }
};
