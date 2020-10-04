import * as types from '../types'

import authApi from '../../services/auth'
import { addMinutes, format } from 'date-fns'
import router from '../../router'
import { handleError } from '../../utils/utils'

const REFRESH_TOKEN_LIFE = 1440

export default {
  state: {
    user: null,
    accessToken: JSON.parse(!!localStorage.getItem('access_token')) || null
  },
  getters: {
    isAuthed: state => {
      return !!state.accessToken
    },
    user: state => {
      return state.user
    },
    accessToken: state => {
      return state.accessToken
    },
    isAdmin: state => {
      return !!state.user && state.user.role === 'admin'
    },
    isModerator: state => {
      return !!state.user && state.user.role === 'moderator'
    },
    isUser: state => {
      return !!state.user && state.user.role === 'user'
    }
  },
  mutations: {
    [types.SET_ACCESS_TOKEN](state, accessToken) {
      state.accessToken = accessToken
    },
    [types.LOGOUT](state) {
      state.user = null
      state.accessToken = null
    },
    [types.SET_LOGIN_USER](state, user) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const res = await authApi.login(payload)
        if (res.status === 200) {
          commit(types.SET_LOGIN_USER, res.data.user)
          commit(types.SET_ACCESS_TOKEN, res.data.token)

          localStorage.setItem('user', JSON.stringify(res.data.user))
          localStorage.setItem('access_token', JSON.stringify(res.data.token))
          localStorage.setItem(
            'token_expire',
            JSON.stringify(
              format(addMinutes(new Date(), REFRESH_TOKEN_LIFE), 'X')
            )
          )

          router.push('/')
        }
      } catch (e) {
        await handleError(e)
      }
    },
    async triggerTokenRefresh({ commit }) {
      const res = await authApi.triggerRefreshToken()
      if (res.status !== 200) {
      }
      commit(types.SET_ACCESS_TOKEN, res.data.token)
      localStorage.setItem('access_token', JSON.stringify(res.data.token))
      localStorage.setItem(
        'token_expire',
        JSON.stringify(format(addMinutes(new Date(), REFRESH_TOKEN_LIFE), 'X'))
      )
    },
    async autoLogin({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'))
      commit(types.SET_LOGIN_USER, user)
      commit(
        types.SET_ACCESS_TOKEN,
        JSON.parse(localStorage.getItem('access_token'))
      )
    },
    async logout({ commit }) {
      commit(types.LOGOUT)
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('token_expire')

      router.push('/login')
    }
  }
}
