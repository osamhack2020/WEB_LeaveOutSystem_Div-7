<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>
    <v-sheet class="pa-3">
      <h2 class="text-h4">확정된 출타</h2>
      <v-card
        v-for="leave of acceptedLeaves"
        :key="`accepted-${leave._id}`"
        outlined
      >
        <v-card-title>
          {{ leave.startDate | formatDate }} 출발 휴가
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-sheet>
    <v-sheet class="pa-3">
      <h2 class="text-h4">거부된 출타</h2>
      <v-card
        v-for="leave of deniedLeaves"
        :key="`denied-${leave._id}`"
        outlined
      >
        <v-card-text>
          {{ leave }}
        </v-card-text>
      </v-card>
    </v-sheet>
    <v-sheet class="pa-3">
      <h2 class="text-h4">승인 대기중</h2>
      <v-card
        v-for="leave of pendingLeaves"
        :key="`pending-${leave._id}`"
        outlined
      >
        <v-card-text>
          {{ leave }}
        </v-card-text>
      </v-card>
    </v-sheet>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'
import leaveTokenAPI from '../../services/leaveTokenManage'
import leaveAPI from '../../services/leave'
import { format, add, parseISO } from 'date-fns'

export default {
  components: {
    CurrentLocation
  },
  data: () => ({
    rawLeaves: [],
    leaveSearch: '',
    availables: [],
    leaveLoading: false,
    kindFilterOptions: [],
    currentType: 0,
    applyList: {},
    applyPlan: {
      departure: format(new Date(), 'yyyy-MM-dd')
    },
    successAlert: false
  }),
  computed: {
    location: () => [
      { text: '대시보드', path: '/myleave' },
      { text: '출타 신청 기록 조회', path: '/myleave/leave-status' }
    ],
    leaves() {
      return this.rawLeaves
    },
    acceptedLeaves() {
      return this.rawLeaves.filter(leave => leave.status === 'accepted')
    },
    pendingLeaves() {
      return this.rawLeaves.filter(leave => leave.status === 'pending')
    },
    deniedLeaves() {
      return this.rawLeaves.filter(leave => leave.status === 'denied')
    },
    headers: () => [
      { text: '출타 종류', value: 'type', align: 'start' },
      { text: '출발 일자', value: 'startDate' },
      { text: '도착 일자', value: 'endDate' },
      { text: '상태', value: 'status' },
      { text: '기타', value: 'message' }
    ]
  },
  methods: {
    async loadLeaves() {
      this.leaveLoading = true
      const res = await leaveAPI.getLeaves()
      this.rawLeaves = res.data

      this.leaveLoading = false
    }
  },
  async created() {
    this.$store.dispatch('startAppLoading')
    await this.loadLeaves()
    this.$store.dispatch('endAppLoading')
  },
  filters: {
    formatDate(value) {
      return format(parseISO(value), 'yyyy-MM-dd')
    }
  }
}
</script>
