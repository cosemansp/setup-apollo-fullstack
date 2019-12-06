module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier', 'prettier/react'],
  plugins: ['import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@', './src'],
          ['@test', './test'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  globals: {},
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  rules: {
    // ES
    'arrow-body-style': 'off',

    // reducing complexity
    // see https://wecodetheweb.com/2016/11/05/improving-code-quality-using-eslint/
    complexity: [2, 6],
    'max-statements': [2, 18],
    'max-statements-per-line': [2, { max: 1 }],
    'max-nested-callbacks': [2, 3],
    'max-depth': [2, { max: 3 }],

    // Our taste
    'linebreak-style': 'off', // Don't play nicely with Windows.
    'no-plusplus': 'off',
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/sort-comp': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-console': ['warn'],
    'no-debugger': ['warn'],

    // Typescript issues
    'lines-between-class-members': 'off',
    'react/prop-types': 'off', // ts is handling this

    // Our taste for typescript
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/indent': 'off', // prettier is handling this
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.ts', '**/*.spec.tsx'],
      rules: {
        // disabled rules for unit testing
        'max-nested-callbacks': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
