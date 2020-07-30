/**
 * 配置参考: https://cli.vuejs.org/zh/config/
 */
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    // baseUrl:  process.env.NODE_ENV === 'production' ? './dingiiot-front/' : '/',
    assetsDir: '.',
    // 输出文件目录
    outputDir: 'dist',
    lintOnSave: false,//是否开启eslint保存检测,有效值: true || false || 'error'
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件
        config.plugins.delete('preload');
        // 压缩代码
        config.optimization.minimize(true);
        // 分割代码
        config.optimization.splitChunks({
            chunks: 'all'
        });
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
    },
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            "AMap": "AMap"
        }
    },
    // webpack-dev-server 相关配置
    devServer: {
        // host: "localhost",
        open: true,
        port: 8008,
        overlay: {
            errors: false,
            warnings: false
        }
    }
}
