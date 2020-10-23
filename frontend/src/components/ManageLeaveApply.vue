<template>
  <v-row no-gutters>
    <v-col cols="3">
      <v-card color="primary lighten-1" dark>
        <v-card-title>
          출타 승인/거부
        </v-card-title>
        <v-list color="primary lighten-1" dark>
          <v-list-item-group v-model="typeSelected" mandatory>
            <v-list-item
              v-for="(type, idx) of availableTypes"
              :key="`type-btn-${idx}`"
            >
              {{ type }}
              <v-chip
                class="ml-2"
                small
                color="secondary"
                dark
                v-if="
                  (applies[type] || []).filter(
                    item => item.status === 'pending'
                  ).length
                "
              >
                {{
                  (applies[type] || []).filter(
                    item => item.status === 'pending'
                  ).length
                }}
              </v-chip>
            </v-list-item>
          </v-list-item-group>
          <div class="px-3 pt-3">
            <!-- <v-spacer></v-spacer> -->
            <v-btn @click="loadApplies" color="secondary" block>
              <v-icon class="mr-1">mdi-refresh</v-icon> 새로고침
            </v-btn>
          </div>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="9" class="px-2">
      <v-toolbar flat dense>
        <v-text-field
          v-model="search"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          dense
          clearable
        ></v-text-field>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table
        v-model="applySelected"
        :search="search"
        :headers="headers[currentType]"
        :items="applies[currentType]"
        item-key="_id"
        :loading="applyLoading"
        :page="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
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
            :color="item.status === 'accepted' ? 'success' : 'grey'"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            @click="clickDeny(item)"
            class="ml-2"
            outlined
            fab
            x-small
            :color="item.status === 'denied' ? 'error' : 'grey'"
          >
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </template>
        <template v-slot:footer>
          <v-divider></v-divider>
          <Pagination-footer
            v-model="page"
            :item-count="(applies[currentType] || []).length"
            :items-per-page.sync="itemsPerPage"
          />
        </template>
      </v-data-table>
    </v-col>

    <v-dialog v-model="isDialogApply" v-if="currentDialogApply" max-width="300">
      <v-card>
        <v-card-title>
          사용된 출타
        </v-card-title>
        <v-card-text>
          <v-sheet
            v-for="token of currentDialogApply.tokens"
            :key="`token-dialog-${token._id}`"
            outlined
            class="ma-1 py-1 px-2"
          >
            <div class="d-flex">
              <div v-if="token.type === '휴가'">
                {{ token.kind }} {{ token.type }} {{ token.amount }} 일
              </div>
              <div v-else>{{ token.kind }} {{ token.type }}</div>
              <v-spacer></v-spacer>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip v-bind="attrs" v-on="on" small>
                    {{ token.expirationDate | fromNow }} 뒤 만료
                  </v-chip>
                </template>
                <span>{{ token.expirationDate | formatDate }}</span>
              </v-tooltip>
            </div>
            <div>{{ token.reason }}</div>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import PaginationFooter from '../components/PaginationFooter.vue'

import { format, parseISO, formatDistance } from 'date-fns'
import { ko } from 'date-fns/locale'
import leaveAPI from '../services/leave'

export default {
  components: { PaginationFooter },
  data: () => ({
    rawApplies: [],
    typeSelected: 0,
    applySelected: [],
    currentDialogApply: null,
    isDialogApply: false,
    applyLoading: false,
    search: '',

    itemsPerPage: 10,
    page: 1
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
    // formatDate(value) {
    //   return format(parseISO(value), 'yyyy-MM-dd')
    // },
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
    },
    formatDate(value) {
      return format(parseISO(value), 'yyyy년 MM월 dd일')
    },
    fromNow(value) {
      return formatDistance(parseISO(value), new Date(), { locale: ko })
    }
  }
}
</script>
