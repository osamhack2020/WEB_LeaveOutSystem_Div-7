<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>

    <v-row>
      <v-col cols="3"><DashboardCard>asdf</DashboardCard></v-col>
      <v-col cols="3"><DashboardCard>asdf</DashboardCard></v-col>
      <v-col cols="3"><DashboardCard>asdf</DashboardCard></v-col>
      <v-col cols="3"><DashboardCard>asdf</DashboardCard></v-col>
    </v-row>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'
import DashboardCard from '../../components/myleave/DashboardCard.vue'

export default {
  components: {
    CurrentLocation,
    DashboardCard
  },
  data: () => ({}),
  computed: {
    location: () => [{ text: '대시보드', path: '/dashboard' }]
  }
}
</script>
