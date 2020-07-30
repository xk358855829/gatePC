import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/request'
import { isURL } from '@/utils/validate'
import apiUrl from '@/config/baseUrl.js'

// const routerPush = Router.prototype.push
Vue.use(Router)

// Router.prototype.push = function push(location) {
//     return routerPush.call(this, location).catch(err => err)
// }

// 页面路由(独立页面)
export const pageRoutes = [
    {
        path: '/404',
        component: () => import('@/views/pages/404'),
        name: '404',
        meta: { title: '404未找到' },
        beforeEnter(to, from, next) {
            // 拦截处理特殊业务场景
            // 如果, 重定向路由包含__双下划线, 为临时添加路由
            if (/__.*/.test(to.redirectedFrom)) {
                return next(to.redirectedFrom.replace(/__.*/, ''))
            }
            next()
        }
    },
    { path: '/login', component: () => import('@/views/pages/login'), name: 'login', meta: { title: '登录' } },
]

// 模块路由(基于主入口布局页面)
export const moduleRoutes = {
         path: "/",
         component: () => import("@/views/main"),
         name: "main",
         redirect: { name: "home" },
         meta: { title: "主入口布局" },
         children: [
           {
             path: "/home",
             component: () => import("@/views/modules/runmonitor/home"),
             name: "home",
             meta: { title: "首页", isTab: true, menuId: "1" }
           },
           {
             path: "/usersList",
             component: () => import("@/views/modules/account/roleList"),
             name: "usersList",
             meta: { title: "账户列表", isTab: true, menuId: "4" }
           },
           {
             path: "/deviceList",
             component: () => import("@/views/modules/device/deviceList"),
             name: "deviceList",
             meta: { title: "设备列表", isTab: true, menuId: "5" }
           },
           {
             path: "/deviceBind",
             component: () => import("@/views/modules/device/deviceBind"),
             name: "deviceBind",
             meta: { title: "设备绑定列表", isTab: true, menuId: "6" }
           },
           {
             path: "/deviceRecord",
             component: () => import("@/views/modules/device/deviceRecord"),
             name: "deviceRecord",
             meta: { title: "设备记录", isTab: true, menuId: "7" }
           },
           {
             path: "/alarmInfo",
             component: () => import("@/views/modules/device/alarmInfo"),
             name: "alarmInfo",
             meta: { title: "报警信息", isTab: true, menuId: "8" }
           },
          //  {
          //    path: "/partList",
          //    component: () => import("@/views/modules/parkingLot/partList"),
          //    name: "partList",
          //    meta: { title: "道闸列表", isTab: true, menuId: "49" }
          //  },
          //  {
          //    path: "/zfb",
          //    component: () => import("@/views/modules/parkingLot/zfb"),
          //    name: "zfb",
          //    meta: { title: "停车场列表", isTab: true, menuId: "56" }
          //  },
          //  {
          //    path: "/preferential",
          //    component: () => import("@/views/modules/parkingLot/preferential"),
          //    name: "preferential",
          //    meta: { title: "优惠方案", isTab: true, menuId: "71" }
          //  },
          //  {
          //    path: "/electronic",
          //    component: () => import("@/views/modules/parkingLot/electronic"),
          //    name: "electronic",
          //    meta: { title: "电子卡券", isTab: true, menuId: "72" }
          //  },
          //  {
          //    path: "/parkDevic",
          //    component: () => import("@/views/modules/parkingLot/parkDevic"),
          //    name: "parkDevic",
          //    meta: { title: "车位锁列表", isTab: true, menuId: "76" }
          //  },
          //  {
          //    path: "/guide",
          //    component: () => import("@/views/modules/parkingLot/guide"),
          //    name: "guide",
          //    meta: { title: "车牌引导", isTab: true, menuId: "78" }
          //  },
          //  {
          //    path: "/mark",
          //    component: () => import("@/views/modules/parkingLot/mark"),
          //    name: "mark",
          //    meta: { title: "积分管理", isTab: true, menuId: "84" }
          //  },
          //  {
          //    path: "/configurauthority",
          //    component: () =>
          //      import("@/views/modules/parkingLot/configuration"),
          //    name: "configurauthority",
          //    meta: { title: "配置卡券", isTab: true, menuId: "100" }
          //  },
          //  {
          //    path: "/configuration",
          //    component: () =>
          //      import("@/views/modules/parkingLot/configurauthority"),
          //    name: "configuration",
          //    meta: { title: "配置卡券权限", isTab: false }
          //  }
         ]
       };

const router = new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: pageRoutes.concat(moduleRoutes)
})

