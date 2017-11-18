/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';
import { client } from 'universal-webpack/config'; // eslint-disable-line camelcase
import Clean from 'clean-webpack-plugin';

import settings from './universal-webpack-settings.prod';
import configuration, { envVars } from './webpack.prod.config.babel';

configuration.plugins.unshift(
  new Clean(['dist/client'], {
    root: configuration.context,
  }),
  new webpack.DefinePlugin({
    'process.env': envVars,
  }),
);

configuration.node = {
  fs: 'empty',
};

export default client(configuration, settings);
