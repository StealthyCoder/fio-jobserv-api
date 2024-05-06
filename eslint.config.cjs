const js = require('@eslint/js');
const pluginSecurity = require('eslint-plugin-security');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  pluginSecurity.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.nodeBuiltin,
        ...globals.browser,
      },
    },
    name: 'fio/global',
    ignores: [
      '**/*.scss',
      '**/*.json',
      '**/*.md',
      'node_modules/',
    ],
    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-useless-assignment': 'error',
      'no-undef': 'error',
      'block-scoped-var': 'error',
      'require-jsdoc': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
    },
  },
];
