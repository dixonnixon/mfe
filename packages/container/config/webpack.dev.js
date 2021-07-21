const { merge } = require('webpack-merge');
// const { module } = require('./webpack.common');
const MFp = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

//deploying: vercel now.sh heroku
//amazon s3 CloudFront (CDN)

const devCfg = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new MFp({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js'
      },
      // shared: ['react', 'react-dom']
      shared: packageJson.dependencies

    }),
    
  ]
};

module.exports = merge(commonConfig, devCfg);