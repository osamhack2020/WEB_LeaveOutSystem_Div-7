import axios from 'axios'

export default {
  async getLeaveTokens(params) {
    return await axios.get('/leaveTokens', params)
  },
  async createLeaveToken(data) {
    if (!data.role) {
      data.role = 'user'
    }
    if (data.division && data.division._id) {
      data.division = data.division._id
    }
    return await axios.post('/leaveTokens', data)
  },
  async editLeaveToken(data) {
    if (!data.role) {
      data.role = 'user'
    }
    if (data.division && data.division._id) {
      data.division = data.division._id
    }
    if (!data.password) {
      delete data.password
    }
    return await axios.patch(`/leaveTokens/${data._id}`, data)
  },
  async deleteLeaveToken(userId) {
    return await axios.delete(`/leaveTokens/${userId}`)
  }
}
