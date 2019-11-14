module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    // Add typescript support
    require('@babel/preset-typescript'),
  ],
  plugins: [
    // Add ES stages 3 and 2
    require('@babel/plugin-proposal-optional-chaining'),
    require('@babel/plugin-proposal-numeric-separator'),
    // [
    //   require('@babel/plugin-proposal-class-properties'),
    //   {
    //     loose: false,
    //   },
    // ],
    // [
    //   '@babel/plugin-proposal-object-rest-spread',
    //   {
    //     useBuiltIns: true,
    //   },
    // ],
    // [
    //   '@babel/plugin-transform-regenerator',
    //   {
    //     async: false,
    //   },
    // ],
    // Alias support for build & jest
    // [
    //   require('babel-plugin-module-resolver'),
    //   {
    //     root: ['.'],
    //     alias: {
    //       '@': './src',
    //       '@test': './test',
    //     },
    //   },
    // ],
  ].filter(Boolean), // remove empty plugins
  env: {},
};
