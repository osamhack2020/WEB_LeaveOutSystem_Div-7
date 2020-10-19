<template>
  <v-chip-group v-model="selected" multiple column>
    <v-chip
      v-for="(item, idx) of kindList"
      :key="`kind-${idx}`"
      active-class="secondary--text secondary text--accent-4"
      outlined
      small
    >
      {{ item }}
    </v-chip>
  </v-chip-group>
</template>
<script>
export default {
  props: { value: { type: Array, default: () => [] } },
  data: () => ({ selected: [] }),
  computed: {
    kindList: () => ['정기', '병가', '포상', '위로', '신병', '기타']
  },
  methods: {},
  watch: {
    selected(val) {
      this.$emit(
        'input',
        val.map(idx => this.kindList[idx])
      )
    },
    value() {
      //   this.selected = val.map(text => this.kindList.indexOf(text))
    }
  },
  created() {
    const arr = []
    for (let i = 0; i < this.kindList.length; i++) {
      arr.push(i)
    }
    this.selected = arr
  }
}
</script>
