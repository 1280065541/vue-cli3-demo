const THEME_CONFIG = require('./src/plugins/vant-theme-config')
// const DEV_SERVER = 'http://10.4.6.166:8080' //付旭辉
const DEV_SERVER = 'http://10.1.62.116:12671' //116测试服务器
const PATH = require('path')

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                PATH.resolve(__dirname, './src/style/variable.less') // 需要全局导入的less
            ]
        })
}

module.exports = {
    outputDir: 'ims-mngr-h5',
    publicPath: '/ims-mngr-h5',
    css: {
        loaderOptions: {
            less: {
                modifyVars: THEME_CONFIG
            }
        }
    },
    devServer: {
        open: false, //自动打开浏览器
        proxy: {
            '/H5_Test': {
                target: DEV_SERVER,
                changeOrigin: true,
                autoRewrite: true,
                cookieDomainRewrite: true
                // pathRewrite: {
                //     '^/H5_Test': ''
                // }
            }
        }
    },
    chainWebpack: config => {
        // config.module.rules.delete('eslint')  //关闭eslint错误警告提示

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type =>
            addStyleResource(config.module.rule('less').oneOf(type))
        )
        // ----性能分析插件
        // if(process.env.NODE_ENV === 'production'){
        //     config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        // }
    }
}
