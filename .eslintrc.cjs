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
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:storybook/recommended',
  ],

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

  overrides: [
    {
      files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
}
