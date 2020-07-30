import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import gate from "./modules/gate";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./action";

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  actions,
  getters,
  mutations,
  state: {
    ids: "",
    exportIds: "",
    // 导航条, 布局风格, defalut(白色) / colorful(鲜艳)
    navbarLayoutType: "colorful",
    // 侧边栏, 布局皮肤, default(白色) / dark(黑色)
    sidebarLayoutSkin: "dark",
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    sidebarMenuList: [],
    sideList: "",
    sidebarMenuActiveName: "",
    // 内容, 是否需要刷新
    contentIsNeedRefresh: false,
    // 内容, 标签页(默认添加首页)
    contentTabs: [
      {
        ...window.SITE_CONFIG["contentTabDefault"],
        name: "home",
        title: "home"
      }
    ],
    contentTabsActiveName: "home",
    dataForm: "", //获取网关信息刷新
    gwLastUtime: "", //获取网关时间刷新
    parkingtotal: "", //停车场总数
    total: "", //车位总数
    apliyparkName: [],
    parkDevList: {
      list: [],
      count: 0
    },
    ONEreslist: [],
    gstylelast: [
      {
        value: "1",
        type: "居民小区"
      },
      {
        value: "2",
        type: "商圈停车场"
      },
      {
        value: "3",
        type: "路测停车"
      },
      {
        value: "4",
        type: "公园景点"
      },
      {
        value: "5",
        type: "商务楼宇"
      },
      {
        value: "6",
        type: "其他"
      },
      {
        value: "7",
        type: "交通枢纽"
      },
      {
        value: "8",
        type: "市政设施"
      }
    ],
    tickettype: [
      {
        value: "1",
        type: "电子券"
      },
      {
        value: "2",
        type: "纸券"
      }
    ],
    usage: [
      {
        value: 1,
        type: "免费时长"
      },
      {
        value: 2,
        type: "现金抵用券"
      },
      {
        value: 3,
        type: "满减券"
      },
      {
        value: 4,
        type: "折扣"
      }
    ],
    use_statuslist: [
      {
        value: "0",
        type: "已使用"
      },
      {
        value: "1",
        type: "未使用"
      },
      {
        value: "-1",
        type: "已失效"
      },
      {
        value: "2",
        type: "已发放"
      }
    ]
  },
  modules: {
    user,
    gate //道闸总数
  }
});
