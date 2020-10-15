// This file is only used if you run vue and not nuxt!
import '@/sharedMain'
import Vue from 'vue'
import App from '@/AppVue.vue'
import { createRouter } from '@/router'
import store from '@/store'
import axios from 'axios'
import Vuex from 'vuex'
import PortalVue from 'portal-vue'
import VueWait from 'vue-wait'
import VueMeta from 'vue-meta'
import Icon from '@/components/Icon'
import EventHub from '@/EventHub'
import scssConstants from '@/assets/scss/constants.scss'
import urls from '@/config/urls'
import constants from '@/config/constants'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import VueMatomo from 'vue-matomo'
import has from 'lodash/has'
import { mixin as clickaway } from 'vue-clickaway'
import { apolloProvider } from '@/vue-apollo'

// TASKS FOR PRODUCTION ONLY:
if (process.env.NODE_ENV === 'production') {
  // Options: https://docs.sentry.io/error-reporting/configuration/?platform=browsernpm
  Sentry.init({
    dsn: 'replace-with-dsn',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })

  // Setup Tracking
  Vue.use(VueMatomo, {
    host: '//url-to-matomo.de/',
    siteId: 1,
    router: router,
    debug: true
  })
}

// Handle Vue Errors
Vue.config.errorHandler = function(error, vm, info) {
  // https://github.com/vuejs/vue/issues/8433#issuecomment-461206209
  Vue.util.warn(`Error in ${info}: "${error.toString()}"`, vm)
  console.error(error)

  // TODO: Error meta data might not come from extensions, adjust accordingly:
  if (!has(error, 'extensions.key'))
    error.extensions = { ...error.extensions, key: `vue.error.${info}` }

  store.dispatch('error/handle', { error })
}

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(PortalVue)
Vue.use(VueWait)
Vue.use(VueMeta)

Vue.prototype.$eventHub = EventHub
Vue.prototype.$scssConstants = scssConstants
Vue.prototype.$urls = urls
Vue.prototype.$constants = constants

// Setup Axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL

// Setup Router
const router = createRouter()
// Logic for redirect to request url from: https://stackoverflow.com/a/51034158/7236347
router.beforeEach((to, from, next) => {
  if (to.meta.auth !== false && !store.getters['auth/isLoggedIn']) {
    const loginpath = to.path || window.location.pathname
    next({ path: '/login', query: { from: loginpath } })
  }

  next()
})

// Global Components
Vue.component('Icon', Icon)

// Global Mixins
Vue.mixin(clickaway)
Vue.mixin({
  methods: {
    $hasRole(role) {
      return store.getters['auth/hasRole'](role)
    }
  }
})

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true
  }),
  render: h => h(App),
  apolloProvider: apolloProvider
}).$mount('#app')
