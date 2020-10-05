<template>
  <v-row>
    <!-- 좌측 액션메뉴 -->
    <v-col cols="18">
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
            :divisions="divisions"
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
    <v-col cols="18">
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
      :curUserInfo="currentItem"
      :divisions="divisions"
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
    currentDivision: null,
    rawDivisions: [],
    leaveTokenSearch: '',
    isEditLeaveTokenDialogOpen: false,
    currentItem: {}
  }),
  computed: {
    leaveTokens() {
      return this.rawLeaveTokens
    },
    divisions() {
      return [...this.rawDivisions]
    },
    isAppLoading() {
      return this.$store.getters.isAppLoading
    },
    headers: () => [
      { text: 'ID', value: '_id', align: 'start' },
      { text: '발행자', value: 'issuer' },
      { text: '대상자', value: 'target' },
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
    async loadLeaveTokens(division) {
      division = division || this.currentDivision

      this.userLoading = true
      const res = await leaveTokenAPI.getLeaveTokens()
      this.rawLeaveTokens = res.data.docs

      this.userLoading = false
    },
    async fetchDivisions() {
      this.divisionLoading = true
      const res = await divisionAPI.getAllDivision()
      this.rawDivisions = res.data
      this.divisionLoading = false
    },
    openEditLeaveTokenDialog(leaveToken) {
      this.currentItem = leaveToken
      this.isEditUserDialogOpen = true
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
  watch: {
    async currentDivision(val) {
      // await this.loadUsers(val ? val._id : undefined)
      await this.loadUsers()
    }
  },
  async created() {
    this.$store.dispatch('startAppLoading')

    await this.fetchDivisions()
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
