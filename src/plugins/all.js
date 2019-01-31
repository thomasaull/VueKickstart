import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue()
