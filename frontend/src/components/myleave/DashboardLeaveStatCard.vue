<template>
  <DashboardCard :loading="loading" title="우리 부대에서...">
    <MonthlyLeaveGraph
      :year="year"
      :month="month"
      background="primary lighten-2"
      :title="`${month + 1}월 ~ ${((month + 1) % 12) + 1}월 출타 인원수`"
      :status="['accepted']"
    />
  </DashboardCard>
</template>
<script>
import DashboardCard from './DashboardCard.vue'
import MonthlyLeaveGraph from '../MonthlyLeaveGraph.vue'
import { getMonth, getYear } from 'date-fns'

export default {
  components: { DashboardCard, MonthlyLeaveGraph },
  props: {
    year: {
      type: Number,
      default: getYear(new Date())
    },
    month: {
      type: Number,
      default: getMonth(new Date())
    }
  },
  data: () => ({
    loading: false
  }),
  computed: {},
  methods: {},
  async created() {},
  filters: {}
}
</script>
