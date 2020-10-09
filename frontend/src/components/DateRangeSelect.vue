<template>
  <div>
    <div>출발일 : {{ departure }}</div>
    <div>도착일 : {{ arrival }}</div>
    <v-sheet height="400">
      <v-calendar
        v-model="departure"
        :events="events"
        event-color="secondary"
      ></v-calendar>
    </v-sheet>
  </div>
</template>
<style scoped>
.v-event {
}
.cal {
  min-height: 30em;
}
</style>
<script>
import { format, parse, addDays } from 'date-fns'

export default {
  props: {
    length: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: format(new Date(), 'yyyy-MM-dd')
    }
  },
  data: () => ({
    departure: format(new Date(), 'yyyy-MM-dd')
  }),
  computed: {
    arrival() {
      return this.dateToStr(
        addDays(this.strToDate(this.departure), this.length - 1)
      )
    },
    events() {
      if (this.length === 0) {
        return []
      }
      return [
        {
          name: this.type,
          start: this.departure,
          end: this.arrival,
          color: 'secondary'
        }
      ]
    }
  },
  methods: {
    dateToStr(date) {
      return format(date, 'yyyy-MM-dd')
    },
    strToDate(str) {
      return parse(str, 'yyyy-MM-dd', new Date())
    },
    recalcArrival() {}
  },
  watch: {
    departure() {
      this.$emit('input', {
        departure: this.departure,
        arrival: this.arrival
      })
    }
  },
  created() {}
}
</script>
