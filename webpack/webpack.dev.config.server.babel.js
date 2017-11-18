/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import { server } from 'universal-webpack/config'; // eslint-disable-line camelcase
import Clean from 'clean-webpack-plugin';
import webpack from 'webpack';

import settings from './universal-webpack-settings';
import configuration, { envVars } from './webpack.dev.config.babel';

configuration.plugins.unshift(
  new Clean(['bundles/server'], {
    root: configuration.context,
  }),
  new webpack.DefinePlugin({
    'process.env': Object.assign({}, envVars, {
      APP_ENV: JSON.stringify('server'),
    }),
  }),
);

export default server(configuration, settings);
