/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import { client_configuration } from 'universal-webpack'; // eslint-disable-line camelcase
import BundleTracker from 'webpack-bundle-tracker';
import Clean from 'clean-webpack-plugin';

import settings from './universal-webpack-settings';
import configuration from './webpack.dev.config.babel';

configuration.plugins.unshift(
  new Clean(['app/bundles/client'], {
    root: path.resolve(__dirname, '../'),
  }),

  new BundleTracker({ filename: 'webpack/webpack-stats.json' })
);

configuration.node = {
  fs: 'empty',
};

export default client_configuration(configuration, settings);
