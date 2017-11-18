import startServer from 'universal-webpack/server';
import settings from '../webpack/universal-webpack-settings';
import configuration from '../webpack/webpack.dev.config.babel';

startServer(configuration, settings);
