/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import { server } from 'universal-webpack/config';
import Clean from 'clean-webpack-plugin';
import webpack from 'webpack';

import settings from './universal-webpack-settings.prod';
import configuration, { envVars } from './webpack.prod.config.babel';

configuration.plugins.unshift(
  new Clean(['dist/server'], {
    root: configuration.context,
  }),
  new webpack.DefinePlugin({
    'process.env': Object.assign({}, envVars, {
      APP_ENV: JSON.stringify('server'),
    }),
  }),
);

export default server(configuration, settings);
