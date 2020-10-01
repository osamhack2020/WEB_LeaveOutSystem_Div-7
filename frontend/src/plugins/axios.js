import Vue from 'vue'
import axios from 'axios'
import { triggerTokenRefresh } from '../utils/auth'
import store from '../store'

axios.defaults.baseURL = process.env.API_BASE_URL || '/api'

axios.interceptors.request.use(
  config => {
    // request 직전에 조작

    const token = JSON.parse(localStorage.getItem('access_token'))
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // response 직전에 조작
    triggerTokenRefresh()
    return response
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch('logout')
    }
    return Promise.reject(error)
  }
)

// eslint-disable-next-line no-shadow
Plugin.install = function(Vue) {
  Vue.axios = axios
  window.axios = axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios
      }
    },
    $axios: {
      get() {
        return axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
