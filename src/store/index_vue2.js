import Vue from 'vue'
import Vuex from 'vuex'
import forEach from 'lodash/forEach'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    touchInterface: false,
  },

  mutations: {
    set(state, data) {
      forEach(data, (value, key) => {
        state[key] = value
      })
    },
  },

  actions: {},
  modules: {},
})
