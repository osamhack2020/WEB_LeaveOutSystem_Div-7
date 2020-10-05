const mongoose = require('mongoose')

// 사용하거나 신청한 출타들

const LeaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeaveToken'
  },

  startDate: {
    type: Date
  },
  status: {
    type: String,
    enum: [
      'accepted', // 승인됨
      'denied', // 거부됨
      'pending' // 대기중
    ]
  },
  message: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Leave', LeaveSchema)