router.beforeEach((to, from, next) => {
    // 添加动态(菜单)路由
    // 已添加或者当前路由为页面路由, 可直接访问
    if (window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] || fnCurrentRouteIsPageRoute(to, pageRoutes)) {
        return next()
    }
    // 获取菜单列表, 添加并全局变量保存
  http.post(apiUrl.loginUrl + '/webUser/findUserMenu', JSON.stringify({ userid: localStorage.getItem("userid")})).then((res) => {
        console.log(res);
        if (res.code == 0){
            let sideList = res.data;
              // activeName = [
              //   {
              //     menuId: "1",
              //     menuAssociated: "0",
              //     menuName: "首页",
              //     menuPagename: "home",
              //     menuLevel: 0,
              //     menuAddress: "home.png",
              //     permissions: "",
              //     menuSort: 0
              //   },
              //   {
              //     menuAddress: "users_mng.png",
              //     menuAssociated: "0",
              //     menuId: "2",
              //     menuLevel: "0",
              //     menuName: "用户管理",
              //     menuPagename: "usersMng",
              //     menuSort: "2",
              //     children: [
              //       {
              //         menuAddress: "users_list.png",
              //         menuAssociated: "2",
              //         menuId: "4",
              //         menuLevel: "1",
              //         menuName: "用户列表",
              //         menuPagename: "usersList",
              //         menuSort: "4",
              //       }
              //     ]
              //   },
              //   {
              //     menuAddress: "device_mng.png",
              //     menuAssociated: "0",
              //     menuId: "3",
              //     menuLevel: "0",
              //     menuName: "设备管理",
              //     menuPagename: "deviceMng",
              //     menuSort: "3",
              //     children: [
              //       {
              //         menuAddress: "device_list.png",
              //         menuAssociated: "3",
              //         menuId: "5",
              //         menuLevel: "1",
              //         menuName: "设备列表",
              //         menuPagename: "deviceList",
              //         menuSort: "5",
              //       },
              //       {
              //         menuAddress: "device_bind.png",
              //         menuAssociated: "3",
              //         menuId: "6",
              //         menuLevel: "1",
              //         menuName: "设备绑定列表",
              //         menuPagename: "deviceBind",
              //         menuSort: "6",
              //       },
              //       {
              //         menuAddress: "device_record.png",
              //         menuAssociated: "3",
              //         menuId: "7",
              //         menuLevel: "1",
              //         menuName: "设备记录",
              //         menuPagename: "deviceRecord",
              //         menuSort: "7",
              //       },
              //       {
              //         menuAddress: "alarm_info.png",
              //         menuAssociated: "3",
              //         menuId: "8",
              //         menuLevel: "1",
              //         menuName: "报警信息",
              //         menuPagename: "alarmInfo",
              //         menuSort: "8",
              //       }
              //     ]
              //   }
              // ];
          let length = sideList.length, arr = [], activeName = [];
            for (let i = 0; i < length; i++) {
              if (sideList[i].menuLevel == 0) {
                let obj = {};
                obj= sideList[i];
                obj.children = [];
                activeName.push(obj);
              } else {
                arr.push(sideList[i]);
              }
            }
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < activeName.length; j++) {
                if (arr[i].menuAssociated == activeName[j].menuId) {
                  activeName[j].children.push(arr[i]);
                }
              }
            }
            console.log(activeName);
            window.SITE_CONFIG["menuList"] = activeName;
            window.SITE_CONFIG["sideList"] = res.data;
            fnAddDynamicMenuRoutes(window.SITE_CONFIG["menuList"]);
            next({ ...to, replace: true });
        } else {
          Vue.prototype.$message.error(res.message);
          return next({ name: "login" });
        }       
        // let data = [
        //   {
        //     menuId: "1",
        //     menuAssociated: "0",
        //     menuName: "首页",
        //     menuPagename: "home",
        //     menuLevel: 0,
        //     menuAddress: "icon-home",
        //     permissions: "",
        //     menuSort: 0,
        //   },
        //   {
        //     id: "1147696471512657921",
        //     pid: "0",
        //     children: [
        //       {
        //         id: "1151022645658288130",
        //         pid: "1147696471512657921",
        //         children: [],
        //         name: "实时监控",
        //         url: "runmonitor/equipment-list",
        //         type: 0,
        //         icon: "icon-check-circle",
        //         permissions: "",
        //         sort: 0,
        //         createDate: "2019-07-16 14:55:58",
        //         parentName: "",
        //         hidden: false
        //       },
        //       {
        //         id: "1151022645658288131",
        //         pid: "1147696471512657921",
        //         children: [],
        //         name: "电站监测",
        //         url: "runmonitor/list-of-item",
        //         type: 0,
        //         icon: "icon-tags",
        //         permissions: "",
        //         sort: 0,
        //         createDate: "2019-07-16 14:55:58",
        //         parentName: "",
        //         hidden: false
        //       },
        //       {
        //         id: "1151022645658288133",
        //         pid: "1147696471512657921",
        //         children: [],
        //         name: "逆变器",
        //         url: "runmonitor/invdetail",
        //         type: 0,
        //         icon: "icon-tags",
        //         permissions: "",
        //         sort: 0,
        //         createDate: "2019-07-16 14:55:58",
        //         parentName: "",
        //         hidden: true
        //       },
        //       {
        //         id: "1151022645658288132",
        //         pid: "1147696471512657921",
        //         children: [],
        //         name: "设备监控",
        //         url: "runmonitor/history-query",
        //         type: 0,
        //         icon: "icon-apartment",
        //         permissions: "",
        //         sort: 0,
        //         createDate: "2019-07-16 14:55:58",
        //         parentName: "",
        //         hidden: false
        //       }
        //     ],
        //     name: "实时监控",
        //     url: "",
        //     type: 0,
        //     icon: "icon-sync",
        //     permissions: "",
        //     sort: 1,
        //     createDate: "2019-07-07 10:38:57",
        //     parentName: ""
        //   },
        //   {
        //     id: "1067246875800000002",
        //     pid: "0",
        //     children: [
        //       {
        //         id: "1067246875800000012",
        //         pid: "1067246875800000002",
        //         children: [
        //           {
        //             id: "1067246875800000080",
        //             pid: "1067246875800000012",
        //             children: [],
        //             name: "电站数据查询",
        //             url: "runmonitor/historical-alarm",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 0,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           },
        //           {
        //             id: "1067246875800000081",
        //             pid: "1067246875800000012",
        //             children: [],
        //             name: "逆变器数据查询",
        //             url: "sys/menu",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 1,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           },
        //           {
        //             id: "1067246875800000082",
        //             pid: "1067246875800000012",
        //             children: [],
        //             name: "汇流箱数据查询",
        //             url: "sys/params",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 2,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           },
        //           {
        //             id: "1067246875800000083",
        //             pid: "1067246875800000012",
        //             children: [],
        //             name: "直流柜数据查询",
        //             url: "sys/dict",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 3,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           },
        //           {
        //             id: "1067246875800000084",
        //             pid: "1067246875800000012",
        //             children: [],
        //             name: "交流柜数据查询",
        //             url: "job/schedule",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 4,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           },
        //           {
        //             id: "1067246875800000085",
        //             pid: "1067246875800000012",
        //             children: [],
        //             name: "气象站数据查询",
        //             url: "oss/oss",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 5,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           },
        //           {
        //             id: "1067246875800000086",
        //             pid: "1067246875800000012",
        //             children: [],
        //             name: "计量电表数据查询",
        //             url: "tprj/tprjinfo",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 6,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           },
        //           {
        //             id: "1067246875800000087",
        //             pid: "1067246875800000012",
        //             children: [],
        //             name: "升压站数据查询",
        //             url: "tgw/tgwinfo",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 7,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           }
        //         ],
        //         name: "历史数据查询",
        //         url: "",
        //         type: 0,
        //         icon: "icon-apartment",
        //         permissions: "",
        //         sort: 0,
        //         createDate: "2019-05-29 12:19:25",
        //         parentName: ""
        //       },
        //       {
        //         id: "1067246875800000007",
        //         pid: "1067246875800000002",
        //         children: [
        //           {
        //             id: "1067246875800000088",
        //             pid: "1067246875800000007",
        //             children: [],
        //             name: "综合运行报表查询",
        //             url: "sys/dept",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 0,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           },
        //           {
        //             id: "1067246875800000089",
        //             pid: "1067246875800000007",
        //             children: [],
        //             name: "综合运行报表对比",
        //             url: "sys/role",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 1,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           },
        //           {
        //             id: "1067246875800000090",
        //             pid: "1067246875800000007",
        //             children: [],
        //             name: "逆变器运行报表",
        //             url: "sys/user",
        //             type: 0,
        //             icon: "icon-team",
        //             permissions: "",
        //             sort: 2,
        //             createDate: "2019-05-29 12:19:25",
        //             parentName: "",
        //             hidden: false
        //           }
        //         ],
        //         name: "电站运行报表",
        //         url: "",
        //         type: 0,
        //         icon: "icon-team",
        //         permissions: "",
        //         sort: 1,
        //         createDate: "2019-05-29 12:19:25",
        //         parentName: ""
        //       }
        //     ],
        //     name: "运行报表",
        //     url: "",
        //     type: 0,
        //     icon: "icon-safetycertificate",
        //     permissions: "",
        //     sort: 2,
        //     createDate: "2019-05-29 12:19:25",
        //     parentName: ""
        //   },
        //   {
        //     id: "1067246875800000035",
        //     pid: "0",
        //     children: [
        //       {
        //         id: "1067246875800000025",
        //         pid: "1067246875800000035",
        //         children: [],
        //         name: "故障警告",
        //         url: "message/sms",
        //         type: 0,
        //         icon: "icon-unorderedlist",
        //         permissions: "",
        //         sort: 0,
        //         createDate: "2019-05-29 12:19:25",
        //         parentName: "",
        //         hidden: false
        //       }
        //     ],
        //     name: "故障警告",
        //     url: "",
        //     type: 0,
        //     icon: "icon-setting",
        //     permissions: "",
        //     sort: 3,
        //     createDate: "2019-05-29 12:19:25",
        //     parentName: ""
        //   },
        //   {
        //     id: "1067246875800000024",
        //     pid: "0",
        //     children: [
        //       {
        //         id: "1067246875800000021",
        //         pid: "1067246875800000024",
        //         children: [],
        //         name: "用户管理",
        //         url: "message/mail_template",
        //         type: 0,
        //         icon: "icon-user",
        //         permissions: "",
        //         sort: 0,
        //         createDate: "2019-05-29 12:19:25",
        //         parentName: "",
        //         hidden: false
        //       },
        //       {
        //         id: "1067246875800000022",
        //         pid: "1067246875800000024",
        //         children: [],
        //         name: "电站管理",
        //         url: "message/mail_log",
        //         type: 0,
        //         icon: "icon-boxplot",
        //         permissions: "",
        //         sort: 1,
        //         createDate: "2019-05-29 12:19:25",
        //         parentName: "",
        //         hidden: false
        //       },
        //       {
        //         id: "1067246875800000023",
        //         pid: "1067246875800000024",
        //         children: [],
        //         name: "采集器管理",
        //         url: "/upgrade/upgrade",
        //         type: 0,
        //         icon: "icon-robot",
        //         permissions: "",
        //         sort: 2,
        //         createDate: "2019-05-29 12:19:25",
        //         parentName: "",
        //         hidden: false
        //       },
        //       {
        //         id: "1067246875800000024",
        //         pid: "1067246875800000024",
        //         children: [],
        //         name: "设备管理",
        //         url: "/upgrade/tagtemplate",
        //         type: 0,
        //         icon: "icon-appstore",
        //         permissions: "",
        //         sort: 3,
        //         createDate: "2019-05-29 12:19:25",
        //         parentName: "",
        //         hidden: false
        //       }
        //     ],
        //     name: "基础配置",
        //     url: "",
        //     type: 0,
        //     icon: "icon-setting",
        //     permissions: "",
        //     sort: 4,
        //     createDate: "2019-05-29 12:19:25",
        //     parentName: ""
        //   }
        // ];
        // window.SITE_CONFIG['menuList'] = res.data       
    }).catch(() => {
        next({ name: 'login' })
    })
})

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});

