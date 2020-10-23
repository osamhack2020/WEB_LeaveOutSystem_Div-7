<template>
  <v-row>
    <v-col cols="12">
      <!-- <v-toolbar flat color="primary lighten-1" dark>
        <v-toolbar-title>출타 달력</v-toolbar-title>
      </v-toolbar> -->
      <div class="py-2 px-3 primary lighten-2">
        <h3 class="h3 grey--text text--lighten-4">
          출타 달력
        </h3>
      </div>
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
  </v-row>
</template>
<style scoped>
.cal {
  min-height: 40em;
}
</style>
<script>
import { format, parse, addDays, parseISO } from 'date-fns'
import leaveAPI from '../services/leave'
import _ from 'lodash'

export default {
  components: {},
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
      'grey darken-1'
    ],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
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
    }
  },

  async created() {
    await this.loadLeaves()
  },
  watch: {
    current() {}
  }
}
</script>
