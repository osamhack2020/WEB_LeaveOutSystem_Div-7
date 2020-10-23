<template>
  <DashboardCard :loading="loading" title="우리 부대에서...">
    <div v-if="stat !== null" class="mx-4 mt-2">
      <div v-for="(data, type) of stat.statusCount" :key="`stat-${type}`">
        <h3 class="text-h6 primary--text text--lighten-2 text-center">
          {{ type }}
        </h3>

        <v-row>
          <v-col v-for="(cnt, status) of data" :key="`stat-${type}-${status}`">
            <v-card outlined class="pa-1">
              <p class="text-center text-subtitle-1 mb-1">
                {{ status | formatStatus }}
              </p>
              <p class="text-center text-h5">
                <span :class="`${getStatusColor(status)}--text`">
                  {{ cnt }}
                </span>
              </p>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </DashboardCard>
</template>
<script>
import DashboardCard from './DashboardCard.vue'
import leaveDashboardAPI from '../../services/leaveDashboard'

export default {
  components: { DashboardCard },
  data: () => ({
    loading: false,
    stat: null
  }),
  computed: {},
  methods: {
    async loadLeaveStat() {
      this.loading = true
      const res = await leaveDashboardAPI.getLeaveStat()
      this.stat = res.data
      this.loading = false
    },
    getStatusColor(status) {
      if (status === 'accepted') {
        return 'success'
      } else if (status === 'denied') {
        return 'error'
      }
      return ''
    }
  },
  async created() {
    await this.loadLeaveStat()
  },
  filters: {
    formatStatus(value) {
      if (value === 'accepted') {
        return '승인'
      }
      if (value === 'denied') {
        return '거부'
      }
      if (value === 'pending') {
        return '대기'
      }
      return ''
    }
  }
}
</script>
