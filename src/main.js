import Vue from 'vue'
import Element from 'element-ui'
import App from '@/App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import '@/icons'
import 'element-ui/lib/theme-chalk/index.css'
import '@/element-ui/theme/index.css'
import '@/assets/scss/aui.scss'
import http from '@/utils/request'
import axios from 'axios'
import { getUUID, hasPermission, dateFormatter } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import Tooltip from 'hsy-vue-tooltip'
import echarts from 'echarts'
import apiUrl from '@/config/baseUrl.js'

Vue.config.productionTip = false

Vue.use(Tooltip)
Vue.use(Element, {
    size: 'default',
    i18n: (key, value) => i18n.t(key, value)
})

// 挂载全局
Vue.prototype.$http = http
Vue.prototype.$hasPermission = hasPermission
Vue.prototype.$getUUID = getUUID
Vue.prototype.$dateFormatter = dateFormatter
Vue.prototype.$echarts = echarts
Vue.prototype.$apiUrl = apiUrl


// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
