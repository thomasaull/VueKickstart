import axios from 'axios'
import scssResources from './config/scssResources'
import forEach from 'lodash/forEach'
import startsWith from 'lodash/startsWith'
import svgoPlugins from './config/svgoPlugins'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import fs from 'fs'

function loadEnv(path) {
  const env = dotenv.config({ path, debug: process.env.DEBUG })
  dotenvExpand(env)
}

if (fs.existsSync(`.env.${process.env.NODE_ENV}.local`)) {
  loadEnv(`.env.${process.env.NODE_ENV}.local`)
}

if (fs.existsSync(`.env.${process.env.NODE_ENV}`)) {
  loadEnv(`.env.${process.env.NODE_ENV}`)
}

if (fs.existsSync(`.env`)) {
  loadEnv(`.env`)
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
    extend(config, { isDev, isClient }) {
      if (!isDev) {
        config.output.publicPath = '/site/templates/dist/_nuxt/'
      }

      if (isClient) {
        config.devtool = '#source-map'
      }

      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: svgoPlugins
          }
        }
      })

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
      },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#757575' }
    ]
  }
}
