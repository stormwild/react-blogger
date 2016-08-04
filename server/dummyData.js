// Dummy data for 2 users, each with 2 blogs. Each blog also has a post.

// Helper functions
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function generateId(value) {
  return replaceAll(value, ' ', '-').toLowerCase();
};

module.exports = {
  users: [
    {
      username: 'testuser1',
      email: 'test@test.com',
      hashedPwd: '1234'
    },
    {
      username: 'testuser2',
      email: 'test@gmail.com',
      hashedPwd: '4321'
    }
  ],
  blogs: [
    {
      userId: 'testuser1',
      title: 'My first blog',
      titleString: generateId('My first blog')
    },
    {
      userId: 'testuser1',
      title: 'My second blog',
      titleString: generateId('My second blog')
    },
    {
      userId: 'testuser2',
      title: 'My controversial blog',
      titleString: generateId('My controversial blog')
    },
    {
      userId: 'testuser2',
      title: 'My amazing blog',
      titleString: generateId('My amazing blog')
    }
  ],
  posts: function(blogs) {
    return blogs.map(function(blog) {
      var rand = Math.floor(Math.random() * (50000 - 1) + 1);
      return {
        userId: blog.userId,
        blogId: blog._id,
        title: 'Generic blog post ' + rand,
        content: 'Generic content ' + rand
      }
    });
  }
};
