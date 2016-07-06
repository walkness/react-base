var config = require('./webpack.prod.config.js')

config.output.publicPath = '/dist/';

module.exports = config
