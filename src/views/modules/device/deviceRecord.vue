<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-message__mail-template">
      <el-form :inline="true" :model="dataForm" @submit.native.prevent @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.deviceId" placeholder="设备编号" clearable @clear="getDataList"></el-input>
        </el-form-item>
        <!-- <el-form-item>
			<el-input v-model="dataForm.deviceid" placeholder="设备编号" clearable @clear="getDataList"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border ref="table" style="width: 100%;">
        <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="deviceId" label="设备编号" align="center"></el-table-column>
        <el-table-column prop="opened" label="开关状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.opened == 101 ? "开" : "关"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="时间" align="center"></el-table-column>
        <!-- <el-table-column :label="$t('handle')" fixed="right" align="center" width="80">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteHandle(scope.row.did)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagefooter">
        <el-pagination background v-if="paginationShow" :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="limit" :total="total" layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"></el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
import axios from "axios";
import Qs from "qs";
import { mapActions, mapState, mapGetters } from "vuex";
import { getdeviceRecord } from "../../../api/api";

export default {
  mixins: [mixinViewModule],
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      dataList: [], //列表数据源
      paginationShow: true,
      dataListLoading: false,
      dataForm: {
        deviceId: ""
      }
    };
  },

  components: {},

  computed: {},
  created(){
    this.getDataList();
  },
  mounted() {},

  methods: {
    // 分页, 每页条数
    pageSizeChangeHandle(val) {
      this.limit = val;
      this.getDataList();
    },

    // 分页, 当前页
    pageCurrentChangeHandle(val) {
      this.paginationShow = false;
      this.page = val;
      this.getDataList();
      this.$nextTick(function() {
        this.paginationShow = true;
      });
    },

    indexMethod(index) {
      return index + (this.page - 1) * this.limit + 1;
    },

    //获取设备记录
    getDataList() {
      let that = this,
        queryParams = {
          pageNum: this.page,
          pageSize: this.limit,
          // userId: localStorage.getItem("userId"),
          // dealer: localStorage.getItem("dealer")
        };
      if (this.dataForm.deviceId) {
        queryParams.deviceId = this.dataForm.deviceId;
      }
      this.dataListLoading = true;
      this.dataList = [];
      this.total = 0;
      getdeviceRecord(queryParams)
        .then(({ data: res }) => {
          console.log(res);
          if (res.data.total > 0) {
            that.dataList = res.data.list;
            that.total = res.data.total;
          } else {
            that.dataList = [];
            that.total = 0;
          }
          that.dataListLoading = false;
        })
        .catch({});
    },
    //批量删除
    deleteHandle(val) {
      let that = this;
      that
        .$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.dataListLoading = true;
          toDeleDevic({ did: val }).then(({ data: res }) => {
            if (res.resCode != 0) {
              that.dataListLoading = false;
              return that.$message({
                message: "删除失败",
                type: "error",
                duration: 1000
              });
            }
            that.$message({
              message: "删除成功",
              type: "success",
              duration: 1000
            });
            that.dataListLoading = false;
            that.getDataList();
            // that.$refs.table.clearSelection();
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },

  // activated() {
  //   this.getDataList();
  // }
};
</script>