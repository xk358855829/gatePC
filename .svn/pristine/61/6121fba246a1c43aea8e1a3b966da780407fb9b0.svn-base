<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-message__mail-template">
      <el-form :inline="true" :model="dataForm" @submit.native.prevent @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.userName" placeholder="账号" clearable @clear="getDataList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.userAlias" placeholder="用户名" clearable @clear="getDataList"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户类型">
          <el-select v-model="dataForm.roleName" filterable style="width: 100%">
            <el-option v-for="item in options" :key="item.roleId" :label="item.roleName" :value="item.roleName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.superior" placeholder="上级用户" clearable @clear="getDataList"></el-input>
        </el-form-item> -->
        <!--<el-form-item>-->
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddOrUpdate(true)">{{ $t('add') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border ref="table" :row-key="getRowKey" style="width: 100%;">
        <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="50"> </el-table-column>
        <el-table-column prop="userName" label="账号" align="center"></el-table-column>
        <el-table-column prop="userAlias" label="用户名" align="center"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="type" label="用户类型" align="center">
          <template slot-scope="scope">
						<span>{{scope.row.type === "0" ? "超级管理员" : scope.row.type === "1" ? "管理员" : "非管理员"}}</span>
					</template>
        </el-table-column>
        <!-- <el-table-column prop="superior" label="上级用户" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.superior ? scope.row.superior : '-'}}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('handle')" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item-icon" effect="dark" :content="$t('update')" placement="top">
              <i class="icon-change el-icon-edit" @click="handleAddOrUpdate(false, scope.$index, scope.row)"></i>
            </el-tooltip>
            <el-tooltip v-if="scope.row.type==0" class="item-icon" effect="dark" content="权限" placement="top">
              <i class="icon-unclick el-icon-menu"></i>
            </el-tooltip>
            <el-tooltip v-else="" class="item-icon" effect="dark" content="权限" placement="top">
              <i class="icon-menu el-icon-menu" @click="jurisdiction(scope.row)"></i>
            </el-tooltip>
            <el-tooltip v-if="scope.row.type==0" class="item-icon" effect="dark" :content="$t('delete')" placement="top">
              <i class="icon-unclick el-icon-delete"></i>
            </el-tooltip>
            <el-tooltip v-else="" class="item-icon" effect="dark" :content="$t('delete')" placement="top">
              <i class="icon-delete el-icon-delete" @click="deleteHandle(scope.row.userid)"></i>
            </el-tooltip>
            <!-- <el-button type="text" size="small" @click="handleAddOrUpdate(false, scope.$index, scope.row)">
              {{ $t('update') }}
            </el-button>
            <el-button type="text" size="small" @click="jurisdiction(scope.row)">权限</el-button>
            <el-button type="text" size="small" @click="deleteHandle(scope.row.userid)">{{ $t('delete') }}
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagefooter">
        <el-pagination background v-if="paginationShow" :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="limit" :total="total" layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"></el-pagination>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
      <jurisdiction v-if="changeJurisdiction" ref="changeJ" @refreshDataList="getDataList"></jurisdiction>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
import AddOrUpdate from "./roleList-add-or-update";
import jurisdiction from "./jurisdiction";
import { searchClicks } from "../../../api/api";
import axios from "axios";
import Qs from "qs";

export default {
  mixins: [mixinViewModule],
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      options: [], //用户类型
      // pickerValue: [],
      exportIds: null, //导出id集合
      userIds: [], //选中的用户
      dataList: [], //列表数据源
      paginationShow: true,
      dataListLoading: false,
      addOrUpdateVisible: false,
      changeJurisdiction: false,
      userTypeList: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "终端用户",
          value: 0
        },
        {
          label: "经销商",
          value: 1
        }
      ],
      dataForm: {
        userAlias: "",
        userName: "",
        superior: "",
        roleName: ""
      },
      mixinViewModuleOptions: {
        activatedIsNeed: false,
        exportURL: "/sys/user/exports"
      }
      // selectedDate: null,
      //
      // pickerOptions: {
      //     onPick: (date) => {
      //         // 如果只选择一个则保存至selectedDate 否则selectedDate 为空
      //         if (date.minDate && !date.maxDate) {
      //             this.selectedDate = date.minDate;
      //         } else {
      //             this.selectedDate = null;
      //         }
      //     },
      //     disabledDate: (date1) => {
      //         const self = this;
      //         // 判断如果selectedDate有值并且月份不同则不可选择 其他则可选择
      //         return (self.selectedDate && self.selectedDate.getMonth() !== date1.getMonth()) || date1.getTime() > Date.now()
      //     }
      // }
    };
  },

  components: {
    AddOrUpdate,
    jurisdiction
  },

  created() {
    this.getDataList();
  },

  mounted() {
    // this.getOptions();
  },

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

    //获取用户列表
    getDataList() {
      let that = this,
        queryParams = {
          page: this.page,
          PageSize: this.limit
          // userId: localStorage.getItem("userId"),
          // dealer: localStorage.getItem("dealer")
        };
      if (this.dataForm.userAlias) {
        queryParams.userAlias = this.dataForm.userAlias;
      }
      if (this.dataForm.userName) {
        queryParams.userName = this.dataForm.userName;
      }
      if (this.dataForm.roleName) {
        queryParams.roleName = this.dataForm.roleName;
      }
      if (this.dataForm.superior) {
        queryParams.superior = this.dataForm.superior;
      }
      this.dataListLoading = true;
      this.dataList = [];
      this.total = 0;
      axios({
        method: "post",
        url: this.$apiUrl.loginUrl + "/webUser/list",
        data: JSON.stringify(queryParams)
      })
        .then(({ data: res }) => {
          console.log(res);
          if (res.code == 0) {
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

    //新增、修改
    handleAddOrUpdate(params, index, row) {
      console.log(params);
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        if (!params) {
          this.$refs.addOrUpdate.dataForm.userid = row.userid;
        } else {
          this.$refs.addOrUpdate.dataForm.userid = "";
        }
        this.$refs.addOrUpdate.init();
      });
    },

    // 修改权限
    jurisdiction(row) {
      this.changeJurisdiction = true;
      this.$nextTick(() => {
        this.$refs.changeJ.userid = row.userid;
        this.$refs.changeJ.init();
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
          searchClicks("/webUser/delete", { userid: val }).then(
            ({ data: res }) => {
              if (res.code != 0) {
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
    },
    getOptions() {
      let that = this;
      let data = {
        Page: 1,
        PageSize: 20
      };
      axios({
        method: "post",
        url: this.$apiUrl.loginUrl + "/role/findAll",
        data: Qs.stringify(data)
      }).then(function(message) {
        console.log(message.data);
        if (message.data.resCode == 0) {
          that.options = message.data.result;
          that.options.shift();
          that.options.forEach((a, b) => {
            if (a.roleId == localStorage.getItem("userType")) {
              that.options.splice(b, 1);
            }
          });
        }
      });
    }
  }

  // activated() {
  //   this.getDataList();
  // }
};
</script>