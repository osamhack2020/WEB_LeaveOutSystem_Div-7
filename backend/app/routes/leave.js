const controller = require('../controllers/leave')
const validate = require('../controllers/leave.validate')
const AuthController = require('../controllers/auth')
const router = require('express').Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * 모든 부대 조회
 */
router.get(
  '/available',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  controller.getAvailables
)

module.exports = router