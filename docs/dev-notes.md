Interactive blog creation platform built using React. Work in progress.

To remove the vast majority of hot reload behavior, simply remove `"presets": ["react-hmre"]` from the `.babelrc` file. I haven't fully tested it, but it seems to always trigger full reloads when I want it to.

***

To use ES6 on the server side without babel-node, need to use a polyfill for import statements. Not sure if it's worth the trouble honestly.

***

Having trouble getting initDB to run as a standalone script. Issue has to do with `node ./server/initDB.js` running as a separate node session. See [here](http://stackoverflow.com/a/10083152/2472351) for more details.

***

Was considering ditching Redux since only really want to pass User data to each page. I considered passing `window.user` into a top-level component and passing it as props to each route in the react router. This does works, but is a little clunky.

Current train of thought is to use Redux JUST for the login and use local state everywhere else.