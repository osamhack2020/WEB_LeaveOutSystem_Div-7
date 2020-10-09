<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-tabs v-model="currentType">
            <v-tab>휴가</v-tab>
            <v-tab>외출</v-tab>
            <v-tab>외박</v-tab>
          </v-tabs>
          <KindFilter v-model="kindFilterOptions" />
        </v-card>
        <template v-if="availableLoading">
          <v-skeleton-loader
            v-for="i in 4"
            class="mb-3"
            type="article, actions"
            :key="`loader-${i}`"
          ></v-skeleton-loader>
        </template>
        <v-tabs-items v-else v-model="currentType">
          <v-tab-item
            v-for="typ of availableTypes"
            :key="`leave-tab-${typ.value}`"
            class="pa-2"
          >
            <v-card
              outlined
              v-for="(item, idx) of currentAvailables[typ.value]"
              :key="idx"
              class="mb-2"
            >
              <v-card-title> {{ item.kind }} {{ item.type }} </v-card-title>
              <v-card-text>
                <div v-if="item.type === '휴가'">{{ item.amount }}일</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text>사용하기</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <!-- <v-tab-item>asdf</v-tab-item>
          <v-tab-item>asdf</v-tab-item> -->
        </v-tabs-items>
      </v-col>
      <v-col cols="4"> </v-col>
    </v-row>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'
import KindFilter from '../../components/myleave/KindFilter.vue'
import leaveAPI from '../../services/leave'

export default {
  components: {
    CurrentLocation,
    KindFilter
  },
  data: () => ({
    availables: [],
    availableLoading: false,
    kindFilterOptions: [],

    currentType: 0
  }),
  computed: {
    location: () => [
      { text: '대시보드', path: '/myleave' },
      { text: '사용 가능 출타', path: '/myleave/leave-available' }
    ],
    availableTypes: () => [
      { value: '휴가' },
      { value: '외출' },
      { value: '외박' }
    ],

    currentAvailables() {
      const ret = {}

      for (const item of this.availables) {
        ret[item.type] = ret[item.type] || []
        if (this.kindFilterOptions.includes(item.kind)) {
          ret[item.type].push(item)
        }
      }

      return ret
    },
    currentVacations() {
      return this.availables.filter(ava => ava.type === '휴가')
    }
  },
  methods: {
    async loadAvailables() {
      this.availableLoading = true
      const res = await leaveAPI.getAvailables()
      this.availables = res.data
      this.availableLoading = false
    }
  },
  async created() {
    this.$store.dispatch('startAppLoading')
    await this.loadAvailables()
    this.$store.dispatch('endAppLoading')
  }
}
</script>
