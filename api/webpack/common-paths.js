const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '../');

module.exports = {
  projectRoot: PROJECT_ROOT,
  devPath: path.join(PROJECT_ROOT, 'dist'),
  buildPath: path.join(PROJECT_ROOT, 'build'),
  appEntry: path.join(PROJECT_ROOT, 'index'),
};
