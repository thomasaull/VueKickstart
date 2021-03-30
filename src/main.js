import * as Integrations from '@sentry/integrations'
import * as Sentry from '@sentry/browser'
import Vue from 'vue'
import VueMatomo from 'vue-matomo'

import { sharedComponentParts } from '@/sharedMain'
import App from '@/AppVue2.vue'
import { router } from '@/router'

// TASKS FOR PRODUCTION ONLY:
if (process.env.NODE_ENV === 'production') {
  // Options: https://docs.sentry.io/error-reporting/configuration/?platform=browsernpm
  Sentry.init({
    dsn: 'replace-with-dsn',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  })

  // Setup Tracking
  Vue.use(VueMatomo, {
    host: '//url-to-matomo.de/',
    siteId: 1,
    // router: router,
    debug: true,
  })
}

// Handle Vue Errors
// Vue.config.errorHandler = function(error, vm, info) {
//   // https://github.com/vuejs/vue/issues/8433#issuecomment-461206209
//   Vue.util.warn(`Error in ${info}: "${error.toString()}"`, vm)
//   console.error(error)

//   // TODO: Error meta data might not come from extensions, adjust accordingly:
//   if (!has(error, 'extensions.key'))
//     error.extensions = { ...error.extensions, key: `vue.error.${info}` }

//   store.dispatch('error/handle', { error })
// }

new Vue({
  ...sharedComponentParts,
  router,
  render: (h) => h(App),
}).$mount('#app')
