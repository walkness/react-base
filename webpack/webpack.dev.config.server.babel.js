/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import { server_configuration } from 'universal-webpack'; // eslint-disable-line camelcase
import Clean from 'clean-webpack-plugin';

import settings from './universal-webpack-settings';
import configuration from './webpack.dev.config.babel';

configuration.plugins.unshift(
  new Clean(['app/bundles/server'], {
    root: path.resolve(__dirname, '../'),
  }),
);

export default server_configuration(configuration, settings);
