import axios from 'axios'

export default {
  async login(payload) {
    return await axios.post('/login', payload)
  },
  async triggerRefreshToken() {
    return await axios.get('/token')
  }
}
