<template>
  <div>
    <CurrentLocation :location="location"></CurrentLocation>
    <v-row>
      <v-col cols="5">
        <v-card>
          <v-list>
            <v-subheader>출타 종류</v-subheader>
            <v-list-item-group>
              <v-list-item>휴가</v-list-item>
              <v-list-item>외출</v-list-item>
              <v-list-item>외박</v-list-item>
            </v-list-item-group>
            <v-divider></v-divider>
            <v-btn-toggle multiple tile group>
              <v-btn>
                <v-icon>정기</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>포상</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>위로</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>기타</v-icon>
              </v-btn>
            </v-btn-toggle>
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
    ]
  }
}
</script>
