<template>
  <div class="d-flex justify-center">
    <v-card class="pa-1 login-area">
      <v-card-title>로그인</v-card-title>
      <v-card-text>
        <validation-observer v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(submitLogin)">
            <validation-provider
              rules="required"
              v-slot="{ errors }"
              name="아이디"
            >
              <v-text-field
                v-model="loginForm.username"
                label="아이디"
                filled
                :error="errors.length > 0 || !!resError.username"
                :error-messages="errors[0] || resError.username"
                autocomplete="off"
                :disabled="loading"
              ></v-text-field>
            </validation-provider>
            <validation-provider
              rules="required"
              v-slot="{ errors }"
              name="비밀번호"
            >
              <v-text-field
                v-model="loginForm.password"
                label="비밀번호"
                type="password"
                :error="errors.length > 0 || !!resError.password"
                :error-messages="errors[0] || resError.password"
                filled
                :disabled="loading"
              ></v-text-field>
            </validation-provider>

            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn type="submit" :loading="loading">로그인</v-btn>
            </div>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped>
.login-area {
  min-width: 30em;
}
</style>
<script>
import { mapActions } from 'vuex'

export default {
  created() {
    if (this.$store.getters.isAuthed) {
      this.$router.push('/')
    }
  },
  data: () => ({
    loginForm: {
      username: '',
      password: ''
    },
    resError: {},
    loading: false
  }),
  methods: {
    ...mapActions(['login']),
    async submitLogin() {
      this.loading = true
      this.resError = {}
      try {
        await this.login({
          username: this.loginForm.username,
          password: this.loginForm.password
        })
      } catch {
        this.resError = {
          username: '올바르지 않은 아이디 또는 비밀번호입니다.',
          password: '올바르지 않은 아이디 또는 비밀번호입니다.'
        }
        this.resError.username = '올바르지 않은 아이디 또는 비밀번호입니다.'
        this.resError.password = '올바르지 않은 아이디 또는 비밀번호입니다.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
