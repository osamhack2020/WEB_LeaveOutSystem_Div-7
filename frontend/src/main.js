import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/veevalidate'

import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),

  created() {
    if (store.getters.isAuthed) {
      store.dispatch('autoLogin')
    }
  }
}).$mount('#app')
