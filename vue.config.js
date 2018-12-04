const svgoplugins = require('./svgoplugins')

module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  },

  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
        @import "~include-media/dist/_include-media.scss";
        @import "~modularscale-sass/stylesheets/modularscale";
        @import "@/assets/scss/constants.scss";
        @import "@/assets/scss/interpolate.scss";
        @import "@/assets/scss/easing.scss";
        `
      }
    }
  },

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: svgoplugins
        }
      })
      .end()
  }
}
