const svgoPlugins = require('./config/svgoPlugins')
const scssResources = require('./config/scssResources')

// transform scssResources Array to String
let scssString = ''
scssResources.forEach(scss => {
  scssString += `@import "${scss}";`
})

module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  },

  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: scssString
      }
    }
  },

  configureWebpack: {
    devServer: {
      allowedHosts: ['localhost', 'wsl.local']
    }
  },

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: svgoPlugins
        }
      })
      .end()

    // Safari Bugfix: https://github.com/vuejs/vue-cli/issues/1132
    if (process.env.NODE_ENV === 'development') {
      config.output.filename('[name].[hash].js').end()
    }
  }
}
