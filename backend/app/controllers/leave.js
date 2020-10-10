const LeaveToken = require('../models/leaveToken')
const User = require('../models/user')
const utils = require('../middleware/utils')
const userUtils = require('../middleware/user')
const { matchedData } = require('express-validator')
const db = require('../middleware/db')

/*********************
 * Private functions *
 *********************/

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

  res.status(201).json({})
})
