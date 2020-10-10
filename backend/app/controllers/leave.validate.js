const { validationResult } = require('../middleware/utils')
const { body } = require('express-validator')
const _ = require('lodash')

exports.applyLeave = [
  body('departure')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  body('tokens')
    .custom((item) => _.isArray(item))
    .withMessage('MISSING'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

exports.adminGetApplies = []
