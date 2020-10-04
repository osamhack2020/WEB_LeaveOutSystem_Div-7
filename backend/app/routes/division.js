const controller = require('../controllers/division')
const validate = require('../controllers/division.validate')
const AuthController = require('../controllers/auth')
const router = require('express').Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

//

/*
 * 모든 부대 조회
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  controller.getAllDivisions
)

/*
 * 부대 추가
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.createDivision,
  controller.createDivision
)

/*
 * 부대 하나 조회
 */
router.get(
  '/:division_id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  controller.getDivision
)

/*
 * 부대 삭제
 */
router.delete(
  '/:division_id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.deleteDivision,
  controller.deleteDivision
)

/*
 * 부대 유저 추가
 */
router.post(
  '/:division_id',
  requireAuth,
  AuthController.roleAuthorization(['moderator', 'admin']),
  trimRequest.all,
  validate.addUserToDivision,
  controller.addUserToDivision
)

/*
 * 부대 유저 삭제
 */
router.delete(
  '/:division_id/:user_id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  validate.removeUserFromDivision,
  trimRequest.all,
  controller.deleteUserFromDivision
)

module.exports = router
