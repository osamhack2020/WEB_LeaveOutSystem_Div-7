<template>
  <DashboardCard :loading="loading">
    <div v-if="count" class="pa-3">
      <div>
        <span class="h2">{{ count.accepted }}</span>
        개 출타 승인됨
      </div>
      <div>
        <span class="h2">{{ count.denied }}</span> 개 출타 거부됨
      </div>
      <div>
        <span class="h2">{{ count.pending }}</span> 개 출타 대기중
      </div>
    </div>
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
  components: {
    DashboardCard
  },
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    count: null,
    loading: false
  }),
  methods: {
    async loadLeaveCount() {
      this.loading = true
      const res = await leaveDashboardAPI.getLeaveCount()
      this.count = res.data
      this.loading = false
    }
  },
  async created() {
    await this.loadLeaveCount()
  }
}
</script>
