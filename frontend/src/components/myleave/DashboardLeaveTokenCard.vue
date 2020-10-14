<template>
  <DashboardCard>
    <v-card-text v-if="tokenCount">
      <div>정기휴가 3일</div>
      <div>포상휴가 3일</div>
      <div>위로휴가 3일</div>
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
import leaveDashboardAPI from '../../services/leaveDashboard'

export default {
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    tokenCount: null
  }),
  components: {
    DashboardCard
  },
  methods: {
    async loadLeaveCount() {
      const res = await leaveDashboardAPI.getAvailableTokens()
      this.tokenCount = res.data
    }
  },
  async created() {
    await this.loadLeaveCount()
  }
}
</script>
