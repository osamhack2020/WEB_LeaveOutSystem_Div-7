<template>
  <DashboardCard :loading="loading" title="보유한 출타">
    <v-row class="mx-3 main-area">
      <template v-if="tokenCount">
        <v-col v-if="tokenCount['휴가']">
          <h3 class="text-h6 primary--text text--lighten-2">휴가</h3>
          <template>
            <div
              v-for="kind of Object.keys(tokenCount['휴가'])"
              :key="`leave-${kind}`"
            >
              {{ kind }} {{ tokenCount['휴가'][kind] | printAmount }}
            </div>
          </template>
        </v-col>
        <v-col v-if="tokenCount['외출']">
          <h3 class="text-h6 primary--text text--lighten-2">외출</h3>
          <template>
            <div
              v-for="kind of Object.keys(tokenCount['외출'])"
              :key="`goout-${kind}`"
            >
              {{ kind }} {{ tokenCount['외출'][kind].count }}번
            </div>
          </template>
        </v-col>
        <v-col v-if="tokenCount['외박']">
          <h3 class="text-h6 primary--text text--lighten-2">외박</h3>
          <template>
            <div
              v-for="kind of Object.keys(tokenCount['외박'])"
              :key="`sleep-${kind}`"
            >
              {{ kind }} {{ tokenCount['외박'][kind].count }}번
            </div>
          </template>
        </v-col>
      </template>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text :to="to">
        자세히 보기 <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </DashboardCard>
</template>
<style scoped>
.main-area {
  min-height: 5em;
}
</style>
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
    tokenCount: null,
    loading: false
  }),
  components: {
    DashboardCard
  },
  methods: {
    async loadLeaveCount() {
      this.loading = true
      const res = await leaveDashboardAPI.getAvailableTokens()
      this.tokenCount = res.data
      this.loading = false
    }
  },
  async created() {
    await this.loadLeaveCount()
  },
  filters: {
    printAmount(obj) {
      if (obj) {
        return `${obj.amount}일`
      }
      return '0일'
    }
  }
}
</script>
