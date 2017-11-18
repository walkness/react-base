/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config, { cssModulesGeneratedScopedName, envVars } from './webpack.base.config.babel';

const prodEnvVars = Object.assign({}, envVars, {
  NODE_ENV: JSON.stringify('production'),
  APP_ENV: JSON.stringify('browser'),
  RENDER_SERVER_PORT: 9009,
});
export { prodEnvVars as envVars };

config.output.path = path.resolve(__dirname, '../dist/client/');
config.output.publicPath = '/static/';
config.output.libraryTarget = 'umd';

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  // minifies code
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,
    },
    compressor: {
      warnings: false,
    },
    sourceMap: true,
  }),

  new ExtractTextPlugin('styles/[name]-[contenthash].css'),
]);

const cssNano = {
  autoprefixer: false,
  discardComments: { removeAll: true },
};

config.module.rules.push(
  {
    test: /\.scss$/,
    include: /app\/scripts\//,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: cssNano,
            modules: true,
            importLoaders: 2,
            localIdentName: cssModulesGeneratedScopedName,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
      fallback: 'style-loader',
    }),
  },
  {
    test: /\.scss$/,
    exclude: /app\/scripts\//,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: cssNano,
            importLoaders: 2,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
      fallback: 'style-loader',
    }),
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: cssNano,
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
      fallback: 'style-loader',
    }),
  },
);

config.devtool = 'source-map';

export default config;
