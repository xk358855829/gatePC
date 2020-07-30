<template>
		<transition name="el-fade-in-linear">
				<router-view v-if="isRouterAlive"/>
		</transition>
</template>

<script>
    import Cookies from 'js-cookie'
    import {messages} from '@/i18n'
    import {clearLoginInfo} from "./utils";

    export default {
        provide() {
            return {
                reload: this.reload
            }
        },

        data() {
            return {
                isRouterAlive: true,
            }
        },

        watch: {
            '$i18n.locale': 'i18nHandle'
        },

        created() {
            this.i18nHandle(this.$i18n.locale);
            this.isTimeOut();
        },

        methods: {
            i18nHandle(val, oldVal) {
                Cookies.set('language', val)
                document.querySelector('html').setAttribute('lang', val)
                document.title = messages[val].brand.lg
                // 非登录页面，切换语言刷新页面
                if (this.$route.name !== 'login' && oldVal) {
                    window.location.reload()
                }
            },

            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true
                });
            },

            // 节流throttle代码（时间戳+定时器）
            throttle(fn, wait) {
                var timer = null;
                var startTime = Date.now();
                return function () {
                    var curTime = Date.now();
                    var remaining = wait - (curTime - startTime);
                    var context = this;
                    var args = arguments;
                    clearTimeout(timer);
                    if (remaining <= 0) {
                        fn.apply(context, args);
                        startTime = Date.now();
                    } else {
                        timer = setTimeout(fn, remaining);
                    }
                }
            },

            handle() {
                clearInterval(this.timeOut);
                if (this.$route.path == '/login') {
                    return
                }
                this.timeOut = setInterval(() => {
                    clearLoginInfo();
                    this.$message.success('您已长时间未操作，请重新登录');
                    this.$router.push({name: 'login'})
                }, 1000 * 60 * 1 * 60 * 12)
            },

            isTimeOut() {
                document.body.onmouseup = this.throttle(this.handle, 1000);
                document.body.onmousemove = this.throttle(this.handle, 1000);
                document.body.onkeyup = this.throttle(this.handle, 1000);
                document.body.onclick = this.throttle(this.handle, 1000);
                document.body.ontouchend = this.throttle(this.handle, 1000);
                window.addEventListener('resize', this.throttle(this.handle, 1000));
                window.addEventListener('scroll', this.throttle(this.handle, 1000));
            },
        },

        beforeRouteLeave(to, from, next) {
            this.$destroy();
            next();
        }
    }
</script>
