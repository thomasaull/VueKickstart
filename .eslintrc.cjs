/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:storybook/recommended',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
  },

  rules: {
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        // 'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description', // 'ts-nocheck': true,
        // 'ts-check': false,
        // minimumDescriptionLength: 3,
      },
    ],
  },
}
