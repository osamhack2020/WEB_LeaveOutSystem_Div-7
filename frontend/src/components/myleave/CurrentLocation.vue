<!-- 내 출타 페이지들의 상단 위치 표시를 정하는 컴포넌트 -->

<template>
  <v-sheet color="primary lighten-1" class="pa-3">
    <template v-for="(item, idx) of exceptLast(locs)">
      <v-btn
        dark
        text
        :to="{ path: item.href }"
        exact
        :key="`curloc-btn-${idx}`"
        >{{ item.text }}
      </v-btn>
      <v-icon dark :key="`curloc-divider-${idx}`">mdi-chevron-right</v-icon>
    </template>
    <v-btn :to="{ path: last(locs).path }" exact color="secondary" text>{{
      last(locs).text
    }}</v-btn>
  </v-sheet>
</template>
<script>
import _ from 'lodash'

export default {
  props: {
    location: {
      type: Array,
      default: () => []
    },
    pathBase: {
      type: String,
      default: '/myleave'
    }
  },
  data: () => ({}),
  computed: {
    locs() {
      if (!Array.isArray(this.location)) {
        return []
      }
      return this.location.map(item => ({
        text: item.text,
        disabled: false,
        href: item.path
      }))
    }
  },
  methods: {
    exceptLast(value) {
      return _.initial(value)
    },
    last(value) {
      return _.last(value)
    }
  },
  filters: {}
}
</script>
