var routeHandler = require('./routeHandler');

module.exports = {
  put: function(req, res, Model, blogId) {
    // Store the new blogId outside the promise chaining
    var newBlogId = '';
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
        // Remember that changing a blog's title automatically updates its blogId
        newBlogId = savedBlog.blogId;
        // Find all the posts matching the old blogId, and update in the next call to then()
        return Model.Post.find({blogId: blogId});
      })
      .then(function(matchedPosts) {
        return Promise.all(matchedPosts.map(function(matchedPost) {
          matchedPost.blogId = newBlogId;
          return matchedPost.save();
        }));
      })
      .then(function() {
        return res.status(204).end();
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
