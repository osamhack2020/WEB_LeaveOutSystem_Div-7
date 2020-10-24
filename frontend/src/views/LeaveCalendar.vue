<template>
  <v-row no-gutters>
    <v-col cols="12">
      <div class="py-2 px-3 primary lighten-2">
        <h3 class="h3 grey--text text--lighten-4">
          출타 달력
        </h3>
      </div>
    </v-col>
    <v-col cols="9">
      <v-sheet class="pa-2">
        <v-sheet class="d-flex justify-space-between align-center">
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
          class="cal"
          v-model="current"
          :events="events"
          :event-color="getEventColor"
          @moved="monthChanged"
          @click:event="showEvent"
        ></v-calendar>
      </v-sheet>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark dense>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text v-if="selectedEvent.leave">
            <v-tooltip
              bottom
              v-for="token of selectedEvent.leave.tokens"
              :key="`leave-${selectedEvent.leave._id}-${token._id}`"
              :disabled="!token.reason"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  class="mr-2"
                  dense
                  color="primary"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  small
                >
                  <template v-if="token.type === '휴가'">
                    {{ token.kind }} {{ token.amount }}일
                  </template>
                  <template v-else>
                    {{ token.kind }}
                  </template>
                </v-chip>
              </template>
              <span>{{ token.reason }}</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-col>

    <v-col cols="3">
      <v-sheet color="primary lighten-2">
        <div class="d-flex justify-space-between pa-4">
          <h5 class="text-h6 white--text">{{ current }} 출타율</h5>
          <v-fade-transition>
            <p
              v-if="stat !== null"
              class="text-body-1 secondary--text text--lighten-1 align-self-center my-0"
            >
              {{ stat.rates[getDate(current) - 1] | toFixed(2) }}%
            </p>
          </v-fade-transition>
        </div>
        <MonthlyLeaveGraph
          :year="parseInt(currentDate.year)"
          :month="parseInt(currentDate.month) - 1"
          background="primary lighten-2"
          :title="`${currentDate.month}월 출타 인원수`"
          :status="['accepted']"
        />
        <div class="pa-4">
          <div class="d-flex justify-space-between">
            <h5 class="text-h6 white--text">
              {{ currentDate.month }}월 평균 출타율
            </h5>
            <v-fade-transition>
              <p
                v-if="stat !== null"
                class="text-body-1 secondary--text text--lighten-1 align-self-center my-0"
              >
                {{ stat.monthRateMean | toFixed(2) }}%
              </p>
            </v-fade-transition>
          </div>
          <div class="d-flex justify-space-between">
            <h5 class="text-h6 white--text">표준편차</h5>
            <v-fade-transition>
              <p
                v-if="stat !== null"
                class="text-body-1 secondary--text text--lighten-1 align-self-center my-0"
              >
                {{ stat.stDev | toFixed(2) }}
              </p>
            </v-fade-transition>
          </div>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<style scoped>
.cal {
  min-height: 40em;
}
</style>
<script>
import MonthlyLeaveGraph from '../components/MonthlyLeaveGraph.vue'

import { format, parse, addDays, parseISO, getDate } from 'date-fns'
import leaveAPI from '../services/leave'
import leaveStatAPI from '../services/leaveStat'
import _ from 'lodash'

export default {
  props: {},
  components: { MonthlyLeaveGraph },
  data: () => ({
    current: format(new Date(), 'yyyy-MM-dd'),
    currentDate: {
      year: format(new Date(), 'yyyy'),
      month: format(new Date(), 'MM')
    },
    leaves: [],
    loading: false,
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'teal',
      'light-blue',
      'lime',
      'amber',
      'brown',
      'purple lighten-3'
    ],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    stat: null
  }),
  computed: {
    events() {
      return this.leaves.map(leave => {
        return {
          name: `${leave.user.name} ${leave.type}`,
          start: this.dateToStr(parseISO(leave.startDate)),
          end: this.dateToStr(parseISO(leave.endDate)),
          color: this.colors[_.random(0, this.colors.length - 1)],
          leave
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
    getDate(date) {
      return getDate(parseISO(date))
    },
    prevMonth() {
      this.$refs.calendar.prev()
    },
    nextMonth() {
      this.$refs.calendar.next()
    },
    async monthChanged({ year, month }) {
      this.currentDate = { year, month }
      await this.loadStats()
    },
    getEventColor(event) {
      return event.color
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    async loadLeaves() {
      this.loading = true
      this.leaves = (await leaveAPI.getAccepted()).data
      this.loading = false
    },
    async loadStats() {
      const res = await leaveStatAPI.getMonthly(
        this.currentDate.year,
        this.currentDate.month - 1
      )
      this.stat = res.data
    }
  },

  async created() {
    await this.loadLeaves()
    await this.loadStats()
  },
  watch: {
    current() {}
  },
  filters: {
    toFixed(val, param) {
      if (val === undefined) {
        return ''
      }
      return val.toFixed(param)
    }
  }
}
</script>
