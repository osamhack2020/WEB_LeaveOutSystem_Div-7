import store from '../store'

export async function handleError(err) {
  let errMsg = ''

  if (err.response.status === 401) {
    store.dispatch('logout')
  } else if (err.response) {
    errMsg = err.response.data.errors.msg
  } else {
    errMsg = 'CONNECTION_ERROR'
  }
  const error = new Error()
  error.status = err.response.status
  error.message = errMsg
  throw error
}
