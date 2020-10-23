<template>
  <DashboardCard :loading="loading" title="출타 현황">
    <v-row v-if="count" class="px-4 mt-2">
      <v-col>
        <v-card outlined class="pa-1">
          <p class="text-center text-subtitle-1 mb-1">승인</p>
          <p class="text-center text-h5 success--text">
            {{ count.accepted }}
          </p>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined class="pa-1">
          <p class="text-center text-subtitle-1 mb-1">거부</p>
          <p class="text-center text-h5 error--text">
            {{ count.denied }}
          </p>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined class="pa-1">
          <p class="text-center text-subtitle-1 mb-1">대기</p>
          <p class="text-center text-h5 primary--text">
            {{ count.pending }}
          </p>
        </v-card>
      </v-col>
    </v-row>
    <v-card-actions class="mt-0">
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
