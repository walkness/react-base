/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';

const context = path.resolve(__dirname, '../');

export const cssModulesGeneratedScopedName = '[local]__[hash:base64:5]';

export const envVars = {};

const imageOptions = {
  mozjpeg: {
    progressive: true,
  },
  optipng: {
    optimizationLevel: 7,
  },
  gifsicle: {
    interlaced: false,
  },
  pngquant: {
    quality: '65-90',
    speed: 4,
  },
};

export default {
  context,

  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../app/scripts/main'),
  ],

  output: {
    path: path.resolve(__dirname, '../bundles/client/'),
    filename: 'scripts/[name]-[hash].js',
    sourceMapFilename: '[file].map',
  },

  module: {
    rules: [
      {
        test: /.*\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['react-css-modules', {
              context,
              generateScopedName: cssModulesGeneratedScopedName,
              filetypes: {
                '.scss': {
                  syntax: 'postcss-scss',
                },
              },
              webpackHotModuleReloading: true,
            }],
          ],
        },
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              hash: 'sha512',
              digest: 'hex',
              name: 'images/[name]-[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            query: imageOptions,
          },
        ],
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        loader: 'url-loader',
        options: { limit: 10000, name: 'fonts/[name].[ext]' },
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        query: {
          hash: 'sha512',
          digest: 'hex',
          name: 'data/[name]-[hash].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      context,
      options: {
        sassLoader: {
          sourceMaps: true,
          includePaths: [context],
        },
        context,
      },
    }),
    new webpack.NamedModulesPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      AppComponents: path.resolve(__dirname, '../app/scripts/views/App/components'),
      AppViews: path.resolve(__dirname, '../app/scripts/views/App/views'),
      Styles: path.resolve(__dirname, '../app/styles'),
      images: path.resolve(__dirname, '../app/images'),
      actions: path.resolve(__dirname, '../app/scripts/actions'),
      config: path.resolve(__dirname, '../app/scripts/config'),
      constants: path.resolve(__dirname, '../app/scripts/constants'),
      reducers: path.resolve(__dirname, '../app/scripts/reducers'),
      sagas: path.resolve(__dirname, '../app/scripts/sagas'),
      services: path.resolve(__dirname, '../app/scripts/services'),
      views: path.resolve(__dirname, '../app/scripts/views'),
    },
  },
};
