<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>
    <v-row>
      <!-- 현재 보유한 출타 -->
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
                <v-btn text @click="clickApplyLeave(item)">사용하기</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <!-- <v-tab-item>asdf</v-tab-item>
          <v-tab-item>asdf</v-tab-item> -->
        </v-tabs-items>
      </v-col>

      <!-- 휴가 신청 전 선택 -->
      <v-col v-if="availableTypes[currentType].value === '휴가'">
        <v-toolbar flat>
          <v-toolbar-title>휴가 신청</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <div>
          <DateRangeSelect :length="totalApplyLength" type="휴가" />
          <v-btn color="primary">신청하기</v-btn>
        </div>
        <v-card
          outlined
          v-for="(item, idx) of applyList"
          :key="`apply-card-${idx}`"
          class="mb-2"
        >
          <v-toolbar flat>
            <v-toolbar-title>{{ item.kind }} {{ item.type }}</v-toolbar-title>
            <v-spacer />
            <v-btn fab text @click="deleteFromApplyList(idx)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <div v-if="item.type === '휴가'">{{ item.amount }}일</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4"> </v-col>
    </v-row>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'
import KindFilter from '../../components/myleave/KindFilter.vue'
import DateRangeSelect from '../../components/DateRangeSelect.vue'
import leaveAPI from '../../services/leave'

export default {
  components: {
    CurrentLocation,
    KindFilter,
    DateRangeSelect
  },
  data: () => ({
    availables: [],
    availableLoading: false,
    kindFilterOptions: [],
    currentType: 0,
    applyList: []
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
    },
    // 선택한 출타의 총 일수
    totalApplyLength() {
      return this.applyList.reduce((sum, { amount }) => sum + amount, 0)
    }
  },
  methods: {
    async loadAvailables() {
      this.availableLoading = true
      const res = await leaveAPI.getAvailables()
      this.availables = res.data
      this.availableLoading = false
    },
    clickApplyLeave(item) {
      if (!this.applyList.includes(item)) {
        this.applyList.push(item)
      }
    },
    deleteFromApplyList(idx) {
      this.applyList.splice(idx, 1)
    }
  },
  async created() {
    this.$store.dispatch('startAppLoading')
    await this.loadAvailables()
    this.$store.dispatch('endAppLoading')
  }
}
</script>
