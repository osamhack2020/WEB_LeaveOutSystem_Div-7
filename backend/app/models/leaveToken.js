const mongoose = require('mongoose')

// 발행한 사용가능 출타들

const LeaveTokenSchema = new mongoose.Schema({
  // 해당 부대
  division: {
    type: mongoose.Types.ObjectId,
    ref: 'Division'
  },
  // 출타 발행자
  issuer: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  // 출타 대상자
  target: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  // 유효 시작일
  effectiveDate: {
    type: Date,
    required: true
  },
  // 유효 만료일
  expirationDate: {
    type: Date,
    required: true
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
      'comfort', // 위로
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
