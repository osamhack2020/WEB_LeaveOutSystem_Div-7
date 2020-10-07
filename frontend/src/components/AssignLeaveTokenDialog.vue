<template>
  <v-dialog v-model="dialog" max-width="320px">
    <template v-slot:activator="acti">
      <slot v-bind="acti"></slot>
    </template>
    <v-card>
      <v-card-title>
        출타 부여 대상자 선택
      </v-card-title>
      <v-divider> </v-divider>
      <v-form @submit.prevent="clickSubmit">
        <v-list shaped>
        <v-list-item-group
            v-model="target"
            multiple
        >
            <template v-for="(item, i) in this.userList">
            <v-divider
                v-if="!item"
                :key="`divider-${i}`"
            ></v-divider>

            <v-list-item
                v-else
                :key="`item-${i}`"
                :value="item"
                active-class="deep-purple--text text--accent-4"
            >
                <template v-slot:default="{ active }">
                <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                    <v-checkbox
                    :input-value="active"
                    color="deep-purple accent-4"
                    ></v-checkbox>
                </v-list-item-action>
                </template>
            </v-list-item>
            </template>
        </v-list-item-group>
        </v-list>
      
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">
            취소
          </v-btn>
          <v-btn
            type="submit"
            :disabled="!canSubmit"
            color="blue darken-1"
            text
          >
            부여
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>

import * as formValid from '../utils/formValid'
import userAPI from '../services/user'
import divisionAPI from '../services/division'
export default {
  props: {
    userList2: {
      type: Array,
      default: () => [
        '20-11111235',
        '20-11111236',
        '20-11111237',
        '20-11111238',
        '20-11111239',
      ],
    },
    curLeaveTokenInfo: {
      type: Object,
      default: () => ({
        issuer: '',
        target: [],
        effectiveDate: null,
        expirationDate: null,
        type: null,
        kind: null,
        reason: '',
        amount: null
      })
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      loading: false,
      types: ['휴가', '외박', '외출'],
      kinds: ['정기', '포상', '병가', '신병', '기타'],
      target: [],
      userList: []
    }
  },
  computed: {
    canSubmit() {
      const check = true
      //        formValid.username(this.curLeaveTokenInfo.target)
      //       formValid.amount(this.curLeaveTokenInfo.amount) &&
      //        formValid.effectiveDate(this.effectiveDate) &&
      //        formValid.expirationDate(this.expirationDate) &&
      //      formValid.reason(this.curLeaveTokenInfo.reason)
      return check
    }
  },
  methods: {
    async getUserList() {
      const division = JSON.parse(localStorage.getItem('user')).division
      let res = await userAPI.getUsers()
      if (division) {
        res = res.data.docs.filter(
          user => user.division === division._id
        )
      } else {
        res = res.data.docs.filter(user => !user.division)
      }
      for(var idx = 0; idx < res.length; idx++){
        res[idx] = res[idx].username
      }
      this.userList = res
    },
    clickSubmit() {
      this.$emit('submit', {
        _id: this.curLeaveTokenInfo._id,
        division: JSON.parse(localStorage.getItem('user')).division,
        issuer: JSON.parse(localStorage.getItem('user')).username,
        target: this.target.sort(),
        effectiveDate: this.curLeaveTokenInfo.effectiveDate,
        expirationDate: this.curLeaveTokenInfo.expirationDate,
        type: this.curLeaveTokenInfo.type,
        kind: this.curLeaveTokenInfo.kind,
        amount: this.curLeaveTokenInfo.amount,
        reason: this.curLeaveTokenInfo.reason
      })
      this.dialog = false
      this.curLeaveTokenInfo.issuer = null
      this.curLeaveTokenInfo.target = null
      this.curLeaveTokenInfo.effectiveDate = null
      this.curLeaveTokenInfo.expirationDate = null
      this.curLeaveTokenInfo.type = null
      this.curLeaveTokenInfo.kind = null
      this.curLeaveTokenInfo.amount = null
      this.curLeaveTokenInfo.reason = ''
    }
  },
  watch: {
    dialog(value) {
      this.$emit('input', value)
    },
    value(val) {
      this.dialog = val
    },
    async curLeaveTokenInfo(val) {
      this.username = val.username
      this.division = val.division
      this.name = val.name
      this.role = val.role
      this.target = val.target
      await this.getUserList()
    },
  }
}
</script>
