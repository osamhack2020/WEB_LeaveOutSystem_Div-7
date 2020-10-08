<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>
    <v-row>
      <v-col cols="5">
        <v-card>
          <v-list>
            <v-subheader>출타 종류</v-subheader>
            <v-list-item-group mandatory>
              <v-list-item>휴가</v-list-item>
              <v-list-item>외출</v-list-item>
              <v-list-item>외박</v-list-item>
            </v-list-item-group>
            <v-divider></v-divider>
            <v-subheader>필터</v-subheader>
            <v-list-item>
              <v-chip-group multiple column>
                <v-chip
                  v-for="item of kindList"
                  :key="`kind-${item.value}`"
                  outlined
                  filter
                >
                  {{ item.text }}
                </v-chip>
              </v-chip-group>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="7"> </v-col>
    </v-row>
  </div>
</template>
<script>
import CurrentLocation from '../../components/myleave/CurrentLocation.vue'

export default {
  components: {
    CurrentLocation
  },
  data: () => ({}),
  computed: {
    location: () => [
      { text: '대시보드', path: '/myleave' },
      { text: '사용 가능 출타', path: '/myleave/leave-available' }
    ],
    kindList: () => [
      { text: '정기', value: 'regular' },
      { text: '병가', value: 'sick' },
      { text: '포상', value: 'reward' },
      { text: '위로', value: 'comfort' },
      { text: '신병', value: 'recruit' },
      { text: '기타', value: 'etc' }
    ]
  }
}
</script>
