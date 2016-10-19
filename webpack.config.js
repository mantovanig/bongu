module.exports = {
    entry: './library/js/scripts.js',
    output: {
        path: './library/js/dist',
        filename: 'scripts.bundle.js'
    },
    module: {
      preLoaders: [
          {
            test: /\.jsx?$/,
            exclude: /libs/,
            loaders: ['eslint']
          }
      ],
       loaders: [{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
       }]
     }
};
