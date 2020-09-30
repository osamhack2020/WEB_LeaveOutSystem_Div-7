const mongoose = require('mongoose')

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
  amount: {
    type: Number,
    default: 1
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
