<template>
  <DashboardCard>
    <v-card-text>
      <div>현재까지...</div>
      <div>휴가 0일, 외출 0번, 외박 0번</div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text :to="to">
        자세히 보기 <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </DashboardCard>
</template>
<script>
import DashboardCard from './DashboardCard.vue'

export default {
  components: {
    DashboardCard
  },
  props: {
    to: {
      type: String,
      default: ''
    }
  }
}
</script>
