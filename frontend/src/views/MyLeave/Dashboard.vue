<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>

    <v-row>
      <v-col cols="4">
        <DashboardLeaveTokenCard to="/myleave/leave-available" />
      </v-col>
      <v-col cols="4">
        <DashboardLeaveStatusCard to="/myleave/leave-status"
      /></v-col>
      <v-col cols="4">
        <DashboardLeaveHistoryCard to="/myleave/leave-history" />
      </v-col>
      <v-col cols="8">
        <DashboardLeaveCalendar @monthChanged="monthChanged" />
      </v-col>
      <v-col cols="4">
        <DashboardLeaveStatCard :year="curyear" :month="curmonth - 1" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'
import DashboardLeaveTokenCard from '../../components/myleave/DashboardLeaveTokenCard.vue'
import DashboardLeaveStatusCard from '../../components/myleave/DashboardLeaveStatusCard.vue'
import DashboardLeaveHistoryCard from '../../components/myleave/DashboardLeaveHistoryCard.vue'
import DashboardLeaveCalendar from '../../components/myleave/DashboardLeaveCalendarCard.vue'
import DashboardLeaveStatCard from '../../components/myleave/DashboardLeaveStatCard.vue'
import { getMonth, getYear } from 'date-fns'

export default {
  components: {
    CurrentLocation,
    DashboardLeaveTokenCard,
    DashboardLeaveStatusCard,
    DashboardLeaveHistoryCard,
    DashboardLeaveCalendar,
    DashboardLeaveStatCard
  },
  data: () => ({
    curyear: getYear(new Date()),
    curmonth: getMonth(new Date())
  }),
  computed: {
    location: () => [{ text: '대시보드', path: '/myleave' }]
  },
  methods: {
    monthChanged({ year, month }) {
      this.curyear = year
      this.curmonth = month
    }
  }
}
</script>
