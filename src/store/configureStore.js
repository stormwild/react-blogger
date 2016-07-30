if(process.env.NODE_ENV === 'production') {
  // Dynamic imports aren't supported by ES6, so need to use require instead of import
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
