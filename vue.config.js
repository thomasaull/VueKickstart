const path = require('path')
const svgoPlugins = require('./config/svgoPlugins')

// TODO
// const scssResources = require('./config/scssResources')
// transform scssResources Array to String
// let scssString = ''
// scssResources.forEach(scss => {
//   scssString += `@import "${scss}";`
// })

module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  },

  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: `
          @use '@/assets/scss/colors' as color;
          @use '@/assets/scss/typography' as typography;
          @use '@/assets/scss/constants' as constant;
          @use '@/assets/scss/mixins' as mixin;
          @use '@/assets/scss/functions' as function;
          @use '@/assets/scss/cssVar' as cssVar;
        `,
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'src/assets/scss/')]
        }
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
