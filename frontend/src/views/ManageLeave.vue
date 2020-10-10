<template>
  <div>
    <v-tabs v-model="tabidx">
      <v-tab>출타 부여</v-tab>
      <v-tab>출타 승인</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabidx" class="pa-3">
      <v-tab-item><ManageLeaveToken /></v-tab-item>
      <v-tab-item><ManageLeaveApply /></v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import ManageLeaveToken from '../components/ManageLeaveToken.vue'
import ManageLeaveApply from '../components/ManageLeaveApply.vue'

export default {
  components: {
    ManageLeaveToken,
    ManageLeaveApply
  },
  data: () => ({
    tabidx: 0
  })
}
</script>
