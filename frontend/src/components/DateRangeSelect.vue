<template>
  <div>
    <v-sheet class="d-flex justify-space-between align-center ">
      <v-btn fab text small color="grey darken-2" @click="prevMonth">
        <v-icon small>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <div>{{ currentDate.year }}년 {{ currentDate.month }}월</div>
      <v-btn fab text small color="grey darken-2" @click="nextMonth">
        <v-icon small>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="400">
      <v-calendar
        ref="calendar"
        v-model="departure"
        :events="events"
        event-color="secondary"
        :disabled="length < 1"
        @moved="monthChanged"
      ></v-calendar>
    </v-sheet>
    <div>총 {{ length }}일</div>
    <div>{{ departure }} 부터 ~ {{ arrival }} 까지</div>
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
      type: Object,
      default: () => ({
        departure: format(new Date(), 'yyyy-MM-dd'),
        arrival: format(new Date(), 'yyyy-MM-dd'),
        length: 0
      })
    }
  },
  data: () => ({
    departure: format(new Date(), 'yyyy-MM-dd'),
    currentDate: {
      year: format(new Date(), 'yyyy'),
      month: format(new Date(), 'MM')
    }
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
    prevMonth() {
      this.$refs.calendar.prev()
    },
    nextMonth() {
      this.$refs.calendar.next()
    },
    monthChanged({ year, month }) {
      this.currentDate = { year, month }
    }
  },
  watch: {
    departure() {
      this.$emit('input', {
        departure: this.departure,
        arrival: this.arrival,
        length: this.length
      })
    }
  },
  created() {}
}
</script>
