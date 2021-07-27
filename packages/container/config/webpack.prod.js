const { merge } = require('webpack-merge');
// const { module } = require('./webpack.common');
const MFp = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

console.log(process.env);
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/' //!!! concat path for prod
  },
  plugins: [
    new MFp({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
};


module.exports = merge(commonConfig, prodConfig);