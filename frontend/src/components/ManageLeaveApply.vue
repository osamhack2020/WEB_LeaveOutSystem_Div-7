<template>
  <v-row>
    <v-col cols="3">
      <v-card>
        <v-list>
          <v-list-item-group v-model="typeSelected" mandatory>
            <v-list-item
              v-for="(type, idx) of availableTypes"
              :key="`type-btn-${idx}`"
            >
              {{ type }}
              <v-chip
                class="ml-2"
                small
                color="primary"
                v-if="(applies[type] || []).length"
              >
                {{ (applies[type] || []).length }}
              </v-chip>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="9">
      <v-data-table
        v-model="applySelected"
        show-select
        :headers="headers[currentType]"
        :items="applies[currentType]"
        item-key="_id"
      >
        <template v-slot:[`item.startDate`]="{ item }">
          <span>{{ item.startDate | formatDate }}</span>
        </template>
        <template v-slot:[`item.endDate`]="{ item }">
          <span>{{ item.endDate | formatDate }}</span>
        </template>
        <template v-slot:[`item.length`]="{ item }">
          <span>{{ item.length - 1 }}박 {{ item.length }}일</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="clickViewLeaveTokens(item)" outlined
            >사용된 출타</v-btn
          >
          <v-btn @click="clickApply(item)" outlined>승인</v-btn>
          <v-btn @click="clickDeny(item)" outlined>거부</v-btn>
        </template>
      </v-data-table>
    </v-col>

    <v-dialog v-model="isDialogApply" v-if="currentDialogApply">
      <v-card>
        {{ currentDialogApply }}
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { format, parseISO } from 'date-fns'
import leaveAPI from '../services/leave'

export default {
  components: {},
  data: () => ({
    rawApplies: [],
    typeSelected: 0,
    applySelected: [],
    currentDialogApply: null,
    isDialogApply: false
  }),
  computed: {
    headers() {
      return {
        휴가: [
          { text: '대상', value: 'user.name' },
          { text: '출발일', value: 'startDate' },
          { text: '도착일', value: 'endDate' },
          { text: '기간', value: 'length' },
          { text: '', value: 'actions' }
        ],
        외출: [
          { text: '대상', value: 'user.name' },
          { text: '날짜', value: 'startDate' },
          { text: '', value: 'actions' }
        ],
        외박: [
          { text: '대상', value: 'user.name' },
          { text: '날짜', value: 'startDate' },
          { text: '', value: 'actions' }
        ]
      }
    },
    availableTypes: () => ['휴가', '외출', '외박'],
    currentType() {
      return this.availableTypes[this.typeSelected]
    },
    applies() {
      const ret = {}
      for (const type of this.availableTypes) {
        ret[type] = this.rawApplies.filter(
          apply => apply.tokens[0] && apply.tokens[0].type === type
        )
      }
      return ret
    }
  },
  methods: {
    async loadApplies() {
      const res = await leaveAPI.adminGetApplies()
      this.rawApplies = res.data
    },
    async clickApply() {},
    async clickDeny() {},
    clickViewLeaveTokens(apply) {
      this.currentDialogApply = apply
      this.isDialogApply = true
    }
  },
  async created() {
    await this.loadApplies()
  },
  filters: {
    formatDate(value) {
      return format(parseISO(value), 'yyyy-MM-dd')
    }
  }
}
</script>
