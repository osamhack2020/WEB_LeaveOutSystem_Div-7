import axios from 'axios'

export default {
  async getMonthly(year, month, status = ['accepted']) {
    return axios.get('/leave/statistics/monthly-count', {
      params: { year, month, status: status.join('|') }
    })
  }
}