/**
 * 判断当前路由是否为页面路由
 * @param {*} route 当前路由
 * @param {*} pageRoutes 页面路由
 */
function fnCurrentRouteIsPageRoute(route, pageRoutes = []) {
    var temp = []
    for (var i = 0; i < pageRoutes.length; i++) {
        if (route.path === pageRoutes[i].path) {
            return true
        }
        if (pageRoutes[i].children && pageRoutes[i].children.length >= 1) {
            temp = temp.concat(pageRoutes[i].children)
        }
    }
    return temp.length >= 1 ? fnCurrentRouteIsPageRoute(route, temp) : false
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
    var temp = []
    for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].children && menuList[i].children.length >= 1) {
            temp = temp.concat(menuList[i].children)
            continue
        }
        // 组装路由
        var route = {
            path: '',
            component: null,
            name: '',
            meta: {
                ...window.SITE_CONFIG['contentTabDefault'],
                menuId: menuList[i].menuId,
                title: menuList[i].menuName
            }
        }
        // eslint-disable-next-line
        let URL = (menuList[i].menuPagename || '').replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)) // URL支持{{ window.xxx }}占位符变量
        if (isURL(URL)) {
            route["path"] = route["name"] = `i-${menuList[i].menuId}`;
            route['meta']['iframeURL'] = URL
        } else {
            URL = URL.replace(/^\//, '').replace(/_/g, '-')
            route['path'] = route['name'] = URL.replace(/\//g, '-')
            route['component'] = () => import(`@/views/modules/${URL}`)
        }
        routes.push(route)
    }
    if (temp.length >= 1) {
        return fnAddDynamicMenuRoutes(temp, routes)
    }
    // 添加路由
    router.addRoutes([
        {
            ...moduleRoutes,
            name: 'main-dynamic-menu',
            children: routes
        },
        { path: '*', redirect: { name: '404' } }
    ])
    window.SITE_CONFIG['dynamicMenuRoutes'] = routes
    window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] = true
}

export default router
