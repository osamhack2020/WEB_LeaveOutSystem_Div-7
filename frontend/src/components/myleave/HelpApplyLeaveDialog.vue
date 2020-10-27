<template>
  <v-dialog v-model="dialog" max-width="350px">
    <template v-slot:activator="acti">
      <slot v-bind="acti"></slot>
    </template>
    <v-card>
      <v-card-title>
        <v-icon class="mr-2">mdi-robot</v-icon>
        추천 조합 찾아드릴게요!
      </v-card-title>
      <v-divider> </v-divider>
      <v-text-field
        class="my-2 mx-3"
        v-model="leaveLength"
        label="휴가 일수 입력"
        filled
        placeholder="3"
        hide-details
      ></v-text-field>
      <v-list dense>
        <v-subheader>추천 출타 조합!</v-subheader>
        <p v-if="!(parseInt(leaveLength) > 0)" class="text-caption mx-3">
          일수를 입력해주세요...
        </p>
        <p
          v-else-if="recoms.every(r => r.num === -1)"
          class="text-caption mx-3"
        >
          가능한 조합이 없습니다...
        </p>
        <template v-for="(recom, i) in recoms">
          <v-list-item v-show="recom.num != -1" :key="`recom-${i}`">
            <v-list-item-content>
              <v-list-item-title>추천 {{ i + 1 }}순위 </v-list-item-title>
              <div class="d-flex flex-wrap">
                <v-chip
                  v-for="item of recomItems(recoms[i].num)"
                  :key="`recom-${i}-${item._id}`"
                  class="ml-1"
                  small
                >
                  {{ item.kind }} {{ item.amount }}일
                </v-chip>
              </div>
            </v-list-item-content>
            <v-btn
              type="submit"
              :disabled="!canSubmit"
              color="blue darken-1"
              @click="clickChoose(i)"
              text
            >
              선택
            </v-btn>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
import { compareAsc, parseISO } from 'date-fns'

export default {
  props: {
    value: [Boolean, Array],
    availables: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialog: false,
      loading: false,
      leaveLength: null,
      recoms: [
        { num: -1, str: '' },
        { num: -1, str: '' },
        { num: -1, str: '' }
      ]
    }
  },
  computed: {
    canSubmit() {
      const check = true
      //        formValid.username(this.curLeaveTokenInfo.target)
      //       formValid.amount(this.curLeaveTokenInfo.amount) &&
      //        formValid.effectiveDate(this.effectiveDate) &&
      //        formValid.expirationDate(this.expirationDate) &&
      //      formValid.reason(this.curLeaveTokenInfo.reason)
      return check
    },
    tokenItems() {
      const ret = [...this.availables]
        .sort((a, b) =>
          compareAsc(parseISO(a.expirationDate), parseISO(b.expirationDate))
        )
        .sort((a, b) => b.amount - a.amount)
      for (let i = 0; i < ret.length - 1; i++) {
        if (Math.floor(Math.random() * 3) === 0) {
          ;[ret[i], ret[i + 1]] = [ret[i + 1], ret[i]]
        }
      }
      return ret
    }
  },
  methods: {
    clickSubmit() {
      const len = this.tokenItems.length
      let cnt = 0
      this.recoms = [
        { num: -1, str: '' },
        { num: -1, str: '' },
        { num: -1, str: '' }
      ]
      for (let j = 0; j < 1 << len; j++) {
        let temp = 0
        for (let k = 0; k < len; k++) {
          if (j & (1 << k)) {
            temp += this.tokenItems[k].amount
          }
        }
        if (parseInt(temp) === parseInt(this.leaveLength)) {
          let exists = false
          for (let k = 0; k < cnt; k++) {
            if (this.recoms[k].num === j) {
              exists = true
            }
          }
          if (exists) {
            continue
          }
          this.recoms[cnt].num = j
          this.recoms[cnt].str = ''
          cnt++
        }
        if (parseInt(cnt) === 3) {
          break
        }
      }
    },
    clickChoose(i) {
      this.$emit('submit', this.recoms[i].num)
      this.dialog = false
      this.leaveLength = null
      this.recoms = null
      this.recom = 1
    },
    recomItems(val) {
      const ret = []
      for (let i = 0; i < this.tokenItems.length; i++) {
        if (val & (1 << i)) {
          ret.push(this.tokenItems[i])
        }
      }
      return ret
    }
  },
  watch: {
    dialog(value) {
      this.$emit('input', value)
    },
    value(val) {
      this.dialog = val
    },
    // recoms(value) {
    //   this.$emit('input', value)
    // },
    leaveLength(val) {
      this.clickSubmit()
    }
  }
}
</script>
