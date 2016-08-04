module.exports = {
  getAll: function (req, res, Model) {
    Model.count({}).exec()
    .then(function(count) {
      // Want to limit the returned results or the query will take forever (ex/ a million results)
      if (count > 50) {
        return Model.find({}).sort({_id: 1}).limit(50).exec();
      }
      return Model.find({}).exec();
    })
    .then(function(match) {
      res.json(match);
    });
  },
  post: function (req, res, Model) {
    var modelInstance = new Model(req.body);
    var promise = Model.findOne({_id: req.params.id}).exec();
    
    promise.then(function(match) {
      if (match) {
        res.send('Cannot post, duplicate entry');
      }
      else {
        return modelInstance.save();
      }
    })
    .then(function(savedResult) {
      res.json(savedResult);
    });
  },
  getOne: function (req, res, Model, id) {
    var promise = Model.findOne({_id: id}).exec();

    promise.then(function(match) {
      if (match) {
        res.json(match);
      }
      else {
        res.send('Couldn\'t find a match with ID \"' + id + '\"');
      }
    });
  },
  put: function(req, res, Model, id) {
    var promise = Model.findOne({_id: id}).exec();

    promise.then(function(match) {
      var reqBody = req.body;

      if (match) {
        // For each property in the request body, change the match's associated property
        for(var key in reqBody) {
          if(reqBody.hasOwnProperty(key)) {
            match[key] = reqBody[key];
          }
        }
        return match.save();
      }
      else {
        res.send('PUT request failed, couldn\'t find a match with ID \"' + id + '\"');
      }
    })
    .then(function(savedCourse) {
      res.json(savedCourse);
    });
  },
  delete: function(req, res, Model, id) {
    var promise = Model.findOne({_id: id}).exec();

    promise.then(function(match) {
      if (match) {
        return match.remove();
      }
      else {
        res.send('Delete failed, Couldn\'t find a match with ID \"' + id + '\"');
      }
    })
    .then(function() {
      res.status(204).send('Removed'); // The status code sends, but the 'Removed message' does not...
    });
  }
}
