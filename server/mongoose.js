var mongoose = require('mongoose');
var connectionString = require('./dbConnectionString');
var Course = require('./models');

module.exports = function() {
  mongoose.connect(connectionString);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function() {
    console.log('app db opened');
  });

  Course.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      Course.create({
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
        authorId: "cory-house",
        length: "5:08",
        category: "JavaScript"
      });
      Course.create({
        id: "clean-code",
        title: "Clean Code: Writing Code for Humans",
        watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
        authorId: "cory-house",
        length: "3:10",
        category: "Software Practices"
      });
      Course.create({
        id: "architecture",
        title: "Architecting Applications for the Real World",
        watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
        authorId: "cory-house",
        length: "2:52",
        category: "Software Architecture"
      });
      Course.create({
        id: "career-reboot-for-developer-mind",
        title: "Becoming an Outlier: Reprogramming the Developer Mind",
        watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
        authorId: "cory-house",
        length: "2:30",
        category: "Career"
      });
      Course.create({
        id: "web-components-shadow-dom",
        title: "Web Component Fundamentals",
        watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
        authorId: "cory-house",
        length: "5:10",
        category: "HTML5"
      });
    }
  });
};
