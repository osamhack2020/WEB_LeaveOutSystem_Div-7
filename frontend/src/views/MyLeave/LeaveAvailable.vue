<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-tabs>
            <v-tab>휴가</v-tab>
            <v-tab>외출</v-tab>
            <v-tab>외박</v-tab>
          </v-tabs>
          <KindFilter v-model="kindFilterOptions" />
        </v-card>
        <v-tabs-items>
          <v-tab-item>
            <template v-if="availableLoading">
              <v-skeleton-loader
                v-for="i in 4"
                class="mb-3"
                type="article, actions"
                :key="`loader-${i}`"
              ></v-skeleton-loader>
            </template>
            <template v-else>
              <v-card
                v-for="(item, idx) of currentAvailables"
                :key="idx"
                class="mt-3"
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
            </template>
          </v-tab-item>
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
    kindFilterOptions: []
  }),
  computed: {
    location: () => [
      { text: '대시보드', path: '/myleave' },
      { text: '사용 가능 출타', path: '/myleave/leave-available' }
    ],

    currentAvailables() {
      return this.availables
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
