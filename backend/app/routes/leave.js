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
 * 내 출타 조회
 */
router.get(
  '/available',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  controller.getAvailables
)

/*
  내 출타 기록 조회
*/

router.get(
  '/apply',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  validate.getLeaves,
  controller.getLeaves
)

/**
 * 내 출타 신청
 */
router.post(
  '/apply',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  validate.applyLeave,
  controller.applyLeave
)

/**
 * 내 출타 히스토리 조회
 */
router.get(
  '/apply-history',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  controller.getLeaveHistory
)

router.get(
  '/admin/apply',
  requireAuth,
  AuthController.roleAuthorization(['moderator', 'admin']),
  trimRequest.all,
  validate.adminGetApplies,
  controller.adminGetApplies
)

// 승인된 모든 출타
router.get(
  '/accepted',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  controller.getAccepted
)

// 날짜별 출타수 데이터 생성
router.get(
  '/statistics/monthly-count',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  validate.getMonthlyCountStatistics,
  controller.getMonthlyCountStatistics
)

// 월별 출타 통계 생성
router.get(
  '/statistics/monthly',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  validate.getMonthlyStatistics,
  controller.getMonthlyStatistics
)

/**
 * 출타 승인/거부
 */
router.post(
  '/admin/decide',
  requireAuth,
  AuthController.roleAuthorization(['moderator', 'admin']),
  trimRequest.all,
  validate.adminDecideApply,
  controller.adminDecideApply
)

// 대시보드

// 사용 가능한 출타토큰 개수 조회
router.get(
  '/dashboard/token-count',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  controller.dashboardGetAvailableCount
)

// 출타 현황 개수 조회
router.get(
  '/dashboard/leave-count',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  controller.dashboardGetLeaveCount
)

// 출타 히스토리 개수 조회
router.get(
  '/dashboard/leave-history-count',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  controller.dashboardGetLeaveHistory
)

// 유저용 출타 통계 조회
router.get(
  '/dashboard/leave-stat',
  requireAuth,
  AuthController.roleAuthorization(['user', 'moderator', 'admin']),
  trimRequest.all,
  controller.dashboardGetLeaveStat
)

module.exports = router
