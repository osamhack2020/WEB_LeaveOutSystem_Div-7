<template>
  <v-app id="inspire">
    <nav-bar></nav-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/core/NavBar.vue'

export default {
  name: 'App',
  metaInfo() {
    return {}
  },

  components: { NavBar },

  data: () => ({
    //
  })
}
</script>
