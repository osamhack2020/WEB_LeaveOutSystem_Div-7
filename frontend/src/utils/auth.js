import { isPast, parseISO } from 'date-fns'
import store from '../store'

export function triggerTokenRefresh() {
  if (
    window.localStorage.getItem('access_token') !== null &&
    window.localStorage.getItem('token_expire') !== null
  ) {
    const tokenExpire = window.localStorage.getItem('token_expire')
    if (isPast(new Date(parseISO(JSON.parse(tokenExpire))) * 1000)) {
      store.dispatch('refreshToken')
    }
  }
}
