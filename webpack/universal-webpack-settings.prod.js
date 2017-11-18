import path from 'path';
import config from './universal-webpack-settings';

config.server.output = path.resolve(__dirname, '../dist/server/bundle.js');

export default config;
