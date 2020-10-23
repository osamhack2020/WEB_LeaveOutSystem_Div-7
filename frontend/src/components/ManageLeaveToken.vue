<template>
  <v-row no-gutters>
    <!-- 좌측 액션메뉴 -->
    <v-col cols="12">
      <v-card
        :disabled="isAppLoading"
        class=""
        flat
        color="primary lighten-1"
        dark
      >
        <v-card-title class="d-flex">
          출타 관리
          <div>
            <CreateLeaveTokenDialog
              @submit="submitCreateLeaveToken"
              v-slot="{ on, attrs }"
            >
              <v-btn
                color="secondary"
                dark
                depressed
                class="ml-5"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
                출타 생성
              </v-btn>
            </CreateLeaveTokenDialog>
          </div>
        </v-card-title>
      </v-card>
    </v-col>

    <!-- 우측 리스트 -->
    <v-col cols="12">
      <v-toolbar flat>
        <v-text-field
          v-model="leaveTokenSearch"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          dense
          clearable
        ></v-text-field>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- 유저 리스트 -->
      <v-data-table
        :headers="headers"
        :items="leaveTokens"
        :search="leaveTokenSearch"
        :loading="leaveTokenLoading"
        :page="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
      >
        <template v-slot:[`item.effectiveDate`]="{ item }">
          <span>{{ new Date(item.effectiveDate).toLocaleDateString() }}</span>
        </template>
        <template v-slot:[`item.expirationDate`]="{ item }">
          <span>{{ new Date(item.expirationDate).toLocaleDateString() }}</span>
        </template>
        <template v-slot:[`item.role`]="{ item }">
          <v-chip outlined dense>
            {{ item.role | formatRole }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            color="primary"
            @click="openEditLeaveTokenDialog(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small color="error" @click="clickDeleteLeaveToken(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:[`item.target`]="{ item }">
          <v-chip
            class="mr-2"
            :color="item.target && item.target.length === 0 ? '' : 'secondary'"
            @click="openAssignLeaveTokenDialog(item)"
            label
          >
            {{ item.target ? item.target.length : '0' }}명
          </v-chip>
        </template>
        <template v-slot:footer>
          <v-divider></v-divider>
          <Pagination-footer
            v-model="page"
            :item-count="leaveTokens.length"
            :items-per-page.sync="itemsPerPage"
          />
        </template>
      </v-data-table>
    </v-col>
    <AssignLeaveTokenDialog
      v-model="isAssignLeaveTokenDialogOpen"
      @submit="clickAssignLeaveToken"
      :curLeaveTokenInfo="currentItem"
    >
    </AssignLeaveTokenDialog>
    <EditLeaveTokenDialog
      v-model="isEditLeaveTokenDialogOpen"
      @submit="clickEditLeaveToken"
      :curLeaveTokenInfo="currentItem"
    >
    </EditLeaveTokenDialog>
  </v-row>
</template>
<script>
import leaveTokenAPI from '../services/leaveTokenManage'
import CreateLeaveTokenDialog from '../components/CreateLeaveTokenDialog.vue'
import EditLeaveTokenDialog from '../components/EditLeaveTokenDialog.vue'
import AssignLeaveTokenDialog from '../components/AssignLeaveTokenDialog.vue'
import PaginationFooter from '../components/PaginationFooter.vue'

export default {
  components: {
    CreateLeaveTokenDialog,
    EditLeaveTokenDialog,
    AssignLeaveTokenDialog,
    PaginationFooter
  },
  data: () => ({
    leaveTokenLoading: false,
    divisionLoading: false,
    rawLeaveTokens: [],
    leaveTokenSearch: '',
    isEditLeaveTokenDialogOpen: false,
    isAssignLeaveTokenDialogOpen: false,
    currentItem: {},

    itemsPerPage: 10,
    page: 1
  }),
  computed: {
    leaveTokens() {
      return this.rawLeaveTokens
    },
    isAppLoading() {
      return this.$store.getters.isAppLoading
    },
    headers: () => [
      { text: '출타 발행자', value: 'issuer', align: 'start' },
      { text: '종류', value: 'type' },
      { text: '세부 종류', value: 'kind' },
      { text: '부여일수', value: 'amount', align: 'center' },
      { text: '유효 시작일', value: 'effectiveDate' },
      { text: '만료일', value: 'expirationDate' },
      { text: '근거', value: 'reason' },
      { text: '', value: 'actions' },
      { text: '출타 대상자', value: 'target' }
    ]
  },
  methods: {
    async submitCreateLeaveToken(leaveTokenInfo) {
      leaveTokenInfo = this.populateDivision(leaveTokenInfo)
      await leaveTokenAPI.createLeaveToken(leaveTokenInfo)
      await this.loadLeaveTokens()
    },
    async loadLeaveTokens() {
      // const division = JSON.parse(localStorage.getItem('user')).division
      const division = this.$store.getters.user.division

      this.leaveTokenLoading = true
      const res = await leaveTokenAPI.getLeaveTokens()

      if (division) {
        this.rawLeaveTokens = res.data.docs.filter(
          leaveToken => leaveToken.division === division._id
        )
      } else {
        this.rawLeaveTokens = res.data.docs.filter(
          leaveToken => !leaveToken.division
        )
      }

      this.leaveTokenLoading = false
    },
    openEditLeaveTokenDialog(leaveToken) {
      leaveToken = this.populateDate(leaveToken)
      this.currentItem = leaveToken
      this.isEditLeaveTokenDialogOpen = true
    },
    async clickEditLeaveToken(leaveTokenInfo) {
      leaveTokenInfo = this.populateDivision(leaveTokenInfo)
      await leaveTokenAPI.editLeaveToken(leaveTokenInfo)
      await this.loadLeaveTokens()
    },
    openAssignLeaveTokenDialog(leaveToken) {
      this.currentItem = leaveToken
      this.isAssignLeaveTokenDialogOpen = true
    },
    async clickAssignLeaveToken(leaveTokenInfo) {
      leaveTokenInfo = this.populateDivision(leaveTokenInfo)
      await leaveTokenAPI.editLeaveToken(leaveTokenInfo)
      await this.loadLeaveTokens()
    },
    async clickDeleteLeaveToken(leaveTokenInfo) {
      if (
        await this.$confirm(
          `${leaveTokenInfo.target.length}명 에게 부여된 ${leaveTokenInfo.kind}${leaveTokenInfo.type} ${leaveTokenInfo.amount}일을 삭제합니다.`,
          {
            color: 'error',
            title: '출타를 삭제하시겠습니까?',
            buttonTrueColor: 'error'
          }
        )
      ) {
        await leaveTokenAPI.deleteLeaveToken(leaveTokenInfo._id)
        await this.loadLeaveTokens()
      }
    },
    populateDate(leaveToken) {
      leaveToken = { ...leaveToken }
      leaveToken.effectiveDate = new Date(leaveToken.effectiveDate)
        .toISOString()
        .substring(0, 10)
      leaveToken.expirationDate = new Date(leaveToken.expirationDate)
        .toISOString()
        .substring(0, 10)
      return leaveToken
    },
    populateDivision(leaveToken) {
      leaveToken = { ...leaveToken }
      if (leaveToken.division) {
        leaveToken.division = leaveToken.division._id
      }
      return leaveToken
    }
  },
  watch: {},
  async created() {
    this.$store.dispatch('startAppLoading')

    this.$store.dispatch('endAppLoading')
    await this.loadLeaveTokens()
  },

  filters: {
    formatRole(value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 'admin':
          return '어드민'

        case 'moderator':
          return '관리자'

        case 'user':
          return '유저'

        default:
          return ''
      }
    }
  }
}
</script>
