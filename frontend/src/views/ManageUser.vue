<template>
  <v-row>
    <!-- 좌측 액션메뉴 -->
    <v-col cols="3">
      <v-card
        :disabled="isAppLoading"
        class=""
        flat
        color="primary lighten-1"
        dark
      >
        <v-card-title>
          유저 관리
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="currentDivision"
            :items="divisions"
            :loading="divisionLoading"
            hide-selected
            clearable
            item-text="name"
            label="부대"
            placeholder="소속 없음"
            outlined
            return-object
          ></v-autocomplete>

          <CreateUserDialog
            @submit="submitCreateUser"
            v-slot="{ on, attrs }"
            :divisions="divisions"
          >
            <v-btn color="secondary" dark block v-bind="attrs" v-on="on">
              <v-icon>mdi-plus</v-icon>
              유저 생성
            </v-btn>
          </CreateUserDialog>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- 우측 리스트 -->
    <v-col cols="9">
      <v-toolbar flat>
        <v-text-field
          v-model="userSearch"
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
        :items="users"
        :search="userSearch"
        :loading="userLoading"
      >
        <template v-slot:[`item.role`]="{ item }">
          <v-chip outlined dense>
            {{ item.role | formatRole }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            v-if="!(item.role === 'admin' && !$store.getters.isAdmin)"
            small
            class="mr-2"
            @click="openEditUserDialog(item)"
            >mdi-pencil</v-icon
          >
          <v-icon
            v-if="!(item.role === 'admin' && !$store.getters.isAdmin)"
            small
            @click="clickDeleteUser(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>

    <EditUserDialog
      v-model="isEditUserDialogOpen"
      @submit="clickEditUser"
      :curUserInfo="currentItem"
      :divisions="divisions"
    >
    </EditUserDialog>
  </v-row>
</template>
<script>
import userAPI from '../services/user'
import divisionAPI from '../services/division'
import CreateUserDialog from '../components/CreateUserDialog.vue'
import EditUserDialog from '../components/EditUserDialog.vue'

export default {
  components: {
    CreateUserDialog,
    EditUserDialog
  },
  data: () => ({
    userLoading: false,
    divisionLoading: false,
    rawUsers: [],
    currentDivision: null,
    rawDivisions: [],
    userSearch: '',
    isEditUserDialogOpen: false,
    currentItem: {}
  }),
  computed: {
    users() {
      return this.rawUsers
    },
    divisions() {
      return [...this.rawDivisions]
    },
    isAppLoading() {
      return this.$store.getters.isAppLoading
    },
    headers: () => [
      { text: '아이디', value: 'username', align: 'start' },
      { text: '이름', value: 'name' },
      { text: '권한', value: 'role' },
      // { text: '소속부대', value: 'division' },
      { text: '', value: 'actions', sortable: false }
    ]
  },
  methods: {
    async submitCreateUser(userInfo) {
      this.userLoading = true
      const res = await userAPI.createUser(userInfo)
      this.currentDivision = userInfo.division
      await this.loadUsers()
      this.userLoading = false
    },
    async loadUsers(division) {
      division = division || this.currentDivision

      this.userLoading = true
      const res = await userAPI.getUsers()
      if (division) {
        this.rawUsers = res.data.docs.filter(
          user => user.division === division._id
        )
      } else {
        this.rawUsers = res.data.docs.filter(user => !user.division)
      }

      this.userLoading = false
    },
    async fetchDivisions() {
      this.divisionLoading = true
      const res = await divisionAPI.getAllDivision()
      this.rawDivisions = res.data
      this.divisionLoading = false
    },
    openEditUserDialog(user) {
      user = this.populateDivision(user)
      this.currentItem = user
      this.isEditUserDialogOpen = true
    },
    async clickEditUser(userInfo) {
      const res = await userAPI.editUser(userInfo)
      // this.currentDivision = userInfo.division

      await this.loadUsers()
    },
    async clickDeleteUser(user) {
      if (
        await this.$confirm(
          `다음 유저가 삭제됩니다 : ${user.username} (${user.name})`,
          {
            color: 'error',
            title: '유저를 삭제하시겠습니까?',
            buttonTrueColor: 'error'
          }
        )
      ) {
        await userAPI.deleteUser(user._id)
        await this.loadUsers()
      }
    },

    populateDivision(user) {
      user = { ...user }
      if (user.division) {
        user.division = this.divisions.find(x => x._id === user.division)
      }
      return user
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
    this.currentDivision = this.$store.getters.user.division

    this.$store.dispatch('endAppLoading')
    await this.loadUsers()
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
