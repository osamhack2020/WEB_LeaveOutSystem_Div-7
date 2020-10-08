<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="acti">
      <slot v-bind="acti"></slot>
    </template>
    <v-card>
      <v-card-title>
        출타 정보 수정
      </v-card-title>
      <v-divider> </v-divider>

      <v-form @submit.prevent="clickSubmit">
        <v-card-text>
          <v-text-field
            :value="curLeaveTokenInfo.issuer"
            class="mb-3"
            label="출타 발행자"
            placeholder="admin"
            filled
            dense
            disabled
            hide-details
          ></v-text-field>
          <v-text-field
            v-model="curLeaveTokenInfo.effectiveDate"
            type="date"
            label="유효 시작일"
            filled
          ></v-text-field>
          <v-text-field
            v-model="curLeaveTokenInfo.expirationDate"
            type="date"
            label="만료일"
            filled
          ></v-text-field>
          <v-autocomplete
            v-model="curLeaveTokenInfo.type"
            :items="types"
            label="종류"
            filled
            placeholder="휴가"
          ></v-autocomplete>
          <v-autocomplete
            v-model="curLeaveTokenInfo.kind"
            :items="kinds"
            label="세부 종류"
            filled
            placeholder="정기"
          ></v-autocomplete>
          <v-text-field
            v-model="curLeaveTokenInfo.amount"
            label="부여일수"
            filled
            placeholder="3"
          ></v-text-field>
          <v-text-field
            v-model="curLeaveTokenInfo.reason"
            label="근거"
            filled
            placeholder="정기 휴가"
          ></v-text-field>
        </v-card-text>
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
            수정
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import * as formValid from '../utils/formValid'
import divisionAPI from '../services/division'
export default {
  props: {
    divisions: {
      type: Array,
      default: () => []
    },
    curLeaveTokenInfo: {
      type: Object,
      default: () => ({
        issuer: '',
        target: '',
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
      kinds: ['정기', '포상', '병가', '신병', '기타']
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
    clickSubmit() {
      this.$emit('submit', {
        _id: this.curLeaveTokenInfo._id,
        division: JSON.parse(localStorage.getItem('user')).division,
        issuer: JSON.parse(localStorage.getItem('user')).username,
        target: this.curLeaveTokenInfo.target.sort(),
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
    curLeaveTokenInfo(val) {
      this.username = val.username
      this.division = val.division
      this.name = val.name
      this.role = val.role
    }
  }
}
</script>
