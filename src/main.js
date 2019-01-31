// This file is only used if you run vue and not nuxt!
import Vue from 'vue'
import App from '@/AppVue.vue'
import { createRouter } from '@/router'
import { state, mutations, getters, actions } from '@/store'
import axios from 'axios'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue()
Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const router = createRouter()
const store = new Vuex.Store({ state, mutations, getters, actions })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
