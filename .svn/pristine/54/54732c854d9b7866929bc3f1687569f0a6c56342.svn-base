<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-message__mail-template">
      <el-form :inline="true" :model="dataForm" @submit.native.prevent @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.deviceId" placeholder="设备编号" clearable @clear="getDataList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.alias" placeholder="设备名称" clearable @clear="getDataList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddOrUpdate(true)">{{ $t('add') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="tab.a" border ref="table" :row-key="getRowKey" style="width: 100%;">
        <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="50"> </el-table-column>
        <el-table-column prop="alias" label="设备名称" align="center"></el-table-column>
        <el-table-column prop="deviceId" label="设备编号" align="center"></el-table-column>
        <el-table-column prop="currentVol" label="电压(V)" align="center"></el-table-column>
        <el-table-column prop="volPercent" label="电压百分比(%)" align="center"></el-table-column>
				<el-table-column prop="installationSite" label="安装位置" align="center"></el-table-column>
        <el-table-column prop="workingStatus" label="工作状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.workingStatus == 1 ? "正常工作" : scope.row.workingStatus > 0 ? "停止工作" : scope.row.workingStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
    						<i class="icon-See el-icon-search" @click="look(scope.row.deviceId)" ></i>
            </el-tooltip>
            <!-- <el-button type="text" size="small" @click="handleAddOrUpdate(false, scope.$index, scope.row)">
              {{ $t('update') }}
            </el-button>
            <el-button type="text" size="small" @click="deleteHandle(scope.row.userId)">{{ $t('delete') }}
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagefooter">
        <el-pagination background v-if="paginationShow" :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="limit" :total="count" layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"></el-pagination>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
// import AddOrUpdate from "./roleLst-add-or-update";
import axios from "axios";
import Qs from "qs";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  mixins: [mixinViewModule],
  data() {
    return {
      page: 1,
      limit: 10,
      exportIds: null, //导出id集合
      userIds: [], //选中的用户
      dataList: [], //列表数据源
      paginationShow: true,
      dataListLoading: false,
      addOrUpdateVisible: false,
      dataForm: {
        deviceId: "",
        alias: "",
      },
      mixinViewModuleOptions: {
        activatedIsNeed: false,
        exportURL: "/sys/user/exports"
      }
    };
  },

  components: {},

  computed: {
    ...mapState({
      count: state => state.gate.gatelistcount
    }),
    tab() {
      return this.$store.getters.todoList;
    }
  },
  mounted() {
    
  },

  methods: {
    ...mapActions(["gatepeople"]),
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

    //获取设备列表
    getDataList() {
      let that = this,
        queryParams = {
          pageNum: this.page,
          pageSize: this.limit,
          // userId: localStorage.getItem("userId"),
          // dealer: localStorage.getItem("dealer")
        };
      if (this.dataForm.deviceId) {
        queryParams.deviceld = this.dataForm.deviceld;
      }
      if (this.dataForm.alias) {
        queryParams.alias = this.dataForm.alias;
      }
      this.dataList = [];
      this.gatepeople(queryParams);
    },

    // 指定一个key标识这一行的数据
    getRowKey(row) {
      return row.id;
    },

    //多选
    dataListSelectionChangeHandle(val) {
      this.userIds = [];
      for (let obj of val) {
        this.userIds.push(obj.id);
      }
      this.$store.dispatch("changeIds", this.userIds.join(","));
      this.exportIds = this.userIds.join(",");
      this.$store.dispatch("changeExportIds", this.exportIds);
    },

    //查看绑定用户
    look(id){
      this.$router.push({path: "/deviceBind",query: {id :id}})
    },

    //新增、修改
    handleAddOrUpdate(params, index, row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        if (!params) {
          this.$refs.addOrUpdate.dataForm.id = row.id;
        }
        this.$refs.addOrUpdate.init();
      });
    },

    //批量删除
    deleteHandle(val) {
      let that = this;
      // if (val) {
      //     _this.userIds = [];
      //     _this.userIds.push(val);
      // }
      // if (_this.userIds.length === 0) {
      //     return _this.$message({
      //         message: "请选择要删除的数据",
      //         type: "error",
      //         duration: 1000
      //     });
      // }
      // let queryParams = {
      //     ids: _this.userIds.join(",")
      // };
      that
        .$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.dataListLoading = true;
          searchClicks("/s_user/delete", { userId: row.userId }).then(
            ({ data: res }) => {
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
            }
          );
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },

  activated() {
    this.getDataList();
  }
};
</script>