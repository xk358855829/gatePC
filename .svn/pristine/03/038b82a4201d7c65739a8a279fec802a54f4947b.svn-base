<template>
  <el-dialog :visible.sync="visible" title="权限" :close-on-click-modal="false" :close-on-press-escape="false">
    <div>
      <el-checkbox-group class="checkboxMarginLeft" v-model="checkbox.checkedCities" @change="handleCheckedCitiesChange">
        <div v-if="menu.menuId!=1" v-for="menu in $store.state.sidebarMenuList" :key="menu.menuId">
          <el-checkbox class="checkboxMarginTop" @change="allClick(menu.menuId)" :label="menu.menuId">{{menu.menuName}}</el-checkbox><br />
          <el-checkbox class="checkboxMarginLeft" v-for="item in menu.children" :label="item.menuId" :key="item.menuId">{{item.menuName}}</el-checkbox><br /><br />
        </div>
      </el-checkbox-group>
    </div>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      visible: false,
      userid: "",
      checkbox: {
        checkedCities: []
      },
    };
  },

  methods: {
    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.checkbox.checkedCities = [];
        this.getInfo();
      });
    },

    // 获取信息
    getInfo() {
      let that = this;
      this.$http
        .post(
          this.$apiUrl.loginUrl + "/webUser/findUserPermission",
          JSON.stringify({ userid: this.userid })
        )
        .then(res => {
          if (res.code !== 0) {
            that.checkbox.checkedCities = [];
            return this.$message.error(res.message);
          }else if(res.data.permission){
            that.checkbox.checkedCities = res.data.permission.split(',');
          }else{
            that.checkbox.checkedCities = [];
          }      
          console.log(that.checkbox.checkedCities);    
        })
        .catch(() => {});
    },

  handleCheckedCitiesChange(value) {
      console.log(value);
      /*console.log(this.$store.state.sideList)*/
      let that = this;
      let arr = value;
      let list = this.$store.state.sideList;
      let obj = this.$store.state.sidebarMenuList;
      for (var i = 0; i < arr.length; i++) {
        /*选中二级菜单时同时选择对应的一级菜单*/
        for (var j = 0; j < list.length; j++) {
          if (arr[i] == list[j].menuId) {
            if (list[j].menuAssociated != "0") {
              that.checkbox.checkedCities.push(list[j].menuAssociated);
            }
          }
        }
      }
      for (let i = 0; i < obj.length; i++) {
        /*取消所有二级菜单时同时取消对应的一级菜单*/
        let cs = obj[i].menuId;
        for (let j = 0; j < arr.length; j++) {
          for (let k = 0; k < obj[i].children.length; k++) {
            if (obj[i].children[k].menuId == arr[j]) {
              cs = "";
            }
          }
        }
        let index = that.checkbox.checkedCities.indexOf(cs);
        if (index > -1) {
          that.checkbox.checkedCities.splice(index, 1);
        }
      }
      that.checkbox.checkedCities = Array.from(
        new Set(that.checkbox.checkedCities)
      );
      console.log(that.checkbox.checkedCities);
    },

    allClick (id) {
      console.log(this.$store.state.sidebarMenuList)
      console.log(id);
      let that = this;
      let cs = that.checkbox.checkedCities.indexOf(id);
      console.log(cs)
      let pa;
      for (let i = 0; i < that.$store.state.sidebarMenuList.length; i++) {
        if (that.$store.state.sidebarMenuList[i].menuId == id) {
          pa = that.$store.state.sidebarMenuList[i];
        }
      }
      console.log(pa);
      if (cs > -1) {
        for (let i = 0; i < pa.children.length; i++) {
          that.checkbox.checkedCities.push(pa.children[i].menuId);
          console.log(pa.children[i].menuId)
        }
      } else {
        for (let i = 0; i < pa.children.length; i++) {
          let index = that.checkbox.checkedCities.indexOf(pa.children[i].menuId);
          if (index > -1) {
            that.checkbox.checkedCities.splice(index, 1);
          }
        }
      }
      console.log(that.checkbox.checkedCities)
    },

    // 表单提交
    dataFormSubmitHandle: debounce(
      function() {
        this.checkbox.checkedCities.sort(function (a, b) {
          return a - b;
        })
        this.checkbox.checkedCities.unshift("1");
        console.log(this.checkbox.checkedCities.join(','))
        let data = {
          userid: this.userid,
          permissions: this.checkbox.checkedCities.join(',')
        };
        let url = "/webUser/update";
        console.log(data);
        this.$http
          .post(this.$apiUrl.loginUrl + url, JSON.stringify(data))
          .then(res => {
            if (res.code !== 0) {
              return this.$message.error(res.message);
            }
            this.$message({
              message: this.$t("prompt.success"),
              type: "success",
              duration: 500,
              onClose: () => {
                this.visible = false;
                this.$emit("refreshDataList");
              }
            });
          })
          .catch(() => {});
      },
      1000,
      { leading: true, trailing: false }
    )
  }
};
</script>
<style scoped="scoped">
  .checkboxMarginTop{
    margin-top: 15px;
  }
  .checkboxMarginLeft{
    margin-left: 24px;
  }
</style>