import axios from 'axios'

export default {
  async getAvailables() {
    return await axios.get('/leave/available')
  }
}
