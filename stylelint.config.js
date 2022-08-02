module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-html/html',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-prettier', // This needs to come last!
  ],

  plugins: ['stylelint-selector-bem-pattern'],

  rules: {
    'at-rule-no-unknown': null,

    'plugin/selector-bem-pattern': {
      preset: 'suit',

      implicitComponents: [
        '**/src/components/**/*',
        '**/src/views/**/*',
        '**/src/layouts/**/*',
      ],

      ignoreSelectors: [
        /^#{\$block}/,
        /^iframe$/,
        /^svg$/,
        /router-link-active$/,
        /router-link-exact-active$/,
        /lazyloading$/,
        /lazyloaded$/,
        /lazyload$/,
        /v-enter-from$/,
        /v-enter-to$/,
        /v-enter-active$/,
        /v-leave-from$/,
        /v-leave-to$/,
        /v-leave-active$/,
      ],
    },
  },
}
