const path = require('path');

module.exports = {
  entry: "./library/js/scripts.js",
  output: {
    path: path.resolve(__dirname, 'library/js/dist'),
    filename: "scripts.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: "pre",
        exclude: /libs/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
