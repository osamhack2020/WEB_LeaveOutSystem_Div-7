const LeaveToken = require('../models/leaveToken')
const Leave = require('../models/leave')
const utils = require('../middleware/utils')
const { matchedData } = require('express-validator')
const parse = require('date-fns/parse')
const addDays = require('date-fns/addDays')

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

    return newleave
  })
  return ret
}

/********************
 * Public functions *
 ********************/

exports.getAvailables = utils.asyncRoute(async (req, res) => {
  const data = await LeaveToken.find({ target: req.user.username })
  res.status(200).json(data)
})

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

exports.adminGetApplies = utils.asyncRoute(async (req, res) => {
  const leaves = await Leave.find({ division: req.user.division })
    .populate('tokens')
    .populate('user')

  const ret = leaveAdditionalInfo(leaves)

  res.status(200).json(ret)
})

exports.adminDecideApply = utils.asyncRoute(async (req, res) => {
  const data = matchedData(req)

  await utils.isIDGood(data.apply)

  const apply = await Leave.findById(data.apply)
  apply.status = data.status
  await apply.save()
  res.status(200).json(apply)
})

exports.getLeaves = utils.asyncRoute(async (req, res) => {
  const data = await Leave.find({ user: req.user._id }).populate('tokens')
  res.status(200).json(leaveAdditionalInfo(data))
})
