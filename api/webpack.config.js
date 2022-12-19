const { ERR_NO_ENV_FLAG } = require('./webpack/build-validations');
const commonConfig = require('./webpack/webpack.common');

const { merge } = require('webpack-merge');

module.exports = env => {
  if (!env) throw new Error(ERR_NO_ENV_FLAG);
  const envConfig = require(`./webpack/webpack.${env.env}.js`);

  const config = merge(commonConfig, envConfig);
  return config;
};
