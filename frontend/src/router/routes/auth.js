export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      noAuthRequired: true
    },
    component: () => import('../../views/Login.vue')
  }
]
