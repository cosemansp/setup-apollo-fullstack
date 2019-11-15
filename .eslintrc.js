const path = require('path');

module.exports = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['import'],
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    // 'import/core-modules': ['@test/gqltest', '@test/mongoHelper', '@test/fixtures'],
    'import/resolver': {
      node: true,
      alias: {
        // map: [['@', path.join(__dirname, 'src')], ['@test', path.join(__dirname, 'test')]],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    // Our taste
    'no-underscore-dangle': ['off'],
    'arrow-body-style': ['off'],
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/test/*.*', '**/*.spec.ts*', '**/*.test.ts'] },
    ],
    'no-console': ['warn'],
    'no-debugger': ['warn'],

    // reducing complexity
    // see https://wecodetheweb.com/2016/11/05/improving-code-quality-using-eslint/
    complexity: [2, 8],
    'max-statements': [2, 16],
    'max-statements-per-line': [2, { max: 1 }],
    'max-nested-callbacks': [2, 3],
    'max-depth': [2, { max: 3 }],

    // Typescript issues
    'lines-between-class-members': 'off',
    'react/prop-types': 'off', // ts is handling this

    // Our taste for typescript
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/indent': 'off', // prettier is handling this
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
};
