<template>
  <DashboardCard>
    <template v-slot:title>
      <div class="pt-2 px-3 d-flex">
        <h3 class="text-h6">
          내 달력
        </h3>
        <div class="flex-grow-1 px-4">
          <v-progress-linear
            v-if="!leaves.length"
            indeterminate
            class="align-self-center"
          />
        </div>
        <span
          v-for="(legend, idx) of legends"
          :key="`legend-${idx}`"
          :class="`${legend.color} white--text px-2 ml-1`"
          style="height: 20px; margin-bottom: 1px; font-size: 12px;"
        >
          {{ legend.text }}
        </span>
      </div>
    </template>
    <v-card-text class="pt-0">
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
    },
    legends: () => [
      { text: '승인됨', color: 'success' },
      { text: '거부됨', color: 'error' },
      { text: '사용함', color: 'primary' },
      { text: '대기중', color: 'grey' }
    ]
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
      const vals = await Promise.all([
        leaveAPI.getLeaves(),
        leaveAPI.getLeaveHistory()
      ])
      const res = [...vals[0].data, ...vals[1].data]
      this.leaves = res
    }
  },
  async created() {
    await this.loadLeaves()
  }
}
</script>
