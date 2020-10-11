<template>
  <v-row>
    <v-col cols="3">
      <v-card>C1</v-card>
    </v-col>
    <v-col cols="9">C2</v-col>
  </v-row>
</template>
<script>
import leaveAPI from '../services/leave'

export default {
  data: () => ({
    rawApplies: []
  }),
  computed: {
    applies() {
      return this.rawApplies
    }
  },
  methods: {
    async loadApplies() {
      const res = await leaveAPI.adminGetApplies()
      this.rawApplies = res.data
    }
  },
  async created() {
    await this.loadApplies()
  }
}
</script>
