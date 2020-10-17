<template>
  <v-card>
    <slot name="title">
      <div v-if="title" class="py-2 px-3 primary lighten-2">
        <h3 class="h3 grey--text text--lighten-4">
          {{ title }}
        </h3>
      </div>
    </slot>
    <div v-if="loading" class="d-flex flex-row justify-center">
      <v-progress-circular
        :width="3"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <slot v-else></slot>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
