<template>
  <DashboardCard :loading="!leaves">
    <v-card-text>
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
      <v-calendar
        ref="calendar"
        v-model="current"
        :events="events"
        :event-color="getEventColor"
        @moved="monthChanged"
      />
    </v-card-text>
  </DashboardCard>
</template>
<script>
import { format, parse, addDays, parseISO, compareAsc } from 'date-fns'

import DashboardCard from './DashboardCard.vue'
import leaveAPI from '../../services/leave'

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
    current: format(new Date(), 'yyyy-MM-dd'),
    currentDate: {
      year: format(new Date(), 'yyyy'),
      month: format(new Date(), 'MM')
    },
    leaves: []
  }),
  computed: {
    events() {
      return this.leaves
        .filter(leave => leave.status !== 'denied')
        .map(leave => {
          return {
            name: leave.type,
            start: this.dateToStr(parseISO(leave.startDate)),
            end: this.dateToStr(parseISO(leave.endDate)),
            status: leave.status
          }
        })
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
    },
    getEventColor(event) {
      if (event.status === 'pending') {
        return 'grey'
      }
      if (compareAsc(parseISO(event.start), new Date()) === 1) {
        return 'success'
      }
      return 'primary'
    },
    async loadLeaves() {
      const res = await leaveAPI.getLeaves()
      this.leaves = res.data
    }
  },
  async created() {
    await this.loadLeaves()
  }
}
</script>
