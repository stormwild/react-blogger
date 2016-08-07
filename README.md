Interactive blog creation platform built using React. Work in progress.

To remove the vast majority of hot reload behavior, simply remove `"presets": ["react-hmre"]` from the `.babelrc` file. I haven't fully tested it, but it seems to always trigger full reloads when I want it to.

***

To use ES6 on the server side without babel-node, need to use a polyfill for import statements. Not sure if it's worth the trouble honestly.

***

Having trouble getting initDB to run as a standalone script. Issue has to do with `node ./server/initDB.js` running as a separate node session. See [here](http://stackoverflow.com/a/10083152/2472351) for more details.