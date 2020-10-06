import axios from 'axios'

export default {
  async getLeaveTokens(params) {
    return await axios.get('/leaveTokens', params)
  },
  async createLeaveToken(data) {
    return await axios.post('/leaveTokens', data)
  },
  async editLeaveToken(data) {
    return await axios.patch(`/leaveTokens/${data._id}`, data)
  },
  async deleteLeaveToken(userId) {
    return await axios.delete(`/leaveTokens/${userId}`)
  }
}
