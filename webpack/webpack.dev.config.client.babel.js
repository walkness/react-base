/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import { client } from 'universal-webpack/config';
import BundleTracker from 'webpack-bundle-tracker';
import Clean from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';

import { name as projectName } from '../package.json';
import settings from './universal-webpack-settings';
import configuration, { envVars } from './webpack.dev.config.babel';

configuration.plugins.unshift(
  new Clean(['bundles/client'], {
    root: configuration.context,
  }),

  new webpack.DefinePlugin({
    'process.env': envVars,
  }),

  new BundleTracker({ filename: 'bundles/webpack-stats.json' }),

  new HtmlWebpackPlugin({
    template: 'webpack/index.ejs',
    inject: true,
    title: projectName,
    alwaysWriteToDisk: true,
  }),

  new HtmlWebpackHarddiskPlugin({
    outputPath: 'bundles/client/',
  }),
);

configuration.devServer = {
  publicPath: configuration.output.publicPath,

  headers: {
    'Access-Control-Allow-Origin': '*',
  },

  contentBase: 'bundles/client/',

  stats: {
    colors: true,
  },

  host: '0.0.0.0',
  port: 3000,

  historyApiFallback: true,

  hot: true,
  inline: true,

  disableHostCheck: true,
};

configuration.node = {
  fs: 'empty',
};

export default client(configuration, settings);
