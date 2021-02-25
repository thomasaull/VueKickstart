// import KnownErrors from '@/KnownErrors'
// import * as Sentry from '@sentry/browser'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import filter from 'lodash/filter'
import has from 'lodash/has'
import cuid from 'cuid'
import * as Sentry from '@sentry/browser'

const state = {
  errors: [],
}

const mutations = {
  add(state, error) {
    state.errors = [...state.errors, error]
  },

  markAsRead(state, id) {
    console.log('mark as read', id)
    try {
      const error = find(state.errors, { id: id })
      error.read = true
    } catch (error) {
      console.error('error/markAsRead: Error')
    }
  },
}

const getters = {
  unread(state) {
    const unreadErrors = filter(state.errors, { read: false, critical: true })

    forEach(state.errors, (error) => {
      console.log(error.message, error.read)
    })

    return unreadErrors
  },

  latestUnread(state, getters) {
    if (getters.unread.length) return getters.unread[getters.unread.length - 1]
  },
}

const actions = {
  handle({ dispatch }, { error, silent = false, critical = false } = {}) {
    if (has(error, 'graphQLErrors')) {
      forEach(error.graphQLErrors, (error) => {
        error.silent = silent
        error.critical = critical
        dispatch('add', error)
      })

      return
    }

    error.silent = silent
    error.critical = critical
    dispatch('add', error)
  },

  add({ commit, dispatch }, error) {
    // merge extensions on root object and overwrite local props with server props
    if (has(error, 'extensions')) {
      error = { ...error, ...error.extensions, message: error.message }
      delete error.extensions
    }

    // transform error:
    error = {
      message: error.message,
      read: false,
      id: cuid.slug(),
      report: error.report,
      critical: error.critical,
      silent: error.silent,
    }

    // maybe send error to sentry:
    if (!has(error, 'report') || error.report !== false) {
      Sentry.captureException(new Error(error.message))
    }

    // don't show error to user if its a silent error
    if (error.silent) return

    // add notification for non critical errors
    if (error.critical === false) {
      return dispatch('notification/addError', error, { root: true })
    }

    commit('add', error)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
