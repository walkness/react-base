/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import { server_configuration } from 'universal-webpack'; // eslint-disable-line camelcase
import Clean from 'clean-webpack-plugin';

import settings from './universal-webpack-settings.prod';
import configuration from './webpack.prod.config.babel';

configuration.plugins.unshift(
  new Clean(['app/dist/server'], {
    root: path.resolve(__dirname, '../'),
  }),
);

export default server_configuration(configuration, settings);
