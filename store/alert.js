export const state = () => ({
  type: null,
  message: null
})

export const getters = {
  alert: state => state
}

export const actions = {
  success ({ commit }, message) {
    commit('success', message)
  },
  error ({ commit }, message) {
    commit('error', message)
  },
  clear ({ commit }) {
    commit('clear')
  }
}

export const mutations = {
  success (state, message) {
    state.type = 'alert-success'
    state.message = message
  },
  error (state, message) {
    state.type = 'alert-danger'
    state.message = message
  },
  clear (state) {
    state.type = null
    state.message = null
  }
}
