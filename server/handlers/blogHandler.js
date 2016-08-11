var routeHandler = require('./routeHandler');

module.exports = {
  put: function(req, res, Model, blogId) {
    // Store the modified blog object outside the promise chaining
    var newBlog;
    // Only cascade for changes to the blog's title
    if (req.body.title) {
      // Update the blog's title
      Model.Blog.findOne({blogId: blogId})
      .then(function(matchedBlog) {
        matchedBlog.title = req.body.title;
        return matchedBlog.save()
      })
      // Also update the blogID associated with each of the blog's posts 
      .then(function(savedBlog) {
        // Grab a reference of the saved blog since we need access to the new generated blogId
        newBlog = savedBlog;
        // Find all the posts matching the old blogId, and update in the next call to then()
        return Model.Post.find({blogId: blogId});
      })
      .then(function(matchedPosts) {
        return Promise.all(matchedPosts.map(function(matchedPost) {
          matchedPost.blogId = newBlog.blogId;
          return matchedPost.save();
        }));
      })
      .then(function() {
        // The frontend needs the new blog object in order to update the blog title
        return res.status(200).send(newBlog);
      })
      .catch(function(err) {
        return res.status(500).send(err);
      });
    }
    else {
      // Forward to the generic route handler
      routeHandler.put(req, res, Model.Blog, {blogId: blogId}, {lockedFields: ['userId', 'blogId']});
    }  
  }
};
