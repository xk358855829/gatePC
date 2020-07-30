<template>
 	<section id="home">
		<panel-group :msgFormSon='msgFormSon' />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <div class="echartTitle">设备工作状态</div>
          <pie-chart />
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div class="echartTitle">停车场支付类型统计</div>
          <bar-chart @func="getMsgFormSon" />
        </div>
      </el-col> -->
    </el-row>		
    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">       
        <div class="chart-wrapper">
          <div class="echartTitle">停车场总收入统计</div>
          <div>
            <span>时间选择：</span>
            <el-select v-model="search.id"
                        placeholder="请选择"
                        @change="changeTime">
              <el-option v-for="nice in dataChose"
                          :key="nice.id"
                          :label="nice.label"
                          :value="nice.id"></el-option>
            </el-select>
          </div>
          <income-chart ref='IncomeChart' :formData='formData' />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div class="echartTitle">停车场预约收入统计</div>
          <booking-chart />
        </div>
      </el-col>
    </el-row>	 -->
	</section>
</template>

<script>
    import AMap from "AMap";
    import PanelGroup from './PanelGroup'
    import PieChart from './PieChart'
    import BarChart from './BarChart'
    import IncomeChart from './IncomeChart'
    import BookingChart from './BookingChart'
    import { searchClicks } from '../../../api/api'
    import { obtainnewtime } from "../../../utils/validate";

    export default {
      components: {
        PanelGroup,
        PieChart,
        BarChart,
        IncomeChart,
        BookingChart
      },
        data() {
            return {
              search: {
                id: ''
              },
              dataChose: [
                {
                  label: '当天',
                  id: 1
                },
                {
                  label: '当周',
                  id: 2
                },
                {
                  label: '当月',
                  id: 3
                }, {
                  label: '当年',
                  id: 4
                }
              ],
              formData: {
                array3: [],
                array4: [],
                arrays3: [],
              },
              msgFormSon:''
            };
        },

        methods: {
            getMsgFormSon(data){
                this.msgFormSon = data
            },
            async changeTime (val) {
              let that = this;
              console.log(val);
              if (val == undefined) {
                val = 1
              }
              if (val == "2" || val == "3") {
                await searchClicks('/bills/getPointBillsIncome', { isOrdered: 0, type: val, time: obtainnewtime() }).then(mes => {
                  console.log(mes)
                  that.formData.array3 = []
                  that.formData.array3 = Object.keys(mes.data.result).map(key => mes.data.result[key])
                  that.formData.array3 = that.formData.array3.reverse()
                  that.arrays3 = Object.keys(mes.data.result)
                  that.formData.array4 = []
                  that.arrays3.reverse().forEach((a, b) => {
                    that.formData.array4.push(a.slice(6, 10))
                  })
                })
                this.$refs.IncomeChart.initChart();
              } else if (val == "1") {
                await searchClicks('/bills/getPointBillsIncome', { isOrdered: 0, type: val, time: obtainnewtime().slice(0, 10) }).then(mes => {
                  console.log(mes)
                  that.formData.array3 = Object.keys(mes.data.result).map(key => mes.data.result[key])
                  that.formData.array3 = that.formData.array3.reverse()
                  that.arrays3 = Object.keys(mes.data.result)
                  that.formData.array4 = []
                  that.arrays3.reverse().forEach((a, b) => {
                    that.formData.array4.push(a)
                  })
                })
                this.$refs.IncomeChart.initChart();
              } else {
                await searchClicks('/bills/getPointBillsIncome', { isOrdered: 0, type: val, time: obtainnewtime().slice(0, 4) }).then(mes => {
                  console.log(mes)
                  that.formData.array3 = Object.keys(mes.data.result).map(key => mes.data.result[key])
                  that.formData.array3 = that.formData.array3.reverse()
                  that.arrays3 = Object.keys(mes.data.result)
                  that.formData.array4 = []
                  that.arrays3.reverse().forEach((a, b) => {
                    that.formData.array4.push(a)
                  })
                })
                this.$refs.IncomeChart.initChart();
              }
            },
        },

        mounted() {
            this.changeTime();
        },

        activated() {
        }
    };
</script>

<style scoped lang="scss">
	.dashboard-editor-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);
        position: relative;

        .github-corner {
          position: absolute;
          top: 0px;
          border: 0;
          right: 0;
        }

        .chart-wrapper {
          background: #fff;
          padding: 16px 16px 0;
          margin-bottom: 32px;
        }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
  .echartTitle{
    text-align: center;
    background-color: #f4f3f4;
    height: 60px;
    line-height: 60px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    color: #2d353c;
    font-size: 18px;
    margin-bottom: 16px;
  }
</style>