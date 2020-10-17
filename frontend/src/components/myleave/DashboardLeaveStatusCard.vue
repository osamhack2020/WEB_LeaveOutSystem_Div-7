<template>
  <DashboardCard :loading="loading" title="출타 현황">
    <v-row v-if="count" class="px-4 mt-2" no-gutters>
      <v-col cols="6">
        <span class="text-h4 success--text"> {{ count.accepted }} </span>개
        승인됨
      </v-col>
      <v-col cols="6">
        <span class="text-h4 error--text"> {{ count.denied }} </span>개 거부됨
      </v-col>
      <v-col cols="12">
        <span class="text-h4 primary--text"> {{ count.pending }} </span>개 출타
        승인 대기중
      </v-col>
    </v-row>
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
