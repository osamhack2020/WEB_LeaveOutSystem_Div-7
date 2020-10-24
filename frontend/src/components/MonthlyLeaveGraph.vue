<template>
  <v-sheet :color="background">
    <div class="py-2 px-3 text-center">
      <h3 class="h3 grey--text text--lighten-4">
        {{ title }}
      </h3>
    </div>
    <div class="px-4 pb-4">
      <LineChart :chartData="chartData" :options="options" />
    </div>
  </v-sheet>
</template>
<script>
import LineChart from '../components/core/LineChart.vue'

import leaveStatAPI from '../services/leaveStat'
import { getYear, getMonth } from 'date-fns'

export default {
  components: { LineChart },
  props: {
    year: {
      type: Number,
      default: getYear(new Date())
    },
    month: {
      type: Number,
      default: getMonth(new Date())
    },
    background: {
      type: String,
      default: 'primary lighten-1'
    },
    line: {
      type: String,
      default: '#f9aa33'
    },
    title: {
      type: String,
      default: ''
    },
    status: {
      type: Array,
      default: () => ['accepted']
    }
  },

  data: () => ({
    loading: false,
    statData: null,
    options: {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.2)',
              display: true,
              drawBorder: false,
              drawOnChartArea: false
            },
            ticks: {
              fontColor: 'white',
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              callback(tick, index, array) {
                if (
                  tick[1] === '1일' ||
                  tick[1] === '15일' ||
                  index === array.length - 1
                ) {
                  return `${parseInt(tick[0])}/${parseInt(tick[1])}`
                }
                return ''
              }
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.2)',
              display: true,
              drawBorder: true,
              drawOnChartArea: false
            },
            ticks: {
              fontColor: 'white',
              beginAtZero: true,
              stepSize: 1
            }
          }
        ]
      },
      gridLines: {
        display: true,
        drawBorder: true,
        drawOnChartArea: false
      }
    }
  }),
  computed: {
    points() {
      if (this.statData) {
        return this.statData.flatMap(x => x)
      }
      return [0, 0, 0]
    },
    labels() {
      const ret = []
      let data
      if (this.statData === null) {
        data = [...new Array(2)].map(() => [...new Array(31)])
      } else {
        data = this.statData
      }
      for (const monthIdx in data) {
        for (const dayIdx in data[monthIdx]) {
          ret.push([
            `${((this.month + parseInt(monthIdx)) % 12) + 1}월`,
            `${parseInt(dayIdx) + 1}일`
          ])
        }
      }
      return ret
    },
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: '',
            data: this.points !== null ? this.points : this.dummyPoints,
            borderColor: this.line,
            fill: false,
            pointRadius: 1,
            lineTension: 0
          }
        ]
      }
    },
    dummyPoints() {
      return [...Array(62)]
    }
  },
  methods: {
    async loadData() {
      // this.statData = null
      const res = await leaveStatAPI.getMonthly(
        this.year,
        this.month,
        this.status
      )
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
