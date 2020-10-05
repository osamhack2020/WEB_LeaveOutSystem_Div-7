<template>
  <div>
    <v-tabs>
      <v-tabs dark background-color="secondary">
        <v-tab v-for="tab of menus" :key="tab.link" :to="'/myleave' + tab.link">
          {{ tab.name }}
        </v-tab>
      </v-tabs>
    </v-tabs>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  computed: {
    menus: () => [{ name: '대시보드', link: '' }]
  }
}
</script>
