<template>
		<aside :class="['aui-sidebar', `aui-sidebar--${$store.state.sidebarLayoutSkin}`]">
                <!-- <el-radio-group>
                    <span class="guide-nav-angle" @click="$store.state.sidebarFold = !$store.state.sidebarFold">
                        <img class="guide-nav-angle-icon" src="~@/assets/img/nav.png" alt="">
                    </span>
                </el-radio-group> -->
                <el-menu class="aui-navbar__menu mr-auto left-top" mode="horizontal">
                    <el-menu-item index="1" @click="$store.state.sidebarFold = !$store.state.sidebarFold">
                            <svg
                                            class="icon-svg aui-navbar__icon-menu aui-navbar__icon-menu--switch"
                                            aria-hidden="true"
                            >
                                    <use xlink:href="#icon-outdent"/>
                            </svg>
                    </el-menu-item>
                </el-menu>
				<div class="aui-sidebar__inner">
						<el-menu
										:default-active="$store.state.sidebarMenuActiveName"
										:collapse="$store.state.sidebarFold"
										:unique-opened="true"
										:collapseTransition="false"
										class="aui-sidebar__menu">
								<sub-menu v-for="menu in $store.state.sidebarMenuList" :key="menu.menuId" :menu="menu"/>
						</el-menu>
				</div>
		</aside>
</template>

<script>
    import SubMenu from './main-sidebar-sub-menu'

    export default {
        data() {
            return {
                
            }
        },
        components: {
            SubMenu
        },
        created() {
            this.$store.state.sidebarMenuList = window.SITE_CONFIG['menuList'];
            this.$store.state.sideList = window.SITE_CONFIG['sideList'];
        }
    }
</script>
<style>
.aui-sidebar--dark{
    background-color: #252a2f!important;
}
.aui-sidebar--dark .aui-sidebar__menu, .aui-sidebar--dark > .el-menu--popup{
    background-color: #252a2f!important;
}
.aui-sidebar--dark .aui-sidebar__menu .el-menu, .aui-sidebar--dark .aui-sidebar__menu .el-submenu.is-opened, .aui-sidebar--dark > .el-menu--popup .el-menu, .aui-sidebar--dark > .el-menu--popup .el-submenu.is-opened{
    background-color: #252a2f!important;
}
.aui-sidebar--dark .aui-sidebar__menu .el-menu-item.is-active, .aui-sidebar--dark .aui-sidebar__menu .el-submenu.is-active > .el-submenu__title, .aui-sidebar--dark > .el-menu--popup .el-menu-item.is-active, .aui-sidebar--dark > .el-menu--popup .el-submenu.is-active > .el-submenu__title{
    color: #00a2ca!important;
}
.aui-sidebar--dark .aui-sidebar__menu .el-menu-item, .aui-sidebar--dark .aui-sidebar__menu .el-submenu > .el-submenu__title, .aui-sidebar--dark > .el-menu--popup .el-menu-item, .aui-sidebar--dark > .el-menu--popup .el-submenu > .el-submenu__title{
    color: #fff!important;
}
.el-submenu__title i{
    color: #fff!important;
}
.left-top{
    width: 100%;
}
.left-top .el-menu-item{
    width: 100%;
    height: 32px;
    display: block;
    text-align: center;
    background: #3f4e61;
    line-height: 32px;
    cursor: pointer;
}
.aui-navbar__menu .el-menu-item .aui-navbar__icon-menu{
  color:#fff;
}
/* .aui-navbar__menu .el-menu-item.is-active,.aui-navbar--colorful .aui-navbar__menu .el-menu-item svg{
    color:#fff;
} */
/* .el-radio-group{
    width: 100%;
} */
/* .guide-nav-angle {
  height: 32px;
  display: block;
  text-align: center;
  background: #3f4e61;
  line-height: 32px;
  cursor: pointer;
}
.guide-nav-angle-icon {
  font-size: 22px;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
} */
</style>
