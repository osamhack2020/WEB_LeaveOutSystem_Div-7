<template>
  <v-footer dark padless>
    <v-container class="ma-0 pa-0 container--fluid padless">
      <v-card
        flat
        tile
        dark
        class="primary lighten-1 white--text text-center fill-height fluid padless"
      >
        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }}
          <strong>OSAM hackathon Div-7</strong>
        </v-card-text>
      </v-card>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({})
}
</script>
