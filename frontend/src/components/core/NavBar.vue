<template>
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
      <v-btn text :to="{ path: '/' }" active-class="no-active">
        <v-toolbar-title>출타관리체계</v-toolbar-title>
      </v-btn>
      <template v-for="link of links">
        <v-btn
          text
          :to="{ path: link.path }"
          active-class="no-active"
          :key="'navbar-link-' + link.path"
        >
          {{ link.name }}
        </v-btn>
      </template>

      <v-spacer></v-spacer>

      <!-- 로그인버튼 또는 사용자 -->
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
                  {{ $store.getters.user.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $store.getters.user.username }}
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
      <v-btn v-else :to="{ path: '/login' }" active-class="no-active">
        로그인
      </v-btn>
    </v-container>
  </v-app-bar>
</template>
<style scoped>
.no-active::before {
  background-color: transparent !important;
}
</style>
<script>
export default {
  data: () => ({
    links: [{ name: '홈', path: '/' }],
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
  computed: {}
}
</script>
