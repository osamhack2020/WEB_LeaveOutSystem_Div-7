import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import routes from './routes'
import { triggerTokenRefresh } from '../utils/auth'

import store from '../store'

Vue.use(VueRouter)
Vue.use(VueMeta)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routes]
})

router.beforeEach((to, from, next) => {
  store.dispatch('startAppLoading')
  const noAuthRequired = to.matched.some(rou => rou.meta.noAuthRequired)
  const isAuthed = store.getters.isAuthed

  if (!noAuthRequired && !isAuthed) {
    return next('/login')
  }
  triggerTokenRefresh()
  return next()
})

router.afterEach(() => {
  store.dispatch('endAppLoading')
})

export default router
