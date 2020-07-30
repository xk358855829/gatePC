<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import axios from 'axios'
import Qs from "qs";
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
      default: '340px'
    }
  },
  data() {
    return {
      chart: null,
      coupon: [],
    }
  },
  mounted() {  
    this.list();
    // this.$nextTick(() => {
    //   this.initChart()
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    list(){
      axios({
        method: 'post',
        url: this.$apiUrl.gtUrl + '/app/reserve/selectByVReserveCount',
        data: Qs.stringify({
          userId: localStorage.getItem('userId'),
          dealer: localStorage.getItem('dealer')
        })
      }).then(res => {
        console.log(res)
        this.coupon = Object.values(res.data)
        this.initChart();
      })  
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        color: ['#3398DB'],
        xAxis: {
          type: 'category',
          data: ['近7天', '近30天', '本月', '本季度', '本年', '上一年', '上一月']
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}元'
          }
        },
        legend: {
          /* data: ['直接访问','邮件营销','联盟广告']*/
        },
        toolbox: {
          feature: {
            /*saveAsImage: {}*//*下载图标*/
          }
        },
        series: [{
          /*name:'流量卡使用情况',*/
          data: [this.coupon[0],this.coupon[1],this.coupon[2],this.coupon[4],this.coupon[3],this.coupon[5],this.coupon[6]],
          type: 'bar'
        }]
      });  
    }
  }
}
</script>
