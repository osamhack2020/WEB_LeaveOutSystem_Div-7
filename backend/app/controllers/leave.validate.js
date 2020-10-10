const { validationResult } = require('../middleware/utils')
const validator = require('validator')
const { body, param } = require('express-validator')
const _ = require('lodash')

exports.applyLeave = [
  body('tokens')
    .custom((item) => _.isArray(item))
    .withMessage('MISSING'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]
