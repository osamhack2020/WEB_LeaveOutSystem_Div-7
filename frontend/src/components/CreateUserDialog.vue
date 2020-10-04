<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="acti">
      <slot v-bind="acti"></slot>
    </template>
    <v-card>
      <v-card-title>
        유저 추가
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
            label="소속부대"
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
            type="password"
            v-model="password"
            label="비밀번호"
            filled
            placeholder="******"
          ></v-text-field>
          <v-text-field
            v-model="name"
            label="이름"
            filled
            placeholder="홍길동"
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
    division: null
  }),
  computed: {
    canSubmit() {
      const check =
        formValid.username(this.username) &&
        formValid.password(this.password) &&
        formValid.name(this.name)
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
      console.log(this.username)
      this.dialog = false
      this.username = ''
      this.password = ''
      this.name = ''
      this.division = null
    }
  }
}
</script>
