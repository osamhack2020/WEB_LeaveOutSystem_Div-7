<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="acti">
      <slot v-bind="acti"></slot>
    </template>
    <v-card>
      <v-card-title>
        유저 정보 수정
      </v-card-title>
      <v-divider> </v-divider>

      <v-form @submit.prevent="clickSubmit">
        <v-card-text>
          <v-text-field
            :value="curUserInfo.username"
            class="mb-3"
            label="아이디"
            placeholder="20-12345678"
            filled
            dense
            disabled
            hide-details
          ></v-text-field>
          <v-checkbox
            v-model="changingPassword"
            label="비밀번호 변경"
            class="mt-0 pt-0"
            dense
            hide-details
          ></v-checkbox>
          <v-text-field
            type="password"
            v-model="password"
            label="새 비밀번호"
            dense
            filled
            :disabled="!changingPassword"
            placeholder="******"
          ></v-text-field>
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
            v-model="name"
            label="이름"
            filled
            dense
            placeholder="홍길동"
          ></v-text-field>
          <v-select
            v-model="role"
            :items="roleItems"
            label="권한"
            item-text="text"
            item-value="value"
            filled
            dense
          ></v-select>
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

export default {
  props: {
    divisions: {
      type: Array,
      default: () => []
    },
    curUserInfo: {
      type: Object,
      default: () => ({
        username: '',
        password: '',
        name: '',
        division: null
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
      username: '',
      name: '',
      changingPassword: false,
      password: '',
      division: {},
      role: 'user'
    }
  },
  computed: {
    canSubmit() {
      const check =
        formValid.username(this.username) &&
        (!this.changingPassword || formValid.password(this.password)) &&
        formValid.name(this.name)
      return check
    },
    currentDivision() {
      if (!this.curUserInfo.division) {
        return null
      }
      return this.divisions.find(x => x._id === this.curUserInfo.division)
    },
    roleItems() {
      const base = [
        { text: '관리자', value: 'moderator' },
        { text: '유저', value: 'user' }
      ]

      if (this.$store.getters.isAdmin) {
        base.push({ text: '어드민', value: 'admin' })
      }

      return base
    }
  },
  methods: {
    clickSubmit() {
      this.$emit('submit', {
        username: this.username,
        name: this.name,
        password: this.password,
        division: this.division,
        role: this.role,
        _id: this.curUserInfo._id
      })
      console.log(this.division)
      this.dialog = false
      this.username = ''
      this.password = ''
      this.name = ''
      this.division = null
    }
  },
  watch: {
    dialog(value) {
      this.$emit('input', value)
    },
    value(val) {
      this.dialog = val
    },
    curUserInfo(val) {
      this.username = val.username
      this.division = val.division
      this.name = val.name
      this.role = val.role
    }
  }
}
</script>
