const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages()
module.exports = {
    configureWebpack: {
        plugins: [
            new tfPages.webpack.DefinePlugin({
                ROUTES: JSON.stringify(tfPages.routes)
            })
        ]
    },
    publicPath: './',
    // devServer: {
    //     // host:'192.168.2.136',
    //     // port:'8080'
    //     host: 'localhost',
    //     port: 8080,
    //     proxy: {
    //         '/api': {
    //             target: 'http://www.btom.cn:8080', //线上地址
    //             changeOrigin: true, //改变源
    //             pathRewrite: {
    //                 '^/api': '/api' //路径重写
    //             }
    //         }
    //     }
    // },
}

