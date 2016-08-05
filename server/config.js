var path = require('path');
var rootPath = path.normalize(__dirname + '/../'); // Root path of the project goes back a directory

// TODO: Add a connection string for production
module.exports = {
  development: {
    db: 'mongodb://localhost/myapp',
    rootPath: rootPath,
    port: process.env.PORT || 5000
  },
  production: {
    db: 'mongodb://localhost/myapp',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
};
