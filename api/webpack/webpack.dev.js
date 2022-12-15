const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { devPath } = require('./common-paths');

module.exports = {
  mode: 'development',
  watch: true,
  output: {
    path: devPath,
    filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],
  plugins: [new webpack.HotModuleReplacementPlugin(), new CleanWebpackPlugin()],
};
