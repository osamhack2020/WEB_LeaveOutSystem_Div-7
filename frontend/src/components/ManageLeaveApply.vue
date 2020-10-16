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
          <v-btn @click="loadApplies">새로고침</v-btn>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="9">
      <v-data-table
        v-model="applySelected"
        :headers="headers[currentType]"
        :items="applies[currentType]"
        item-key="_id"
        :loading="applyLoading"
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
        <template v-slot:[`item.status`]="{ item }">
          <span>{{ item.status | formatStatus }}</span>
        </template>
        <template v-slot:[`item.detail`]="{ item }">
          <v-btn @click="clickViewLeaveTokens(item)" outlined small>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            @click="clickApply(item)"
            class="ml-2"
            outlined
            fab
            x-small
            color="success"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            @click="clickDeny(item)"
            class="ml-2"
            outlined
            fab
            x-small
            color="error"
          >
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>

    <v-dialog v-model="isDialogApply" v-if="currentDialogApply" max-width="300">
      <v-card>
        <v-card-text>
          <v-card
            v-for="token of currentDialogApply.tokens"
            :key="`token-dialog-${token._id}`"
            outlined
          >
            <v-card-text>
              {{ token.kind }} {{ token.type }} {{ token.amount }} 일
            </v-card-text>
          </v-card>
        </v-card-text>
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
    isDialogApply: false,
    applyLoading: false
  }),
  computed: {
    headers() {
      return {
        휴가: [
          { text: '', value: 'detail' },
          { text: '대상', value: 'user.name' },
          { text: '출발일', value: 'startDate' },
          { text: '도착일', value: 'endDate' },
          { text: '기간', value: 'length' },
          { text: '상태', value: 'status' },
          { text: '', value: 'actions' }
        ],
        외출: [
          { text: '', value: 'detail' },
          { text: '대상', value: 'user.name' },
          { text: '날짜', value: 'startDate' },
          { text: '상태', value: 'status' },
          { text: '', value: 'actions' }
        ],
        외박: [
          { text: '', value: 'detail' },
          { text: '대상', value: 'user.name' },
          { text: '날짜', value: 'startDate' },
          { text: '상태', value: 'status' },
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
      this.applyLoading = true
      const res = await leaveAPI.adminGetApplies()
      this.rawApplies = res.data
      this.applyLoading = false
    },
    async clickApply(apply) {
      await leaveAPI.adminDecideApply(apply._id, 'accepted')
      await this.loadApplies()
    },
    async clickDeny(apply) {
      await leaveAPI.adminDecideApply(apply._id, 'denied')
      await this.loadApplies()
    },
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
    },
    formatStatus(value) {
      if (value === 'accepted') {
        return '승인됨'
      }
      if (value === 'denied') {
        return '거부됨'
      }
      if (value === 'pending') {
        return '대기중'
      }
      return ''
    }
  }
}
</script>
