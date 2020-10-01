export default [
  {
    path: '/',
    name: 'main',
    meta: {
      noAuthRequired: true
    },
    component: () => import('../../views/Main.vue')
  }
]
