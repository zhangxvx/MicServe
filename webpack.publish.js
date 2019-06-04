let path = require('path');

let commonSettings = {
  entry: {
    index:"./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, './des'),
    filename: "[name].js",
    libraryTarget:"commonjs2"
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, './src'),
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        include: path.resolve(__dirname, './src')
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  target: 'web',
};

module.exports = commonSettings