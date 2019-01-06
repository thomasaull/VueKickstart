const svgoplugins = require('./svgoplugins')
// const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer

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

  /*configureWebpack: async config => {
    // config.devtool = '#source-map'

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          // outputDir: path.join(__dirname, 'prerendered'),
          // routes: routes,
          routes: ['/'],

          // server: {
          // historyApiFallback: true,
          // noInfo: false

          // proxy: {
          //   '**': {
          //     target: 'http://www.wolfgang-muenzing.test',
          //     changeOrigin: true
          //   }
          // }
          // },

          renderer: new PuppeteerRenderer({
            headless: false,
            renderAfterTime: 10000
          })
        })
      )
    }
  },*/

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

    // Safari Bugfix: https://github.com/vuejs/vue-cli/issues/1132
    if (process.env.NODE_ENV === 'development') {
      config.output.filename('[name].[hash].js').end()
    }
  }
}
