const { validationResult } = require('../middleware/utils')
const validator = require('validator')
const { body, param } = require('express-validator')

exports.createDivision = [
  body('name')
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

exports.deleteDivision = [
  param('division_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

exports.addUserToDivision = [
  param('division_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  body('user_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

exports.removeUserFromDivision = [
  param('division_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  param('user_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]
