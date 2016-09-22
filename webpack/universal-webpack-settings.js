import path from 'path';

export default {
  server: {
    input: path.resolve(__dirname, '../app/scripts/server.jsx'),
    output: path.resolve(__dirname, '../app/bundles/server/bundle.js'),
  },
};
