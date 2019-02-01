const loadEnv = require('@vue/cli-service/lib/util/loadEnv')
import axios from 'axios'
import scssResources from './config/scssResources'
import forEach from 'lodash/forEach'
import startsWith from 'lodash/startsWith'

import fs from 'fs'

if (fs.existsSync(`.env`)) {
  loadEnv(`.env`)
}

if (fs.existsSync(`.env.${process.env.NODE_ENV}.local`)) {
  loadEnv(`.env.${process.env.NODE_ENV}.local`)
}

if (fs.existsSync(`.env.${process.env.NODE_ENV}`)) {
  loadEnv(`.env.${process.env.NODE_ENV}`)
}

let environmentVariablesForClient = {}
forEach(process.env, (value, key) => {
  if (startsWith(key, 'VUE_APP')) {
    environmentVariablesForClient[key] = value
  }
})

module.exports = {
  mode: 'universal',
  srcDir: 'src/',

  modules: ['@nuxtjs/style-resources', '@/modules/routes'],

  styleResources: {
    scss: scssResources
  },

  css: ['reset-css/reset.css'],

  plugins: [
    '@/plugins/all',
    { src: '@/plugins/frontend', ssr: false },
    { src: '@/plugins/route' },
    { src: '@/plugins/foo' }
  ],

  generate: {
    dir: '../dist/site/templates/dist',
    routes: async () => {
      axios.defaults.baseURL = process.env.VUE_APP_API_URL
      const { data: routes } = await axios.get('prerender-routes')

      return routes
    }
  },

  loading: false,

  server: {
    port: 8080
  },

  env: environmentVariablesForClient,

  build: {
    extend(config, { isDev }) {
      if (!isDev) {
        config.output.publicPath = '/site/templates/dist/_nuxt/'
      }
      return config
    }
  },

  head: {
    titleTemplate: titleChunk => {
      return titleChunk
        ? `${titleChunk} - ${process.env.VUE_APP_TITLE}`
        : process.env.VUE_APP_TITLE
    },

    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      }
      // { hid: 'description', name: 'description', content: pkg.description }
    ]
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
}
