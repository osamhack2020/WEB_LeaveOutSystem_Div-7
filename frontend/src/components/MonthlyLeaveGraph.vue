<template>
  <div>
    <v-sparkline radius="5" :value="points" line-width="1.5"></v-sparkline>
  </div>
</template>
<script>
import leaveStatAPI from '../services/leaveStat'
import { getYear, getMonth } from 'date-fns'

export default {
  props: {
    year: {
      type: Number,
      default: getYear(new Date())
    },
    month: {
      type: Number,
      default: getMonth(new Date())
    }
  },
  data: () => ({
    loading: false,
    statData: null
  }),
  computed: {
    points() {
      if (this.statData) {
        return this.statData.flatMap(x => x)
      }
      return [1, 2, 1, 4]
    }
  },
  methods: {
    async loadData() {
      const res = await leaveStatAPI.getMonthly(this.year, this.month)
      this.statData = res.data
    }
  },
  async created() {
    await this.loadData()
  },
  watch: {
    async year() {
      await this.loadData()
    },
    async month() {
      await this.loadData()
    }
  }
}
</script>
