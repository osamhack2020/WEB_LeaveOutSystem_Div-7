const { validationResult } = require('../middleware/utils')
const { body, check } = require('express-validator')
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

exports.adminDecideApply = [
  body('status')
    .exists()
    .withMessage('MISSING')
    .isIn(['accepted', 'denied', 'pending'])
    .trim(),
  body('apply')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

exports.getLeaves = []

exports.getMonthlyCountStatistics = [
  check('year')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('month')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('status')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]
