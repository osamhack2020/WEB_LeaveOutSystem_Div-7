const mongoose = require('mongoose')

const LeaveTokenSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'leave', // 휴가
      'sleepover', // 외박
      'goout' // 외출
    ]
  },
  kind: {
    type: String,
    enum: [
      'regular', // 정기
      'sick', // 병가
      'reward', // 포상
      'recruit', // 신병
      'etc' // 기타 또는 공무
    ]
  },

  reason: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('LeaveToken', LeaveTokenSchema)
