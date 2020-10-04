import axios from 'axios'

export default {
  async getAllDivision() {
    return await axios.get('/division')
  },
  async getDivisionByID(divisionId) {
    return await axios.get(`/division/${divisionId}`)
  },
  async deleteDivision(divisionId) {
    return await axios.delete(`/division/${divisionId}`)
  },
  async createDivision({ name, parent }) {
    return await axios.post(`/division`, { name, parent })
  }
}
