/**
 * @see https://github.com/storybookjs/storybook/blob/next/app/vue3/src/server/framework-preset-vue3.ts
 * @see https://github.com/storybookjs/vue-cli-plugin-storybook/blob/master/lib/preset.js
 */

module.exports = {
  webpack: (storybookWebpackConfig, { api }) => {
    const chainableConfig = api.resolveChainableWebpackConfig()

    /**
     * Filter plugins in vue config
     */
    const existingPlugins = chainableConfig.plugins
      .values()
      .map((item) => item.name)

    const allowedPlugins = [
      'vue-loader',
      'friendly-errors',
      'no-emit-on-errors',
      'extract-css',
      'optimize-css',
      'hash-module-ids',
      'fork-ts-checker',
    ]

    existingPlugins.forEach((plugin) => {
      if (!allowedPlugins.includes(plugin)) {
        chainableConfig.plugins.delete(plugin)
      }
    })

    // This is probably not needed:
    // chainableConfig.module.rule('eslint').exclude.add(path.resolve('.storybook')).end();
    chainableConfig.module.rule('js').uses.delete('thread-loader')
    // Prevent global CSS imports from being removed by storybook-build
    chainableConfig.module.rule('css').set('sideEffects', true)

    const vueWebpackConfig = api.resolveWebpackConfig(chainableConfig)

    const mergedWebpackConfig = {
      ...storybookWebpackConfig,

      plugins: [...storybookWebpackConfig.plugins, ...vueWebpackConfig.plugins],

      module: {
        ...vueWebpackConfig.module,

        rulesVue: vueWebpackConfig.module.rules,
        rulesStorybook: storybookWebpackConfig.module.rules,
        rules: [],
      },

      resolve: {
        ...vueWebpackConfig.resolve,

        alias: {
          ...storybookWebpackConfig.resolve.alias,
          ...vueWebpackConfig.resolve.alias,
          // vue$: require.resolve('vue/dist/vue.esm.js') // Vue 2
          vue$: require.resolve('vue/dist/vue.esm-bundler.js'), // Vue 3
        },
      },

      resolveLoader: vueWebpackConfig.resolveLoader,
    }

    // https://github.com/storybookjs/storybook/issues/14352
    // delete mergedWebpackConfig.optimization.concatenateModules;

    return mergedWebpackConfig
  },

  webpackFinal: (config) => {
    const rulesVue = config.module.rulesVue
    delete config.module.rulesVue

    const rulesStorybook = [
      ...config.module.rulesStorybook,
      ...config.module.rules,
    ]
    delete config.module.rulesStorybook
    config.module.rules = []

    /**
     * Remove some module.rules from storybook config
     */
    const rulesToRemove = [
      /\.css$/,
      /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
      /\.js$/,
      /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      /\.tsx?$/,
      /\.js$/,
      /\.(mjs|tsx?|jsx?)$/,
    ].map((rule) => rule.toString())

    const rulesStorybookFinal = rulesStorybook.reduce((finalRules, rule) => {
      const use = !rulesToRemove.includes(rule.test.toString())
      if (!use) return finalRules

      finalRules.push(rule)
      return finalRules
    }, [])

    config.module.rules = [...rulesVue, ...rulesStorybookFinal]

    return config
  },
}
