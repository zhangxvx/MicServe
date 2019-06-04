let path = require('path')

let commonSettings = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, './des'),
    filename: "[name].js"
  },

  module: {
    rules: [{
      test: /\.js$/,
      // use: ['happypack/loader?id=babel'],
      use: ['babel-loader?cacheDirectory'],
      include: path.resolve(__dirname, './src')
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  target: 'web',
};

module.exports = commonSettings