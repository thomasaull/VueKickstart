import find from 'lodash/find'
import filter from 'lodash/filter'
import cuid from 'cuid'

const state = {
  notifications: [],
}

const mutations = {
  add(state, notification) {
    state.notifications = [...state.notifications, notification]
  },

  markAsRead(state, id) {
    try {
      const notification = find(state.notifications, { id: id })
      notification.read = true
    } catch (error) {
      console.error('notification/markAsRead: Error')
    }
  },
}

const getters = {
  unread(state) {
    return filter(state.notifications, { read: false })
  },
}

const actions = {
  addError({ commit }, error) {
    const notification = {
      type: 'error',
      message: error.message,
      id: cuid.slug(),
      read: false,
    }

    commit('add', notification)
  },

  add(
    { commit },
    {
      type = 'default',
      message = undefined,
      action = undefined,
      routerLink = undefined,
    } = {}
  ) {
    const notification = {
      type: type,
      message: message,
      action: action,
      routerLink: routerLink,
      id: cuid.slug(),
      read: false,
    }

    commit('add', notification)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
