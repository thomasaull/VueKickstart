import * as Sentry from '@sentry/browser'
import Vue from 'vue'

const state = {
  enabled: process.env.NODE_ENV === 'production',
  trackingEnabled: process.env.NODE_ENV === 'production',
  breadcrumbsEnabled: process.env.NODE_ENV === 'production',
}

const mutations = {
  event(state, { category = undefined, action = undefined, name, value } = {}) {
    if (!state.enabled) {
      console.log(`tracking: event (${category}, ${action}, ${name})`)
      return
    }

    if (state.trackingEnabled) {
      try {
        Vue.prototype.$matomo.trackEvent(category, action, name, value)
      } catch (error) {
        throw new Error('Vue.prototype.$matomo not initialized')
      }
    }

    if (state.breadcrumbsEnabled) {
      Sentry.addBreadcrumb({
        category: category,
        message: `${action}: ${name}`,
        level: 'info',
      })
    }
  },

  goal(state, { goalId }) {
    if (!goalId) {
      throw new Error('no goalId specified!')
    }

    if (!state.enabled) {
      console.log(`tracking: goal (${goalId})`)
      return
    }

    if (state.trackingEnabled) {
      try {
        Vue.prototype.$matomo.trackGoal(goalId)
      } catch (error) {
        throw new Error('Vue.prototype.$matomo not initialized')
      }
    }
  },
}
const getters = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
