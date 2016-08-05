var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require('./routes');

module.exports = function(app) {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(logger('dev'));

  // Delegate routes
  app.use('/api', routes);

  // Catch 404 and forward to error handler
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  // The error handler itself
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
          message: err.message,
          error: err
      });
  });
}
