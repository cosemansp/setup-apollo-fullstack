/* eslint-disable */
const rewireDefinePlugin = require('@yeutech-lab/react-app-rewire-define-plugin');
const pkg = require('./package.json');

module.exports = {
  webpack: function(config, env) {
    config = rewireDefinePlugin(config, env, {
      'process.env.VERSION': JSON.stringify(pkg.version),
    });
    return config;
  },
  jest: function(config) {
    // ...add your jest config
    return config;
  },
};
