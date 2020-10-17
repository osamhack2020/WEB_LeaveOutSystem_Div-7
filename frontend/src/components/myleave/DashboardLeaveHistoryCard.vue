<template>
  <DashboardCard :loading="loading" title="지금까지...">
    <div v-if="history" class="mx-4 mt-2">
      <div class="mt-1">
        <span class="text-h6 primary--text">휴가</span>
        {{ history['휴가'].amount }}일 ({{ history['휴가'].count }}번)
        나갔습니다.
      </div>
      <div class="mt-1">
        <span class="text-h6 primary--text">외출</span>
        {{ history['외출'].count }}번 나갔습니다.
      </div>
      <div class="mt-1">
        <span class="text-h6 primary--text">외박</span>
        {{ history['외박'].count }}번 나갔습니다.
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
import LeaveDashboardAPI from '../../services/leaveDashboard'

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
    history: null,
    loading: false
  }),
  methods: {
    async loadLeaveHistory() {
      this.loading = true
      const res = await LeaveDashboardAPI.getHistroyCount()
      this.history = res.data
      this.loading = false
    }
  },
  async created() {
    await this.loadLeaveHistory()
  }
}
</script>
