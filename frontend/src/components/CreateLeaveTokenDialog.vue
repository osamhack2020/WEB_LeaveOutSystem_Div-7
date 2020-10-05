<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="acti">
      <slot v-bind="acti"></slot>
    </template>
    <v-card>
      <v-card-title>
        출타 부여
      </v-card-title>
      <v-divider> </v-divider>

      <v-form @submit.prevent="clickSubmit">
        <v-card-text>
          <v-autocomplete
            v-model="division"
            :items="divisions"
            hide-selected
            clearable
            item-text="name"
            label="대상부대"
            filled
            dense
            placeholder="없음"
            return-object
          ></v-autocomplete>
          <v-text-field
            v-model="username"
            label="아이디"
            placeholder="20-12345678"
            filled
          ></v-text-field>
          <v-text-field
            v-model="expirationDate"
            type="date"
            label="만료일"
            filled
            placeholder="홍길동"
          ></v-text-field>
          <v-autocomplete
            v-model="type"
            :items="types"
            label="종류"
            filled
            placeholder="휴가"
          ></v-autocomplete>
          <v-autocomplete
            v-model="kind"
            :items="kinds"
            label="세부 종류"
            filled
            placeholder="정기"
          ></v-autocomplete>
          <v-text-field
            v-model="amount"
            label="부여일수"
            filled
            placeholder="3"
          ></v-text-field>
          <v-text-field
            v-model="reason"
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
  props: {
    divisions: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    dialog: false,
    loading: false,
    username: '',
    password: '',
    name: '',
    division: null,
    amount: null,
    expirationDate: null,
    type: null,
    kind: null,
    reason: '',
    types: ['휴가', '출타', '외박'],
    kinds: ['정기', '포상', '병가', '신병', '기타']
  }),
  computed: {
    canSubmit() {
      const check =
        formValid.username(this.username) &&
        formValid.name(this.name) &&
        formValid.amount(this.amount)
      return check
    }
  },
  methods: {
    clickSubmit() {
      this.$emit('submit', {
        name: this.name,
        username: this.username,
        password: this.password,
        division: this.division
      })
      this.dialog = false
      this.username = ''
      this.password = ''
      this.name = ''
      this.division = null
    }
  }
}
</script>
