/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import autoprefixer from 'autoprefixer';

export default {
  context: path.resolve(__dirname, '../'),

  entry: {
    main: path.resolve(__dirname, '../app/scripts/main'),
  },

  output: {
    path: path.resolve(__dirname, '../app/bundles/client/'),
    filename: 'bundle.js',
  },

  module: {
    noParse: [/braintree-web/],

    loaders: [
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'url?limit=10000?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}', // eslint-disable-line max-len
        ],
      },
      {
        test: /jsmediatags\/.+\.js$/,
        loaders: ['babel'],
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        loaders: ['url?limit=10000&name=fonts/[name].[ext]'],
      },
      {
        test: /\.md$/,
        loader: 'html!markdown?gfm=false',
      },
    ],
  },

  postcss: [autoprefixer],

  plugins: [
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
