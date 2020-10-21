<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>
    <v-row>
      <!-- 현재 보유한 출타 -->
      <v-col col="12">
        <v-data-table
          :headers="headers"
          :items="leaves"
          :search="leaveSearch"
          :loading="leaveLoading"
          :page="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:[`item.startDate`]="{ item }">
            <span>{{ new Date(item.startDate).toLocaleDateString() }}</span>
          </template>
          <template v-slot:[`item.endDate`]="{ item }">
            <span>{{ new Date(item.endDate).toLocaleDateString() }}</span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <span :class="`${getStatusColor(item.status)}--text`">{{
              item.status | formatStatus
            }}</span>
          </template>
          <template v-slot:[`item.tokens`]="{ item }">
            <v-tooltip
              bottom
              v-for="token of item.tokens"
              :key="`leave-${item._id}-${token._id}`"
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
          </template>
          <template v-slot:footer>
            <v-divider></v-divider>
            <Pagination-footer
              v-model="page"
              :item-count="leaves.length"
              :items-per-page.sync="itemsPerPage"
            />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'
import PaginationFooter from '../../components/PaginationFooter.vue'
import leaveTokenAPI from '../../services/leaveTokenManage'
import leaveAPI from '../../services/leave'
import { format, add } from 'date-fns'

export default {
  components: {
    CurrentLocation,
    PaginationFooter
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
    successAlert: false,

    page: 1,
    itemsPerPage: 10
  }),
  computed: {
    location: () => [
      { text: '대시보드', path: '/myleave' },
      { text: '출타 히스토리', path: '/myleave/leave-history' }
    ],
    leaves() {
      return this.rawLeaves
    },
    isAppLoading() {
      return this.$store.getters.isAppLoading
    },
    headers: () => [
      { text: '출타 종류', value: 'type', align: 'start' },
      { text: '출발 일자', value: 'startDate' },
      { text: '도착 일자', value: 'endDate' },
      { text: '사용된 출타', value: 'tokens' },
      { text: '상태', value: 'status' },
      { text: '기타', value: 'message' }
    ]
  },
  methods: {
    async loadLeaves() {
      this.leaveLoading = true
      const res = await leaveAPI.getLeaveHistory()
      this.rawLeaves = res.data.filter(
        leave => leave.user === JSON.parse(localStorage.getItem('user'))._id
      )

      //      const resToken = await leaveTokenAPI.getLeaveTokens()
      //      var temp = resToken.data.filter(leaveToken => leaveToken._id == this.rawLeaves.leaveToken)
      const temp = { type: '휴가', amount: '3' }
      for (let i = 0; i < this.rawLeaves.length; i++) {
        this.rawLeaves[i].type = temp.type
        this.rawLeaves[i].endDate = new Date(
          new Date(this.rawLeaves[i].startDate).getFullYear(),
          new Date(this.rawLeaves[i].startDate).getMonth(),
          new Date(this.rawLeaves[i].startDate).getDate() +
            parseInt(temp.amount) -
            1,
          0,
          0,
          0
        )
      }
      this.leaveLoading = false
    },
    getStatusColor(status) {
      if (status === 'accepted') {
        return 'success'
      } else if (status === 'denied') {
        return 'error'
      }
      return ''
    }
  },
  async created() {
    this.$store.dispatch('startAppLoading')
    await this.loadLeaves()
    this.$store.dispatch('endAppLoading')
  },
  filters: {
    formatStatus(value) {
      if (value === 'accepted') {
        return '승인됨'
      }
      if (value === 'denied') {
        return '거부됨'
      }
      if (value === 'pending') {
        return '대기중'
      }
      return ''
    }
  }
}
</script>
