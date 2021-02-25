// For shared configs between App and Storybook
import 'what-input'
import axios from 'axios'
import PortalVue from 'portal-vue'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueWait from 'vue-wait'
import Vuex from 'vuex'

import constants from '@/constants/default'
import urls from '@/constants/urls'

// This magically imports all :exported scss variables
import scssVariables from '@/assets/scss/constants.scss'

import store from '@/store'
import { apolloProvider } from '@/vue-apollo'
import EventHub from '@/EventHub'
import ViewportObserver from '@/utilities/viewportObserver'

Vue.config.productionTip = false

// Setup Axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.use(Vuex)
Vue.use(PortalVue)
Vue.use(VueWait)
Vue.use(VueMeta)

// Global event bus
Vue.prototype.$eventHub = EventHub

// Reactive observer for different viewport variables
Vue.prototype.$viewport = ViewportObserver

// Global scss Constants
Vue.prototype.$scss = scssVariables

// Global persoplan constants
Vue.prototype.$constants = {
  ...constants,
  URLS: urls,
}

export const sharedComponentParts = {
  store,
  apolloProvider,
}
