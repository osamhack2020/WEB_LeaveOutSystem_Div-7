const LeaveToken = require('../models/leaveToken')
const Leave = require('../models/leave')
const utils = require('../middleware/utils')
const { matchedData } = require('express-validator')
const parse = require('date-fns/parse')
const addDays = require('date-fns/addDays')

const _ = require('lodash')

/*********************
 * Private functions *
 *********************/

function getLeaveLength(leave) {
  return leave.tokens.reduce((acc, token) => acc + token.amount, 0)
}

// function getLeaveEndDate(startDate, length) {

// }

function leaveAdditionalInfo(leaves) {
  const ret = leaves.map((leave) => {
    const newleave = leave.toObject()

    newleave.length = getLeaveLength(leave)
    newleave.endDate = addDays(newleave.startDate, newleave.length - 1)
    newleave.type = leave.tokens[0] && leave.tokens[0].type

    return newleave
  })
  return ret
}

/********************
 * Public functions *
 ********************/

// 현재 유저가 사용 가능한 출타들 확인
exports.getAvailables = utils.asyncRoute(async (req, res) => {
  const data = await LeaveToken.find({ target: req.user.username })
  res.status(200).json(data)
})

// 유저가 사용 가능한 출타를 신청
exports.applyLeave = utils.asyncRoute(async (req, res) => {
  const data = matchedData(req)

  data.tokens.forEach(async (tokenId) => await utils.isIDGood(tokenId))

  const newleave = new Leave()

  newleave.user = req.user._id
  newleave.startDate = parse(data.departure, 'yyyy-MM-dd', new Date())
  newleave.division = req.user.division

  for (const tokenId of data.tokens) {
    newleave.tokens.push(tokenId)
  }

  await newleave.save()

  res.status(201).json(newleave)
})

// 관리자가 소속 부대의 출타 신청 목록을 가져옴
exports.adminGetApplies = utils.asyncRoute(async (req, res) => {
  const leaves = await Leave.find({ division: req.user.division })
    .populate('tokens')
    .populate('user')

  const ret = leaveAdditionalInfo(leaves)

  res.status(200).json(ret)
})

// 관리자가 출타 신청을 승인하거나 거부함
exports.adminDecideApply = utils.asyncRoute(async (req, res) => {
  const data = matchedData(req)

  await utils.isIDGood(data.apply)

  const apply = await Leave.findById(data.apply)
  apply.status = data.status
  await apply.save()
  res.status(200).json(apply)
})

// 승인, 거부, 대기중인 출타 정보들을 가져옴
exports.getLeaves = utils.asyncRoute(async (req, res) => {
  const data = await Leave.find({ user: req.user._id }).populate('tokens')
  res.status(200).json(leaveAdditionalInfo(data))
})

/**
 * 대시보드 관련 라우트
 */

// 사용 가능한 출타 개수 계산
exports.dashboardGetAvailableCount = utils.asyncRoute(async (req, res) => {
  const tokens = await LeaveToken.find({ target: req.user.username })
  const ret = {}
  for (const token of tokens) {
    try {
      const leave = await Leave.find({
        $and: [
          { user: req.user._id },
          { status: { $ne: 'pending' } },
          { tokens: token._id }
        ]
      })
      if (leave.length === 0) {
        throw new Error()
      }
    } catch (error) {
      ret[token.type] = ret[token.type] || {}
      if (!ret[token.type][token.kind]) {
        ret[token.type][token.kind] = { count: 1, amount: token.amount }
      } else {
        const { count, amount } = ret[token.type][token.kind]
        ret[token.type][token.kind] = {
          count: count + 1,
          amount: amount + token.amount
        }
      }
    }
  }

  res.status(200).json(ret)
})

// 출타 현황 정보
const leaveStatusEnum = Object.freeze(['accepted', 'denied', 'pending'])
exports.dashboardGetLeaveCount = utils.asyncRoute(async (req, res) => {
  const ret = {}
  for (const status of leaveStatusEnum) {
    const count = await Leave.countDocuments({
      $and: [{ user: req.user._id }, { status }]
    })
    ret[status] = count
  }

  res.status(200).json(ret)
})

// 출타 히스토리

exports.dashboardGetLeaveHistory = utils.asyncRoute(async (req, res) => {
  const ret = {}

  const leaves = leaveAdditionalInfo(
    await Leave.find({ user: req.user._id }).populate('tokens')
  )
  for (const leave of leaves) {
    if (ret[leave.type] === undefined) {
      ret[leave.type] = { amount: 0, count: 0 }
    }
    ret[leave.type].amount += leave.length
    ret[leave.type].count += 1
  }
  
  res.status(200).json(ret)
})
