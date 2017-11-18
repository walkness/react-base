import startServer from 'universal-webpack/server';
import settings from '../webpack/universal-webpack-settings.prod';
import configuration from '../webpack/webpack.prod.config.babel';

startServer(configuration, settings);
