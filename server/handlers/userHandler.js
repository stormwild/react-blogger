var routeHandler = require('./routeHandler');

module.exports = {
  put: function(req, res, Model, userId) {
    var Models = [Model.User, Model.Blog, Model.Post];

    // Only cascade for changes to the user's username
    if (req.body.username) {
      Promise.all(Models.map(function(model, index) {
        // If Model.User, update the username of just that user.
        // Else if Model.Blog or Model.Post, update the userId of all the blogs and posts pertaining to that user.
        if (index === 0) {
          return model.findOneAndUpdate({username: userId}, {username: req.body.username});
        }
        else {
          return model.update({userId: userId}, {userId: req.body.username}, {multi: true});
        }
      }))
      .then(function() {
        return res.status(204).end();
      })
      .catch(function(err) {
        return res.status(500).send(err);
      });
    }
    else {
      routeHandler.put(req, res, Model.User, {username: userId});
    }  
  }
};
