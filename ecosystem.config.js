module.exports = {
  apps: [
    {
      name: 'gateway',
      cwd: './packages/gateway',
      script: './src/index.js',
      env: {
        NODE_ENV: 'development',
        STARTUP_DELAY: 5000,
      },
    },
    {
      name: 'shop',
      cwd: './packages/shop',
      script: './src/index.js',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'accounts',
      cwd: './packages/accounts',
      script: './src/index.js',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
