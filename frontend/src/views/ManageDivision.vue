<template>
  <v-row>
    <!-- 좌측 액션메뉴 -->
    <v-col cols="3">
      <v-card class="" flat color="primary lighten-1" dark>
        <v-card-title>
          부대 관리
        </v-card-title>
        <v-card-text>
          <CreateDivisionDialog
            @submit="submitCreateDivision"
            v-slot="{ on, attrs }"
          >
            <v-btn color="secondary" dark block v-bind="attrs" v-on="on">
              <v-icon>mdi-plus</v-icon>
              부대 생성
            </v-btn>
          </CreateDivisionDialog>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- 우측 리스트 -->
    <v-col cols="9">
      <v-toolbar flat>
        <v-text-field
          hide-details
          prepend-icon="mdi-magnify"
          single-line
        ></v-text-field>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <v-progress-linear
          :active="loading"
          indeterminate
          color="primary"
          absolute
          bottom
        ></v-progress-linear>
      </v-toolbar>

      <v-row>
        <v-col v-for="divi of divisions" :key="divi._id" :cols="6">
          <v-card outlined>
            <v-card-title class="d-flex">
              <div>
                {{ divi.name }}
              </div>
              <v-spacer></v-spacer>
              <v-btn icon color="error" @click="clickDeleteDivision(divi)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              소속 부대원 {{ divi.usercnt }}명
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <div class="d-flex">
                <div class="mr-3">관리자</div>
                <v-chip
                  v-for="moderator of divi.moderators"
                  :key="moderator.username"
                  dense
                  outlined
                >
                  {{ moderator.name }}
                </v-chip>
              </div>
              <!-- <v-subheader>관리자</v-subheader> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import divisionAPI from '../services/division'

import CreateDivisionDialog from '../components/CreateDivisionDialog.vue'

export default {
  components: {
    CreateDivisionDialog
  },
  data: () => ({
    loading: false,
    rawDivisions: []
  }),
  computed: {
    divisions() {
      return this.rawDivisions
    }
  },
  methods: {
    async loadDivisions() {
      this.loading = true
      const res = await divisionAPI.getAllDivision()
      this.rawDivisions = res.data
      this.loading = false
    },
    async submitCreateDivision(data) {
      await divisionAPI.createDivision(data)
      await this.loadDivisions()
    },
    async clickDeleteDivision(division) {
      if (
        await this.$confirm(`다음 부대가 삭제됩니다 : ${division.name}`, {
          color: 'error',
          title: '부대를 삭제하시겠습니까?',
          buttonTrueColor: 'error'
        })
      ) {
        this.loading = true
        await divisionAPI.deleteDivision(division._id)
        await this.loadDivisions()
      }
    }
  },
  async created() {
    await this.loadDivisions()
  },
  filters: {}
}
</script>
