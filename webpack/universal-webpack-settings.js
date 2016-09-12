import path from 'path';

export default {
  server: {
    input: path.resolve('app/scripts/server.jsx'),
    output: path.resolve('app/bundles/server/bundle.js'),
  },
};
