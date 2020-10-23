<template>
  <v-app-bar app color="primary" flat dark>
    <v-container class="py-0 fill-height">
      <v-btn text :to="{ path: '/' }" active-class="no-active" class="no-blink">
        <v-toolbar-title>출타관리체계</v-toolbar-title>
      </v-btn>

      <!-- 링크들 렌더링 -->
      <template v-for="link of links">
        <v-btn
          text
          :to="{ path: link.path }"
          v-if="link.show && link.show()"
          :key="'navbar-link-' + link.path"
        >
          {{ link.name }}
        </v-btn>
      </template>

      <v-spacer></v-spacer>

      <!-- 로그인버튼 또는 사용자 정보 -->
      <v-menu
        v-if="$store.getters.isAuthed"
        v-model="userPopup"
        :close-on-content-click="false"
        :nudge-width="200"
        transition="slide-y-transition"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text>
            <v-icon class="mr-2">mdi-account-circle</v-icon>
            {{ $store.getters.user.name }}
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $store.getters.user.name }} ({{
                    $store.getters.user.username
                  }})
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $store.getters.user.division | divisionName }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn @click="clickLogout">
              로그아웃
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-btn
        v-else
        :to="{ path: '/login' }"
        active-class="no-active"
        class="no-blink"
      >
        로그인
      </v-btn>
    </v-container>

    <!-- 페이지 로딩 프로그레스바 -->
    <v-progress-linear
      :active="$store.getters.isAppLoading"
      indeterminate
      color="secondary"
      absolute
      bottom
    ></v-progress-linear>
  </v-app-bar>
</template>
<style scoped>
.no-active::before {
  background-color: transparent !important;
}

.no-blink::before {
  background-color: transparent !important;
}
</style>
<script>
export default {
  data: () => ({
    userPopup: false
  }),
  methods: {
    linkTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    },
    async clickLogout() {
      this.userPopup = false
      await this.$store.dispatch('logout')
    }
  },
  computed: {
    links() {
      return [
        { name: '홈', path: '/' },
        {
          name: '내 출타',
          path: '/myleave',
          show: () => this.$store.getters.isAuthed
        },
        {
          name: '출타 달력',
          path: '/calendar',
          show: () =>
            this.$store.getters.isModerator || this.$store.getters.isAdmin
        },
        {
          name: '출타 관리',
          path: '/manage-leave',
          show: () =>
            this.$store.getters.isModerator || this.$store.getters.isAdmin
        },
        {
          name: '유저 관리',
          path: '/manage-user',
          show: () =>
            this.$store.getters.isModerator || this.$store.getters.isAdmin
        },
        {
          name: '부대 관리',
          path: '/manage-division',
          show: () => this.$store.getters.isAdmin
        }
      ]
    }
  },
  filters: {
    divisionName(value) {
      if (!value || !value.name) {
        return '소속 없음'
      }
      return value.name
    }
  }
}
</script>
