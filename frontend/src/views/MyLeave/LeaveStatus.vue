<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>
    <v-sheet class="pa-3">
      <h2 class="text-h5"><span class="success--text">승인</span>된 출타</h2>
      <template v-if="!leaveLoading">
        <LeaveInfoCard
          v-for="leave of acceptedLeaves"
          :key="`accepted-${leave._id}`"
          :leave="leave"
          class="mt-2"
        />
      </template>
      <template v-else>
        <v-card
          outlined
          v-for="i in 3"
          :key="`accepted-loading-${i}`"
          class="mt-2"
        >
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
        </v-card>
      </template>
    </v-sheet>
    <v-sheet class="pa-3">
      <h2 class="text-h5"><span class="error--text">거부</span>된 출타</h2>
      <template v-if="!leaveLoading">
        <LeaveInfoCard
          v-for="leave of deniedLeaves"
          :key="`denied-${leave._id}`"
          :leave="leave"
          class="mt-2"
        />
      </template>
      <template v-else>
        <v-card outlined v-for="i in 3" :key="`deny-loading-${i}`" class="mt-2">
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
        </v-card>
      </template>
    </v-sheet>
    <v-sheet class="pa-3">
      <h2 class="text-h5">승인 대기중</h2>
      <template v-if="!leaveLoading">
        <LeaveInfoCard
          v-for="leave of pendingLeaves"
          :key="`pending-${leave._id}`"
          :leave="leave"
          class="mt-2"
        />
      </template>
      <template v-else>
        <v-card
          outlined
          v-for="i in 3"
          :key="`pending-loading-${i}`"
          class="mt-2"
        >
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
        </v-card>
      </template>
    </v-sheet>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'
import LeaveInfoCard from '../../components/myleave/LeaveInfoCard.vue'

import leaveTokenAPI from '../../services/leaveTokenManage'
import leaveAPI from '../../services/leave'
import { format, add, parseISO, compareDesc } from 'date-fns'

export default {
  components: {
    CurrentLocation,
    LeaveInfoCard
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
      return this.rawLeaves
        .filter(leave => leave.status === 'accepted')
        .sort((a, b) =>
          compareDesc(parseISO(a.startDate), parseISO(b.startDate))
        )
    },
    pendingLeaves() {
      return this.rawLeaves
        .filter(leave => leave.status === 'pending')
        .sort((a, b) =>
          compareDesc(parseISO(a.startDate), parseISO(b.startDate))
        )
    },
    deniedLeaves() {
      return this.rawLeaves
        .filter(leave => leave.status === 'denied')
        .sort((a, b) =>
          compareDesc(parseISO(a.startDate), parseISO(b.startDate))
        )
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
      return format(parseISO(value), 'yyyy년 MM월 dd일')
    }
  }
}
</script>
