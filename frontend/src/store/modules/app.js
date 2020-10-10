import * as types from '../types'

export default {
  state: {
    appLoading: false
  },
  getters: {
    isAppLoading: state => state.appLoading
  },
  mutations: {
    [types.SET_APP_LOADING](state, value) {
      state.appLoading = value
    }
  },
  actions: {
    startAppLoading({ commit }) {
      commit(types.SET_APP_LOADING, true)
    },
    endAppLoading({ commit }) {
      commit(types.SET_APP_LOADING, false)
    }
  }
}
