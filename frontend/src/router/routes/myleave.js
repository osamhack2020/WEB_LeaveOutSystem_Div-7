export default [
  {
    path: '/myleave',
    name: 'myLeave',
    meta: {
      noAuthRequired: true
    },
    component: () => import('../../views/MyLeave.vue')
  }
]
