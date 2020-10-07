<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>

    <v-row>
      <v-col cols="4">
        <DashboardLeaveTokenCard to="/myleave/leave-available" />
      </v-col>
      <v-col cols="4"> <DashboardLeaveStatusCard /></v-col>
      <v-col cols="4"><DashboardLeaveHistoryCard /></v-col>
      <v-col cols="8"><DashboardLeaveCalendar /></v-col>
    </v-row>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'
import DashboardLeaveTokenCard from '../../components/myleave/DashboardLeaveTokenCard.vue'
import DashboardLeaveStatusCard from '../../components/myleave/DashboardLeaveStatusCard.vue'
import DashboardLeaveHistoryCard from '../../components/myleave/DashboardLeaveHistoryCard.vue'
import DashboardLeaveCalendar from '../../components/myleave/DashboardLeaveCalendarCard.vue'

export default {
  components: {
    CurrentLocation,
    DashboardLeaveTokenCard,
    DashboardLeaveStatusCard,
    DashboardLeaveHistoryCard,
    DashboardLeaveCalendar
  },
  data: () => ({}),
  computed: {
    location: () => [{ text: '대시보드', path: '/myleave' }]
  }
}
</script>
