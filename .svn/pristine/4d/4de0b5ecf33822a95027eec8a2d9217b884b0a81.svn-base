<template>
  <div
    v-loading.fullscreen.lock="loading"
    :element-loading-text="$t('loading')"
    :class="['aui-wrapper', { 'aui-sidebar--fold': $store.state.sidebarFold }]"
  >
    <template v-if="!loading">
      <main-navbar />
      <main-sidebar />
      <div class="aui-content__wrapper">
        <main-content v-if="!$store.state.contentIsNeedRefresh" />
      </div>
      <!--<main-theme-tools/>-->
    </template>
  </div>
</template>

<script>
import MainNavbar from "./main-navbar";
import MainSidebar from "./main-sidebar";
import MainContent from "./main-content";
// import MainThemeTools from './main-theme-tools'
import debounce from "lodash/debounce";

export default {
  provide() {
    return {
      // 刷新
      refresh() {
        this.$store.state.contentIsNeedRefresh = true;
        this.$nextTick(() => {
          this.$store.state.contentIsNeedRefresh = false;
        });
      }
    };
  },
  data() {
    return {
      loading: true
    };
  },
  components: {
    MainNavbar,
    MainSidebar,
    MainContent
    // MainThemeTools
  },
  watch: {
    $route: "routeHandle"
  },
  created() {
    this.windowResizeHandle();
    this.routeHandle(this.$route);
    // Promise.all([this.getUserInfo(), this.getPermissions()]).then(() => {
      this.loading = false;
    // });
  },
  mounted() {
    this.beforeUnload();
  },
  methods: {
    // 窗口改变大小
    windowResizeHandle() {
      this.$store.state.sidebarFold =
        document.documentElement["clientWidth"] <= 992 || false;
      window.addEventListener(
        "resize",
        debounce(() => {
          this.$store.state.sidebarFold =
            document.documentElement["clientWidth"] <= 992 || false;
        }, 150)
      );
    },
    // 路由, 监听
    routeHandle(route) {
      if (!route.meta.isTab) {
        return false;
      }
      var tab = this.$store.state.contentTabs.filter(
        item => item.name === route.name
      )[0];
      console.log(tab);
      if (!tab) {
        tab = {
          ...window.SITE_CONFIG["contentTabDefault"],
          ...route.meta,
          name: route.name,
          params: { ...route.params },
          query: { ...route.query }
        };
        this.$store.state.contentTabs = this.$store.state.contentTabs.concat(
          tab
        );
      }
      this.$store.state.sidebarMenuActiveName =
        tab.menuId || "1";
      this.$store.state.contentTabsActiveName = tab.name;
    },
    // 获取当前管理员信息
    // getUserInfo() {
    //   return this.$http
    //     .get(this.$apiUrl.apiUrl + "/sys/user/info")
    //     .then(({ data: res }) => {
    //       if (res.code !== 0) {
    //         return this.$message.error(res.msg);
    //       }
    //       this.$store.state.user.id = res.data.creator;
    //       this.$store.state.user.name = res.data.username;
    //       this.$store.state.user.superAdmin = res.data.superAdmin;
    //     })
    //     .catch(() => {});
    // },
    // 获取权限
    // getPermissions() {
    //   return this.$http
    //     .get(this.$apiUrl.apiUrl + "/sys/menu/permissions")
    //     .then(({ data: res }) => {
    //       if (res.code !== 0) {
    //         return this.$message.error(res.msg);
    //       }
    //       window.SITE_CONFIG["permissions"] = res.data;
    //     })
    //     .catch(() => {});
    // }
    beforeUnload() {
      // 监听页面刷新
      window.addEventListener("beforeunload", () => {
        // visitedViews数据结构太复杂无法直接JSON.stringify处理，先转换需要的数据        
        sessionStorage.setItem("tabViews", JSON.stringify(this.$store.state.contentTabs));
      });
      // 页面初始化加载判断缓存中是否有数据
      let oldViews = JSON.parse(sessionStorage.getItem("tabViews")) || [];
      if (oldViews.length > 0) {
        this.$store.state.contentTabs = oldViews;
      }
    },
  }
};
</script>
<style>
  .aui-content__wrapper{
    background-color: #fff;
  }
  .el-card{
    border: none;
  }
  .mod-message__mail-template{
    padding-bottom: 92px;
    position: relative;
  }
  .pagefooter {
    padding: 10px 0 30px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    z-index: 99;
    width: 100%;
  }
  .aui-wrapper .el-pagination{
    text-align: left;
  }
  .el-card__body{
    padding: 5px;
  }
  .el-tag{
    color: #fff;
    border: none;
    min-width: 70px;
    padding: 0 5px;
    height: 30px;
  }
  .el-dialog{
    min-width: 750px;
  }
  .icon-delete {
  cursor: pointer;
  padding: 4px;
  background-color: #c9521e;
  color: #ffffff;
  border-radius: 3px;
}
.icon-unclick {
  cursor: pointer;
  padding: 4px;
  background-color: #777777;
  color: #ffffff;
  border-radius: 3px;
}
.icon-change {
  cursor: pointer;
  padding: 4px;
  background-color: #f8c541;
  color: #ffffff;
  border-radius: 3px;
}
.icon-setup {
  cursor: pointer;
  padding: 4px;
  background-color: #3a8ee6;
  color: #ffffff;
  border-radius: 3px;
}
.icon-export {
  cursor: pointer;
  padding: 4px;
  background-color: #de9e32;
  color: #ffffff;
  border-radius: 3px;
}
.icon-See {
  cursor: pointer;
  padding: 4px;
  background-color: #5daf34;
  color: #ffffff;
  border-radius: 3px;
}
.icon-menu {
  cursor: pointer;
  padding: 4px;
  background-color: #67c23a;
  color: #ffffff;
  border-radius: 3px;
}
.item-icon {
  margin: 0 2px;
}
</style>