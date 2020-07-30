<template>        
		<el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.menuId" :popper-append-to-body="false">
				<template slot="title">
						<!-- <svg class="icon-svg aui-sidebar__menu-icon" aria-hidden="true">
								<use :xlink:href="`#${menu.menuAddress}`"></use>
						</svg> -->
            <i class="icon"><img class="iconimg" :src="require(`../assets/img/icon/${menu.menuAddress}`)" alt=""></i>
						<span>{{ menu.menuName }}</span>
				</template>
				<sub-menu v-for="item in menu.children" :key="item.menuId" :menu="item"></sub-menu>
		</el-submenu>
		<el-menu-item v-else :index="menu.menuId" :hidden="menu.hidden" @click="gotoRouteHandle(menu.menuId)">
				<!-- <svg class="icon-svg aui-sidebar__menu-icon" aria-hidden="true">
						<use :xlink:href="`#${menu.menuAddress}`"></use>
				</svg> -->
        <i class="icon"><img class="iconimg" :src="require(`../assets/img/icon/${menu.menuAddress}`)" alt=""></i>
				<span>{{ menu.menuName }}</span>
		</el-menu-item>
		<!-- <el-menu-item index="3" >支持与服务</el-menu-item>
		<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">工单</a></el-menu-item>
		<el-menu-item index="5"><a href="https://www.ele.me" target="_blank">费用</a></el-menu-item>
		<el-menu-item index="6"><a href="https://www.ele.me" target="_blank">消息</a></el-menu-item> -->
</template>

<script>
    import SubMenu from './main-sidebar-sub-menu'

    export default {
        name: 'sub-menu',
        props: {
            menu: {
                type: Object,
                required: true
            }
        },
        components: {
            SubMenu
        },
        methods: {
            // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
            gotoRouteHandle(menuId) {
              console.log(menuId);
              console.log(window.SITE_CONFIG['dynamicMenuRoutes'])
                var route = window.SITE_CONFIG['dynamicMenuRoutes'].filter(item => item.meta.menuId === menuId)[0]
                if (route) {
                    this.$router.push({name: route.name})
                }
            }
        }
    }
</script>
<style scope="scoped">
  .icon{
    display: inline-block;
    width: 18px;
    vertical-align: middle;
    margin-right: 10px;
    color: #fff !important;
  }
  .iconimg{
    width: 18px;
    height: 18px;
  }
</style>