<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="acti">
      <slot v-bind="acti"></slot>
    </template>
    <v-card>
      <v-card-title>
        부대 생성
      </v-card-title>
      <v-divider> </v-divider>
      <v-form @submit.prevent="clickSubmit">
        <v-card-text>
          <v-text-field
            v-model="name"
            label="부대 이름"
            placeholder="17사단 정보통신대대"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">
            취소
          </v-btn>
          <v-btn type="submit" color="blue darken-1" text>
            생성
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    loading: false,
    name: ''
  }),
  methods: {
    clickSubmit() {
      this.$emit('submit', { name: this.name })
      this.dialog = false
      this.name = ''
    }
  }
}
</script>
