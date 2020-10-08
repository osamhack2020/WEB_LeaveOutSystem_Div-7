const { validationResult } = require('../middleware/utils')
const validator = require('validator')
const { body, param } = require('express-validator')

exports.getAvailables = [
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
