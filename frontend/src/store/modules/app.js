import * as types from '../types'

import authApi from '../../services/auth'
import { addMinutes, format } from 'date-fns'
import router from '../../router'
import { handleError } from '../../utils/utils'

const REFRESH_TOKEN_LIFE = 1440

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
