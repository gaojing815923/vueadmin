var path = require('path');
// 这个包的作用就是在内存中自动生成一个index.html页面
var htmlwp = require("html-webpack-plugin");
//此配置文件在控制台上使用webpack的时候后面如果不加任何参数，则默认
//会查找webpack.config.js的配置文件去执行
module.exports = {
    //配置打包时的入口文件
    entry: './src/main.js', //表示打包的时候自动查找当前目录下面的src下面的main.js作为入口文件
    //配置打包时的生成文件
    output: {
        // path.join()  将多个路径拼接成一个路径，不管分隔符有几个均可以
        path: path.join(__dirname, '/dist/'),
        filename: 'build.js'
    },
    module: {
        loaders: [{
                //打包css样式
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                //打包less样式
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                //打包scss样式
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                //打包url   图片格式的样式
                test: /\.(jpg|gif|png|eot|svg|ttf|woff|woff2)$/,
                loader: ['url-loader?limit=10240']
            },
            {
                //打包vue   图片格式的样式
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            {
                //打包js   图片格式的样式
                test: /\.js$/,
                //负责将es6转换成es5
                loader: ['babel-loader'],
                // 排除node_modules下面的所有js文件
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlwp({
            filename: 'index.html',
            template: 'index.html'
        })
    ]
}