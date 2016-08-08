var encryption = require('./encryption');

// Helper functions
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function generateId(value) {
  return replaceAll(value, ' ', '-').toLowerCase();
};

var salt1 = encryption.createSalt();
var salt2 = encryption.createSalt();

// Dummy data for 2 users, each with 2 blogs. Each blog also has a post.
module.exports = {
  users: [
    {
      username: 'joe',
      email: 'test@test.com',
    },
    {
      username: 'bob',
      email: 'test@gmail.com',
    }
  ],
  blogs: [
    {
      userId: 'joe',
      title: 'My first blog',
      blogId: generateId('My first blog')
    },
    {
      userId: 'joe',
      title: 'My second blog',
      blogId: generateId('My second blog')
    },
    {
      userId: 'bob',
      title: 'My controversial blog',
      blogId: generateId('My controversial blog')
    },
    {
      userId: 'bob',
      title: 'My amazing blog',
      blogId: generateId('My amazing blog')
    }
  ],
  posts: function(blogs) {
    return blogs.map(function(blog) {
      var rand = Math.floor(Math.random() * (50000 - 1) + 1);
      return {
        userId: blog.userId,
        blogId: blog.blogId,
        title: 'Generic blog post ' + rand,
        postId: generateId('Generic blog post ' + rand),
        content: 'Generic content ' + rand
      }
    });
  }
};
