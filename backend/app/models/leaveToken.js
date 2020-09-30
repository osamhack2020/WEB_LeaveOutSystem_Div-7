const mongoose = require('mongoose')

// 발행한 사용가능 출타들

const LeaveTokenSchema = new mongoose.Schema({
  division: {
    type: mongoose.Types.ObjectId,
    ref: 'Division'
  },
  issuer: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
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
  amount: {
    type: Number,
    required: true
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
