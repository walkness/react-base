var path = require("path");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: './app/scripts/main',

  output: {
    path: path.resolve('./app/bundles/'),
    filename: "bundle.js",
  },

  module: {
    loaders: [
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'url?limit=10000?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        loaders: ['url?limit=10000&name=fonts/[name].[ext]'],
      },
    ],
  },

  postcss: [autoprefixer],

  plugins: [
    new ExtractTextPlugin('[name]-[hash].css'),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
}
