import forEach from 'lodash/forEach'

export const state = () => ({
  touchInterface: false
})

export const mutations = {
  set(state, data) {
    forEach(data, (value, key) => {
      state[key] = value
    })
  }
}

export const getters = {}

export const actions = {}
