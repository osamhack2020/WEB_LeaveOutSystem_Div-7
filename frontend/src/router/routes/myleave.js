export default [
  {
    path: '/myleave',
    name: 'myLeave',
    meta: {},
    component: () => import('../../views/MyLeave/Dashboard.vue')
  },
  {
    path: '/myleave/leave-available',
    name: 'leave-available',
    meta: {},
    component: () => import('../../views/MyLeave/LeaveAvailable.vue')
  },
  {
    path: '/myleave/leave-status',
    name: 'leave-status',
    meta: {},
    component: () => import('../../views/MyLeave/LeaveStatus.vue')
  },
  {
    path: '/myleave/leave-history',
    name: 'leave-history',
    meta: {},
    component: () => import('../../views/MyLeave/LeaveHistory.vue')
  },
  {
    path: '/myleave/leave-calendar',
    name: 'leave-calendar',
    meta: {},
    component: () => import('../../views/MyLeave/LeaveCalendar.vue')
  }
]
