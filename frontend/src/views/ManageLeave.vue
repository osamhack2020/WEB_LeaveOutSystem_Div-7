<template>
  <v-row>
    <!-- 좌측 액션메뉴 -->
    <v-col cols="12">
      <v-card
        :disabled="isAppLoading"
        class=""
        flat
        color="primary lighten-1"
        dark
      >
        <v-card-title>
          출타 관리
        </v-card-title>
        <v-card-text>
          <CreateLeaveTokenDialog
            @submit="submitCreateLeaveToken"
            v-slot="{ on, attrs }"
          >
            <v-btn color="secondary" dark block v-bind="attrs" v-on="on">
              <v-icon>mdi-plus</v-icon>
              출타 부여
            </v-btn>
          </CreateLeaveTokenDialog>
        </v-card-text>
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
        ></v-text-field>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <!-- <v-progress-linear
          :active="userLoading"
          indeterminate
          color="primary"
          absolute
          bottom
        ></v-progress-linear> -->
      </v-toolbar>

      <!-- 유저 리스트 -->
      <v-data-table
        :headers="headers"
        :items="leaveTokens"
        :search="leaveTokenSearch"
        :loading="leaveTokenLoading"
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
          <v-icon small class="mr-2" @click="openEditLeaveTokenDialog(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="clickDeleteLeaveToken(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>

    <EditLeaveTokenDialog
      v-model="isEditLeaveTokenDialogOpen"
      @submit="clickEditLeaveToken"
      :curLeaveTokenInfo="currentItem"
    >
    </EditLeaveTokenDialog>
  </v-row>
</template>
<script>
import leaveTokenAPI from '../services/leaveToken'
import userAPI from '../services/user'
import divisionAPI from '../services/division'
import CreateLeaveTokenDialog from '../components/CreateLeaveTokenDialog.vue'
import EditLeaveTokenDialog from '../components/EditLeaveTokenDialog.vue'

export default {
  components: {
    CreateLeaveTokenDialog,
    EditLeaveTokenDialog
  },
  data: () => ({
    leaveTokenLoading: false,
    divisionLoading: false,
    rawLeaveTokens: [],
    leaveTokenSearch: '',
    isEditLeaveTokenDialogOpen: false,
    currentItem: {}
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
      { text: '출타 대상자', value: 'target' },
      { text: '유효 시작일', value: 'effectiveDate' },
      { text: '만료일', value: 'expirationDate' },
      { text: '종류', value: 'type' },
      { text: '세부 종류', value: 'kind' },
      { text: '부여일수', value: 'amount', align: 'center' },
      { text: '근거', value: 'reason' },
      { text: '', value: 'actions', sortable: false }
    ]
  },
  methods: {
    async submitCreateLeaveToken(leaveTokenInfo) {
      console.log(leaveTokenInfo)
      const res = await leaveTokenAPI.createLeaveToken(leaveTokenInfo)
      this.currentDivision = leaveTokenInfo.division
      await this.loadLeaveTokens()
    },
    async loadLeaveTokens() {
      const division = JSON.parse(localStorage.getItem('user')).division

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
      console.log(res)

      this.userLoading = false
    },
    openEditLeaveTokenDialog(leaveToken) {
      this.currentItem = leaveToken
      console.log(leaveToken)
      this.isEditLeaveTokenDialogOpen = true
    },
    async clickEditLeaveToken(leaveTokenInfo) {
      const res = await leaveTokenAPI.editLeaveToken(leaveTokenInfo)
      await this.loadLeaveTokens()
    },
    async clickDeleteLeaveToken(leaveTokenInfo) {
      if (
        await this.$confirm(`다음 출타가 삭제됩니다 : ${leaveTokenInfo._id}`, {
          color: 'error',
          title: '출타를 삭제하시겠습니까?',
          buttonTrueColor: 'error'
        })
      ) {
        await leaveTokenAPI.deleteLeaveToken(leaveTokenInfo._id)
        await this.loadLeaveTokens()
      }
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
