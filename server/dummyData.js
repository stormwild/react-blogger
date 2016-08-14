var encryption = require('./encryption');

// Helper functions
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function generateId(value) {
  return replaceAll(value, ' ', '-').toLowerCase();
};

var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget nulla blandit, ornare dui id, laoreet lorem. Mauris libero purus, volutpat eu imperdiet at, pellentesque vulputate diam. Cras pellentesque consequat viverra. Aenean id ex metus. Vestibulum libero lorem, pellentesque vitae arcu consequat, gravida sagittis ex. Sed aliquet, dolor at placerat scelerisque, mi ipsum tincidunt dolor, eu accumsan felis lacus vel mi. Cras eros risus, venenatis ac vulputate quis, convallis eu nulla. Vivamus porta lorem lorem, quis condimentum ligula viverra sit amet. Integer accumsan tellus a lacus auctor interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam augue est, lobortis sit amet odio eu, fermentum ullamcorper est. Sed tempus felis sed mi porta molestie. Aenean vitae commodo est, in sodales diam. Phasellus non maximus velit. Phasellus libero odio, vulputate sit amet arcu in, rhoncus aliquet diam. Vestibulum sit amet auctor justo, a pharetra metus.\n\nVestibulum sit amet fringilla leo. Phasellus nibh arcu, interdum non mauris id, lacinia ullamcorper nibh. Aenean felis neque, consectetur eu nisl eget, pellentesque gravida velit. Morbi faucibus varius augue, eu convallis ex aliquet vel. Etiam vehicula in augue in eleifend. Phasellus et dolor blandit, gravida augue eu, tristique elit. Proin lorem purus, condimentum nec ante eu, pellentesque ultricies lorem. Pellentesque euismod urna ut risus sagittis, ultricies cursus tellus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc et purus eu dolor imperdiet aliquam at vitae orci.\n\nUt ultrices nec nulla in hendrerit. Duis tincidunt porta suscipit. Maecenas ultrices placerat felis. Mauris nec risus maximus, vehicula justo non, rhoncus sapien. Ut posuere nunc mauris, sed placerat velit faucibus vitae. Suspendisse sed ligula sed justo vehicula facilisis sit amet eu justo. Donec tempus elementum felis nec convallis. Quisque tincidunt convallis quam, a ultricies leo dictum sit amet. Phasellus tincidunt tincidunt orci sed laoreet. Cras vehicula consectetur sodales.\n\nSuspendisse vitae tincidunt ipsum. Quisque nunc ipsum, pretium quis sollicitudin eget, sollicitudin a nisl. Aenean vulputate, est sollicitudin aliquet fringilla, ipsum justo ultrices ex, vitae faucibus magna nunc sed risus. Proin tempor massa eget placerat tincidunt. Vestibulum vestibulum libero vitae ante pretium egestas. Etiam et tortor nibh. Nam sit amet efficitur elit, id dictum nibh.\n\nSed vehicula orci ut massa finibus, quis dictum nisl venenatis. Suspendisse nisl velit, auctor sit amet nisl vel, pellentesque feugiat leo. Morbi pellentesque, est at fermentum iaculis, sapien elit mollis leo, et maximus lectus purus vel risus. Phasellus facilisis ligula eu diam viverra aliquam id non dui. Sed id diam et diam lacinia sodales vel id nisi. Nulla pretium, risus non hendrerit laoreet, magna dui egestas sapien, ut suscipit lorem libero a enim. Sed eu posuere elit, et ullamcorper nisl. Quisque laoreet pretium quam ac vestibulum. Suspendisse consequat dolor ut sapien fringilla mattis in eget orci.';

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
        content: '## Generic content ' + rand + '\n\n' + loremIpsum
      }
    });
  }
};
