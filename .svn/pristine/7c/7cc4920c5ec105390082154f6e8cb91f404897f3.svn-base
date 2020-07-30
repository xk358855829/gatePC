<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { payerules } from '../../../api/api'

const animationDuration = 6000

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
      numtotals:'',
      paytupe: [],
    }
  },
  mounted() {  
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.showLoading({
        text: "图表数据正在努力加载...",
        color: '#38d7d9'
      });
      let data = {
        page: 1,
        pageSize: 0,
        is_del: 0,
        userId: localStorage.getItem('userId'),
        dealer: localStorage.getItem('dealer')
      }
      let res = await payerules(data)
      if (res.data.resCode == 0) {
        var lcknum = 0
        let mesarr = res.data.result;
        for (let i = 0; i < mesarr.length; i++) {
          lcknum += mesarr[i].price
          this.numtotals = (lcknum).toFixed(2)
        }
        this.$emit('func',this.numtotals)
        this.paytupe = Object.values(res.data.payTypeCount)
        console.log(this.paytupe);
        let optionColumn = {
          // title: {
          //     text: '停车支付类型统计',
          //     left: 'center'
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['无感支付', '支付宝支付', '微信支付', '现金支付', '特权', '免费'],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: '{value}单'
            }
          }],
          series: [{
            data: this.paytupe,
            type: 'bar'
          }]
        };
        this.chart.setOption(optionColumn);
        this.chart.hideLoading();
      }
    }
  }
}
</script>
