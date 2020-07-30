<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      table: [],
      open: 0,
      close: 0
    }
  },
  computed: {
    ...mapGetters(['todoList'])
  },
  watch: {
    apliyparkName: function (val) {
      for (let i = 0; i < val.length; i++) {
        if (val[i].workingStatus != 0) {
          this.open += 1;
        } else {
          this.close += 1;
        }
      }
      this.table = [this.open, this.close]
      console.log(this.table)
      this.initChart()
    }
  },
  mounted() {
    let datas = {
      pageNum: 1,
      pageSize: 100,
      // userId: localStorage.getItem('userId'),
      // dealer: localStorage.getItem('dealer')
    }
    this.gatepeople(datas);
    let val = this.$store.getters.todoList;
    for (let i = 0; i < val.length; i++) {
      if (val[i].workingStatus != 0) {
        this.open += 1;
      } else {
        this.close += 1;
      }
    }
    this.table = [this.open, this.close]
    console.log(this.table)
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  computed: {
    ...mapState({
      'gates': state => state.gate.gatelist
    }),
  },
  methods: {
    ...mapActions(["gatepeople"]),
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['正常工作', '停止工作']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '41%'],
            data: [
              { value: this.open, name: '正常工作' },
              { value: this.close, name: '停止工作' },
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
<style scope="scoped">
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>