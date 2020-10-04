import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { preset } from 'vue-cli-plugin-vuetify-preset-reply/preset'

import ko from 'vuetify/es5/locale/ko.js'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  lang: {
    locales: { ko },
    current: 'ko'
  }
})
