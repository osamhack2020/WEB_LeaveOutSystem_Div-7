import axios from 'axios'

export default {
  async getAvailables() {
    return await axios.get('/leave/available')
  },
  async getLeaves() {
    return await axios.get('/leave/apply')
  },
  async getLeaveHistory() {
    return await axios.get('/leave/apply-history')
  },
  async getAccepted() {
    return await axios.get('/leave/accepted')
  },
  async applyLeave(departure, tokens) {
    return await axios.post('/leave/apply', {
      departure,
      tokens,
      username: JSON.parse(localStorage.getItem('user'))._id
    })
  },
  async adminGetApplies() {
    return await axios.get('/leave/admin/apply')
  },
  async adminDecideApply(apply, status) {
    return await axios.post('/leave/admin/decide', { apply, status })
  }
}
