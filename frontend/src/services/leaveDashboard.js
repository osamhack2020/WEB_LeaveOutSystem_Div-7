import axios from 'axios'

export default {
  async getAvailableTokens() {
    return await axios.get('/leave/dashboard/token-count')
  }
}
