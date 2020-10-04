import axios from 'axios'

export default {
  async getUsers(params) {
    return await axios.get('/users', params)
  },
  async createUser(data) {
    if (!data.role) {
      data.role = 'user'
    }
    if (data.division && data.division._id) {
      data.division = data.division._id
    }
    return await axios.post('/users', data)
  },
  async editUser(data) {
    if (!data.role) {
      data.role = 'user'
    }
    if (data.division && data.division._id) {
      data.division = data.division._id
    }
    if (!data.password) {
      delete data.password
    }
    return await axios.patch(`/users/${data._id}`, data)
  },
  async deleteUser(userId) {
    return await axios.delete(`/users/${userId}`)
  }
}
