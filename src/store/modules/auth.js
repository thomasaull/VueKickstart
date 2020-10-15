import { apolloProvider } from '@/vue-apollo'
import LoginMutation from '@/graphql/LoginMutation.graphql'
import LogoutMutation from '@/graphql/LogoutMutation.graphql'
import * as BABYLON from 'babylonjs'
import router from '@/router'
import includes from 'lodash/includes'
import map from 'lodash/map'
import axios from 'axios'

const AUTH_TOKEN = 'blupp-token'
const AUTH_ROLES = 'blupp-roles'

const state = {
  token: undefined,
  roles: []
}

const mutations = {
  setToken(state, token) {
    state.token = token

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // store token in local storage
    if (typeof localStorage !== 'undefined' && token) {
      localStorage.setItem(AUTH_TOKEN, token)
    }
  },

  setRoles(state, roles) {
    state.roles = map(roles, 'name')

    // store roles in local storage
    if (typeof localStorage !== 'undefined' && roles) {
      localStorage.setItem(AUTH_ROLES, JSON.stringify(roles))
    }
  },

  resetToken(state) {
    state.token = undefined

    delete BABYLON.Tools.CustomRequestHeaders.Authorization
    delete axios.defaults.headers.common['Authorization']

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN)
    }
  }
}

const getters = {
  isLoggedIn(state) {
    if (state.token) return true
    return false
  },

  hasRole: state => role => {
    return includes(state.roles, role)
  }
}

const actions = {
  async resetApolloStore({ dispatch }) {
    try {
      await apolloProvider.defaultClient.resetStore()
      console.log('store resetted')
    } catch (error) {
      dispatch(
        'error/handle',
        {
          error: new Error(
            'Error while resetting apollo cache. Please reload your browser window'
          )
        },
        { root: true }
      )
    }
  },

  async login(
    { commit, dispatch },
    { email, password, resetApolloStore = true } = {}
  ) {
    try {
      await apolloProvider.defaultClient.mutate({
        mutation: LoginMutation,

        variables: {
          email: email,
          password: password
        },

        update(store, { data }) {
          commit('setToken', data.login.token)
          commit('setRoles', data.login.user.roles)
        }
      })

      if (resetApolloStore) await dispatch('resetApolloStore')
    } catch (error) {
      dispatch('error/handle', { error, silent: true }, { root: true })
      throw new Error(error.graphQLErrors[0].message)
    }
  },

  async loginFromLocalStorage({ commit, dispatch }) {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(AUTH_TOKEN)
      if (!token) return false

      const roles = JSON.parse(localStorage.getItem(AUTH_ROLES))
      if (!roles) return false

      commit('setToken', token)
      commit('setRoles', roles)

      await dispatch('resetApolloStore')

      return true
    }

    return false
  },

  async logout({ commit, dispatch }) {
    router.push('/logout')
    dispatch('wait/start', 'logout', { root: true })

    try {
      await apolloProvider.defaultClient.mutate({
        mutation: LogoutMutation
      })

      await dispatch('resetApolloStore')
    } catch (error) {
      dispatch('error/handle', { error, silent: true }, { root: true })
      throw new Error(error.message)
    } finally {
      commit('resetToken')
      dispatch('wait/end', 'logout', { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
