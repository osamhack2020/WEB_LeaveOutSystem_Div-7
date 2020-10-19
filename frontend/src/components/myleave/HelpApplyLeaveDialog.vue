<template>
  <v-dialog v-model="dialog" max-width="350px">
    <template v-slot:activator="acti">
      <slot v-bind="acti"></slot>
    </template>
    <v-card>
      <v-card-title>
        휴가 신청 도우미
      </v-card-title>
      <v-divider> </v-divider>
      <v-form @submit.prevent="clickSubmit">
      <v-card-text>
          <v-text-field
            v-model="leaveLength"
            label="휴가 일수 입력"
            filled
            placeholder="3"
          ></v-text-field>
          <v-layout justify-end>
          <v-btn
            class="ma-n3 pa-n3"
            type="submit"
            color="blue darken-1"
            @click="clickSubmit"
            text
          >
            추천조회
          </v-btn>
          </v-layout>
      </v-card-text>
      </v-form>
      <v-list dense>
      <v-subheader>추천 출타 조합!</v-subheader>
      <v-list-item-group
        v-model="recom"
        color="primary"
      >
        <v-list-item
          v-for="(recom, i) in recoms"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title>추천 {{i+1}}순위 </v-list-item-title>
            {{recoms[i].str}}
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
      </v-list-item-group>
    </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: [Boolean, Array],
    availables: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dialog: false,
      loading: false,
      leaveLength: null,
      recom: 1,
      recoms: [{num: -1, str: ""}, {num: -1, str: ""}, {num: -1, str: ""}],
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
    }
  },
  methods: {
    clickSubmit() {
      var len = this.availables.length
      var cnt = 0
      this.recoms = [{num: -1, str: ""}, {num: -1, str: ""}, {num: -1, str: ""}]
      for(var j = 0; j < (1 << len); j++){
        var temp = 0
        for(var k = 0; k < len; k++){
          if(j & (1 << k)) temp += this.availables[k].amount
        }
        if(parseInt(temp) === parseInt(this.leaveLength)){
          var exists = false
          for(var k = 0; k < cnt; k++){
            if(this.recoms[k].num == j) exists = true
          }
          if(exists) continue
          this.recoms[cnt].num = j
          this.recoms[cnt].str = ""
          for(var k = 0; k < len; k++){
            if(j & (1 << k)) this.recoms[cnt].str += (String(this.availables[k].kind) + String(this.availables[k].amount) + "일 ")
          } 
          cnt++
        }
        if(parseInt(cnt) === 3) break 
      } 
      
    },
    clickChoose(i) {
      this.$emit('submit',this.recoms[i].num)
      this.dialog = false
      this.leaveLength = null
      this.recoms = null
      this.recom = 1
    }
  },
  watch: {
    dialog(value) {
      this.$emit('input', value)
    },
    value(val) {
      this.dialog = val
    },
    recoms(value){
      this.$emit('input', value)
    }
  }
}
</script>
