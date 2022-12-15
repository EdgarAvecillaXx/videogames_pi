const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { appEntry, buildPath } = require('./common-paths');

module.exports = {
  mode: 'production',
  entry: appEntry,
  output: {
    path: buildPath,
    filename: '[name].[fullhash].js',
  },
  devtool: 'source-map',
  externals: [nodeExternals({})],
  plugins: [new CleanWebpackPlugin()],
};
