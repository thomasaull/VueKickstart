// This file is only used if you run vue and not nuxt!
import Vue from 'vue'
import App from '@/AppVue.vue'
import { createRouter } from '@/router'
import { state, mutations, getters, actions } from '@/store'
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

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(PortalVue)
Vue.use(VueWait)
Vue.use(VueMeta)

Vue.prototype.$eventHub = EventHub
Vue.prototype.$scssConstants = scssConstants
Vue.prototype.$urls = urls
Vue.prototype.$constants = constants

// Global Components
Vue.component('Icon', Icon)

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const router = createRouter()
const store = new Vuex.Store({ state, mutations, getters, actions })

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true
  }),
  render: h => h(App)
}).$mount('#app')
