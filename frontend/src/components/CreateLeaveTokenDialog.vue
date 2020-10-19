<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="acti">
      <slot v-bind="acti"></slot>
    </template>
    <v-card>
      <v-card-title>
        출타 생성
      </v-card-title>
      <v-divider> </v-divider>

      <v-form @submit.prevent="clickSubmit">
        <v-card-text>
          <v-text-field
            v-model="effectiveDate"
            type="date"
            label="유효 시작일"
            filled
          ></v-text-field>
          <v-text-field
            v-model="expirationDate"
            type="date"
            label="만료일"
            filled
          ></v-text-field>
          <v-autocomplete
            v-model="type"
            :items="types"
            label="종류"
            filled
          ></v-autocomplete>
          <v-autocomplete
            v-model="kind"
            :items="kinds"
            label="세부 종류"
            filled
          ></v-autocomplete>
          <v-text-field
            v-model="amount"
            :disabled="isAmountDisabled"
            label="부여일수"
            filled
          ></v-text-field>
          <v-text-field v-model="reason" label="근거" filled></v-text-field>
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
            생성
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import * as formValid from '../utils/formValid'

export default {
  props: {},
  data: () => ({
    dialog: false,
    loading: false,
    target: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    expirationDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 6,
      new Date().getDate(),
      0,
      0,
      0
    )
      .toISOString()
      .split('T')[0],
    type: null,
    kind: null,
    reason: '',
    amount: null,
    types: ['휴가', '외박', '외출'],
    kinds: ['정기', '포상', '위로', '병가', '신병', '기타']
  }),
  computed: {
    canSubmit() {
      const check =
        // formValid.username(this.target) &&
        formValid.amount(this.amount)
      //        formValid.effectiveDate(this.effectiveDate) &&
      //        formValid.expirationDate(this.expirationDate) &&
      // formValid.reason(this.reason)
      return check
    },
    isAmountDisabled() {
      if (this.type === '외출') {
        return true
      }

      if (this.type === '외박') {
        return true
      }
      return false
    }
  },
  methods: {
    clickSubmit() {
      this.$emit('submit', {
        division: JSON.parse(localStorage.getItem('user')).division,
        issuer: JSON.parse(localStorage.getItem('user')).username,
        target: [],
        effectiveDate: this.effectiveDate,
        expirationDate: this.expirationDate,
        type: this.type,
        kind: this.kind,
        amount: this.amount,
        reason: this.reason
      })
      this.dialog = false
      this.issuer = null
      this.target = null
      this.effectiveDate = new Date().toISOString().split('T')[0]
      this.expirationDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 6,
        new Date().getDate(),
        0,
        0,
        0
      )
        .toISOString()
        .split('T')[0]
      this.type = null
      this.kind = null
      this.amount = null
      this.reason = ''
    }
  },
  watch: {
    type(val) {
      if (val === '외출') {
        this.amount = 1
      } else if (val === '외박') {
        this.amount = 2
      }
    }
  }
}
</script>
