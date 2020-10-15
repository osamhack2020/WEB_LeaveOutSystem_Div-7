<template>
  <v-card>
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
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
