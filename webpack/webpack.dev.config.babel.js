/* eslint-disable import/no-extraneous-dependencies */

import os from 'os';
import path from 'path';
import webpack from 'webpack';

import config from './webpack.base.config.babel';

// Use webpack dev server
config.entry = [
  'webpack-dev-server/client?http://0.0.0.0:3000',
  'webpack/hot/only-dev-server',
  path.resolve(__dirname, '../app/scripts/main'),
];

// Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
config.output.publicPath = `//${os.hostname()}:3000/app/bundles/`;

config.plugins = config.plugins.concat([

  new webpack.HotModuleReplacementPlugin(),

  new webpack.NoErrorsPlugin(),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      APP_ENV: JSON.stringify('browser'),
      RENDER_SERVER_PORT: 9009,
    },
  }),
]);

config.module.loaders.push(
  {
    test: /app\/scripts\/.*\.(js|jsx)$/,
    loaders: ['babel'],
  },
  {
    test: /\.scss$/,
    exclude: /node_modules|\.tmp|vendor/,
    loader: 'style-loader!css-loader!postcss-loader!sass-loader!sass-resources-loader',
  },
);

export default config;
