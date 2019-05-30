import Vue from 'vue'
import axios from 'axios'
import Icon from '@/components/Icon'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue()

// Global Components
Vue.component('Icon', Icon)
