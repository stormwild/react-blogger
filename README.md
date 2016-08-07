Interactive blog creation platform built using React. Work in progress.

To toggle hot reloading, go to `./config.js` and change `hotReloadEnabled` from `true` to `false` (or vice versa).

If hot reloading is disabled, you also need to remove the following from `.babelrc`:

`"presets": ["react-hmre"]`

Note that you might want to take this off even with hot reloading enabled since it makes the hot reloader do full reloads when editing text content within a React render method (haven't tested extensively).