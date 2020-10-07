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
  }
]
