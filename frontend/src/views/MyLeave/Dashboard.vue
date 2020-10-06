<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'

export default {
  components: {
    CurrentLocation
  },
  data: () => ({}),
  computed: {
    location: () => [{ text: '대시보드', path: '/dashboard' }]
  }
}
</script>
