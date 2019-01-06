const path = require('path')
const fs = require('fs')
// const loadEnv = require('@vue/cli-service/lib/util/loadEnv')
// const axios = require('axios')
// const { minify } = require('html-minifier')
const mkdirp = require('mkdirp')

const Prerenderer = require('@prerenderer/prerenderer')
const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer')

// Basically everything is copied from: https://github.com/chrisvfritz/prerender-spa-plugin/blob/master/es6/index.js

module.exports = (api, options) => {
  // console.log(process.env.VUE_APP_GRAPHQL_HTTP)
  // const env = loadEnv(`.env.${api.service.mode}`)

  api.registerCommand('prerender', async () => {
    console.log('do prerendering')

    // const { data: routes } = await axios.get(
    //   'http://wolfgang-muenzing.dev.thomasaull.de/api/helper/prerender-routes'
    // )

    const routes = ['/']

    const prerenderer = new Prerenderer({
      staticDir: '/',
      server: {
        proxy: {
          '**': {
            // target: 'http://wolfgang-muenzing.dev.thomasaull.de/',
            target: 'http://vue-kickstart.test',
            changeOrigin: true
          }
        }
      },

      renderer: new PuppeteerRenderer({
        headless: false,
        renderAfterTime: 2 * 1000
      })
    })

    await prerenderer.initialize()
    const renderedRoutes = await prerenderer.renderRoutes(routes)

    // renderedRoutes.forEach(route => {
    //   route.html = minify(route.html)
    // })

    renderedRoutes.forEach(route => {
      route.outputPath = path.join(
        options.outputDir,
        'prerendered',
        route.route,
        'index.html'
      )
    })

    await writeFiles(renderedRoutes)

    prerenderer.destroy()
  })
}

function mkdirpPromise(dir, opts) {
  return new Promise((resolve, reject) => {
    mkdirp(
      dir,
      opts,
      (err, made) => (err === null ? resolve(made) : reject(err))
    )
  })
}

function writeFiles(processedRoutes) {
  const promises = Promise.all(
    processedRoutes.map(processedRoute => {
      return mkdirpPromise(path.dirname(processedRoute.outputPath))
        .then(() => {
          return new Promise((resolve, reject) => {
            fs.writeFile(
              processedRoute.outputPath,
              processedRoute.html.trim(),
              err => {
                if (err)
                  reject(
                    `[prerender-spa-plugin] Unable to write rendered route to file "${
                      processedRoute.outputPath
                    }" \n ${err}.`
                  )
                else resolve()
              }
            )
          })
        })
        .catch(err => {
          if (typeof err === 'string') {
            err = `[prerender-spa-plugin] Unable to create directory ${path.dirname(
              processedRoute.outputPath
            )} for route ${processedRoute.route}. \n ${err}`
          }

          throw err
        })
    })
  )

  return promises
}
