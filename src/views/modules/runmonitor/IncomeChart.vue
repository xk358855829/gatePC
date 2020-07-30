<template>
    <div :class="className" :style="{height:height,width:width}" />
  
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
    },
    formData: {
      type: Object,
      default: () => {
          return {}
      }
    }
  },
  data() {
    return {
      chart: null,            
      array3: [],
      arrays3: [],
      arrays4: [],
    }
  },
  mounted() {  
    // this.changeTime();
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
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        // title: {
        //   text: ''
        // },
        color: ['#fe6e60'],
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        xAxis: {
          type: 'category',
          data: this.formData.array4,
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
        series: [
          {
            type: 'bar',
            barMaxWidth: '100',
            data: this.formData.array3
          }
        ]
      });  
    }
  }
}
</script>
