var path = require("path")
var webpack = require('webpack')
var Clean = require('clean-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('./app/dist')
config.output.publicPath = '/dist/'

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new Clean(['app/dist']),

  new BundleTracker({filename: './webpack-stats-prod.json'}),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'APP_ENV': JSON.stringify('browser'),
  }}),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),

  // minifies code
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compressor: {
      warnings: false
    }
  })
])

var cssNano = {
  discardComments: {removeAll: true}
}

config.module.loaders.push(
  {
    test: /app\/scripts\/.*\.(js|jsx)$/,
    exclude: /node_modules|\.tmp|vendor/,
    loaders: ['babel'],
  },
  {
    test: /\.scss$/,
    exclude: /node_modules|\.tmp|vendor/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?' + JSON.stringify(cssNano) + '!postcss-loader!sass-loader!sass-resources-loader'),
  }
)

module.exports = config
