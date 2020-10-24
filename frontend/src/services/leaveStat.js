import axios from 'axios'

export default {
  async getMonthly(year, month) {
    return axios.get('/leave/statistics/monthly', { params: { year, month } })
  }
}
