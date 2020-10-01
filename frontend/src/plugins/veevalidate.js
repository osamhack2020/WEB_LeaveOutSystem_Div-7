import Vue from 'vue'
import * as VeeValidate from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko.json'
import { extend } from 'vee-validate'
import { required, confirmed, min } from 'vee-validate/dist/rules'

extend('required', required)
extend('confirmed', confirmed)
extend('min', min)

Vue.use(VeeValidate, {
  locale: 'ko',
  dictionary: {
    ko
  }
})

VeeValidate.localize('ko', ko)

Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
export default VeeValidate
