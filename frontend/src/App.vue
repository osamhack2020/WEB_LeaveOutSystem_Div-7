<template>
  <v-app id="inspire">
    <nav-bar></nav-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-fade-transition hide-on-leave>
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>
    <footer-bar></footer-bar>
  </v-app>
</template>

<script>
import NavBar from './components/core/NavBar.vue'
import FooterBar from './components/core/FooterBar.vue'

export default {
  name: 'App',
  metaInfo() {
    return {}
  },

  components: { NavBar, FooterBar },

  data: () => ({
    //
  })
}
</script>
