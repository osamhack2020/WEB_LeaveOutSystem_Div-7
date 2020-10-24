const LeaveToken = require('../models/leaveToken')
const Leave = require('../models/leave')
const utils = require('../middleware/utils')
const { matchedData } = require('express-validator')
const {
  parse,
  addDays,
  addMonths,
  endOfMonth,
  getDaysInMonth,
  getMonth,
  eachDayOfInterval,
  getDate,
  differenceInCalendarMonths
} = require('date-fns')

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

async function getAvailableTokens(user) {
  const tokens = await LeaveToken.find({ target: user.username })

  const ret = []
  for (const token of tokens) {
    const leave = await Leave.find({
      $and: [
        { user: user._id }, // 해당 유저의 출타이면서
        { tokens: token._id }, // 이 토큰을 쓰면서
        {
          $or: [
            { status: { $ne: 'denied' } }, // 거부된게 아니거나
            {
              $and: [
                { expirationDate: { $lt: new Date() } },
                { effectiveDate: { $gt: new Date() } }
              ]
            } // 기간을 벗어나면
          ]
        }
      ]
    })
    if (leave.length === 0) {
      ret.push(token)
    }
  }
  return ret
}

/********************
 * Public functions *
 ********************/

// 현재 유저가 사용 가능한 출타들 확인
exports.getAvailables = utils.asyncRoute(async (req, res) => {
  data = await getAvailableTokens(req.user)

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

// 승인, 거부, 대기중인 출타 정보들을 가져옴
exports.getLeaves = utils.asyncRoute(async (req, res) => {
  const data = await Leave.find({
    user: req.user._id,
    startDate: { $gte: new Date() }
  }).populate('tokens')
  res.status(200).json(leaveAdditionalInfo(data))
})

// 지나간 출타 기록들을 가져옴
exports.getLeaveHistory = utils.asyncRoute(async (req, res) => {
  const data = await Leave.find({
    $and: [{ user: req.user._id }, { startDate: { $lte: new Date() } }]
  }).populate('tokens')
  res.status(200).json(leaveAdditionalInfo(data))
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

// 승인된 모든 출타
exports.getAccepted = utils.asyncRoute(async (req, res) => {
  const data = await Leave.find({
    status: 'accepted',
    division: req.user.division
  })
    .populate('tokens')
    .populate('user')
  const ret = leaveAdditionalInfo(data)
  res.status(200).json(ret)
})

exports.getMonthlyCountStatistics = utils.asyncRoute(async (req, res) => {
  const data = matchedData(req)

  const start = new Date(data.year, data.month, 1)
  const end = endOfMonth(addMonths(start, 1))

  const leaves = leaveAdditionalInfo(
    await Leave.find({
      division: req.user.division,
      startDate: { $gte: start, $lte: end },
      status: { $in: data.status.split('|') }
    }).populate('tokens')
  )

  const countData = [...new Array(2)].map((__, index) => {
    return [...new Array(getDaysInMonth(addMonths(start, index)))].map(() => 0)
  })

  for (const leave of leaves) {
    for (const day of eachDayOfInterval({
      start: leave.startDate,
      end: leave.endDate
    })) {
      const monthIdx = differenceInCalendarMonths(day, start)
      if (monthIdx >= 0 && monthIdx < 2) {
        countData[monthIdx][getDate(day) - 1]++
      }
    }
  }

  res.status(200).json(countData)
})

/**
 * 대시보드 관련 라우트
 */

// 사용 가능한 출타 개수 계산
exports.dashboardGetAvailableCount = utils.asyncRoute(async (req, res) => {
  const ret = {}

  const tokens = await getAvailableTokens(req.user)

  for (const token of tokens) {
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

  res.status(200).json(ret)
})

// 출타 현황 정보
const leaveStatusEnum = Object.freeze(['accepted', 'denied', 'pending'])
exports.dashboardGetLeaveCount = utils.asyncRoute(async (req, res) => {
  const ret = {}
  for (const status of leaveStatusEnum) {
    const count = await Leave.countDocuments({
      $and: [
        { user: req.user._id },
        { status },
        { startDate: { $gte: new Date() } }
      ]
    })
    ret[status] = count
  }

  res.status(200).json(ret)
})

// 출타 히스토리

exports.dashboardGetLeaveHistory = utils.asyncRoute(async (req, res) => {
  const ret = {}

  const leaves = leaveAdditionalInfo(
    await Leave.find({
      $and: [
        { user: req.user._id },
        { status: 'accepted' },
        { startDate: { $lte: new Date() } }
      ]
    }).populate('tokens')
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

// 유저용 부대 출타 통계

exports.dashboardGetLeaveStat = utils.asyncRoute(async (req, res) => {
  const statusCount = {}

  for (const type of ['휴가', '외출', '외박']) {
    statusCount[type] = {}

    for (const status of leaveStatusEnum) {
      statusCount[type][status] = leaveAdditionalInfo(
        await Leave.find({
          division: req.user.division,
          startDate: { $gte: new Date() },
          status
        }).populate('tokens')
      ).filter((leave) => leave.type === type).length
    }
  }

  res.status(200).json({ statusCount })
})
