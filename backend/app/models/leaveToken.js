const mongoose = require('mongoose')
const user = require('./user')
const division = require('./division')

// 발행한 사용가능 출타들

const LeaveTokenSchema = new mongoose.Schema({
  // 해당 부대
  division: {
    type: String,
    ref: 'Division'
  },
  // 출타 발행자
  issuer: {
    type: String,
    ref: 'User'
  },
  // 출타 대상자
  target: [
    {
      type: String,
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
      '휴가', //leave
      '외박', //sleepover
      '외출' //goout
    ]
  },
  kind: {
    type: String,
    enum: [
      '정기', // regular
      '병가', // sick
      '포상', // reward
      '신병', // recruit
      '기타' // etc
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
