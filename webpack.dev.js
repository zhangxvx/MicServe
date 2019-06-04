const path = require('path')
const webpack=require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  // mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './des'),
    inline: true
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') })
  ]
})