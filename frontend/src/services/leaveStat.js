import axios from 'axios'

export default {
  async getMonthlyCount(year, month, status = ['accepted']) {
    return axios.get('/leave/statistics/monthly-count', {
      params: { year, month, status: status.join('|') }
    })
  },
  async getMonthly(year, month) {
    return axios.get('/leave/statistics/monthly', {
      params: { year, month }
    })
  }
}
