module.exports = {
  root: true,
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss', 'stylelint-selector-bem-pattern'],
  rules: {
    'at-rule-no-unknown': null,

    'plugin/selector-bem-pattern': {
      implicitComponents: [
        '**/src/components/**/*',
        '**/src/views/**/*',
        '**/src/layouts/**/*'
      ],
      preset: 'suit',
      ignoreSelectors: [
        /^svg$/,
        /router-link-active$/,
        /router-link-exact-active$/,
        /lazyloading$/,
        /lazyloaded$/,
        /lazyload$/,
        /v-enter$/,
        /v-enter-to$/,
        /v-enter-active$/,
        /v-leave$/,
        /v-leave-to$/,
        /v-leave-active$/
      ]
    }
  }
}
