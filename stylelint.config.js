/**
 * Regex stylelint
 * @see https://stylelint.io/user-guide/rules/regex/
 */

/**
 * Regex for custom properties `fontStack-bla-blaBla--bluppBla`
 * @see https://regex101.com/r/8LSqia/5
 */
const regexCustomPropertyPattern =
  /^([a-z][a-zA-Z0-9]*)(-[a-zA-Z0-9]+)*(--[a-zA-Z0-9]+)?$/

/**
 * Regex for selectors .MyClass-bla-bla--blupp
 * @see https://regex101.com/r/fzYpCX/2
 */
// const regexSelectorClassPattern =
//   /^[A-Z]([a-z][a-zA-Z0-9]*)(-[a-z0-9]+)*(--[a-z0-9]+)?$/

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
    'function-name-case': null, // Does not work with cssVar.use (cssVar is the namespace)
    'function-no-unknown': null,
    'declaration-block-no-redundant-longhand-properties': null,

    // This does not work well with `stylelint-selector-bem-pattern`:
    // 'custom-property-pattern': regexCustomPropertyPattern,
    // 'selector-class-pattern': regexSelectorClassPattern,

    // Disable rules to enable it working with `stylelint-selector-bem-pattern`:
    'custom-property-pattern': null,
    'selector-class-pattern': null,

    // Make values like currentColor (camelCase) work
    'value-keyword-case': [
      'lower',
      {
        camelCaseSvgKeywords: true,
      },
    ],

    // Make cases like `rgba(fuchsia, 0.5` work
    'color-function-notation': null,

    // Allow comments without empty line beforehand
    'scss/double-slash-comment-empty-line-before': null,
    'scss/dollar-variable-empty-line-before': null,

    'scss/at-mixin-pattern': regexCustomPropertyPattern,
    'scss/dollar-variable-pattern': regexCustomPropertyPattern,
    'scss/at-function-pattern': regexCustomPropertyPattern,

    // TODO: Enable again
    // 'scss/comment-no-empty': null,

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
