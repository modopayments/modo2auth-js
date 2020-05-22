module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended'],
  globals: {
    Promise: true,
    module: true,
    process: true,
    __dirname: true,
    Buffer: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    strict: 0,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'import/no-unresolved': 0,
    'no-console': ['error', { allow: ['info', 'warn', 'error', 'debug'] }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 3 }],
    'space-before-function-paren': ['error', 'never'],
  },
}
