module.exports = {
  apps: [
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
