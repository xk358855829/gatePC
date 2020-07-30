<template>
  <el-row :gutter="40" class="panel-group">
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <img src="~@/assets/img/abc (3).png">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今年总收入
          </div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
          <span>{{msgFormSon>0?msgFormSon:0}}</span>
          <span class='unit'>元</span>
        </div>
      </div>
    </el-col> -->
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <img src="~@/assets/img/abc (4).png">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            停车场总数
          </div>
          <count-to :start-val="0" :end-val="8003" :duration="3000" class="card-panel-num" />
          <span>{{parkingtotal}}</span>
          <span class='unit'>个</span>
        </div>
      </div>
    </el-col> -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <img src="~@/assets/img/abc (2).png">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            设备总数
          </div>
          <!-- <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" /> -->
          <span>{{gates}}</span>
          <span class='unit'>个</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <img src="~@/assets/img/abc (1).png">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户总数
          </div>
          <!-- <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" /> -->
          <span>{{total}}</span>
          <span class='unit'>人</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    msgFormSon: {
      type: String,
      default: () => {
          return {}
      }
    }
  },
  data() {
    return {
      paging: {
        page: 1,
        pageSize: 10,
        total: ''
      },
    }
  },
  components: {
    CountTo
  },
  computed: {
    ...mapState(['total']),
    // ...mapState(['parkingtotal', 'total']),
    ...mapState({
      'gates': state => state.gate.gatelistcount
    }),
  },
  methods: {
    ...mapActions(['gatepeople', 'initParkingDevList']),
    // ...mapActions(['Alipay', 'gatepeople', 'initParkingDevList']),
  },
  mounted() {
    let datas = {
      pageNum: 1,
      pageSize: 100,
      // userId: localStorage.getItem('userId'),
      // dealer: localStorage.getItem('dealer')
    }
    // this.Alipay(datas);
    this.gatepeople(datas);
    let params = {
      pageNum: 1,
      pageSize: 100,     
    }
    this.initParkingDevList(params);
  },
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }
  
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 20px;
    position: relative;
    overflow: hidden;
    color: #fff;
    border-radius: 10px;
    // box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    // border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #6ccbc8;
      }

      .icon-message {
        background: #56c8f3;
      }

      .icon-money {
        background: #f8d447;
      }

      .icon-shopping {
        background: #fe6e60
      }
    }

    .icon-people {
      color: #6ccbc8;
    }

    .icon-message {
      color: #56c8f3;
    }

    .icon-money {
      color: #f8d447;
    }

    .icon-shopping {
      color: #fe6e60
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: #fff;
        // color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.panel-group>div:first-of-type .card-panel{
  background: #6ccbc8;
}
.panel-group>div:nth-of-type(2) .card-panel{
  background: #56c8f3;
}
.panel-group>div:nth-of-type(3) .card-panel{
  background: #f8d447;
}
.panel-group>div:last-of-type .card-panel{
  background: #fe6e60;
}
.unit{
  font-size: 14px;
  padding-left: 5px;
}
</style>
