require('babel-core/register');
const uw = require('universal-webpack');
const settings = require('./webpack/universal-webpack-settings');
const configuration = require('./webpack/webpack.dev.config.babel');

uw.server(configuration.default, settings.default);
