import axios from 'axios'

export default {
  async getAvailables() {
    return await axios.get('/leave/available')
  },
  async applyLeave(departure, tokens) {
    return await axios.post('/leave/apply', { departure, tokens })
  }
}
