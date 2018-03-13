//导入
import Vue from 'vue';
//导包  路由
import vueRouter from 'vue-router';
import App from './App.vue';


//将VueRouter和vue绑定起来
Vue.use(vueRouter);

//定义路由规则
//导入 login.vue组件对象
import login from './components/admin/account/login.vue';
//导入后台管理系统的整体布局组件
import layout from './components/admin/layout.vue';
//导入goodslist.vue
import goodslist from './components/admin/goods/goodslist.vue';
//导入goodsadd.vue
import goodsadd from './components/admin/goods/goodsadd.vue';
//导入goodsedit.vue
import goodsedit from './components/admin/goods/goodsedit.vue';
var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/admin' },
        { name: 'login', path: '/login', component: login },
        {
            name: 'layout',
            path: '/admin',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'goodsadd', path: 'goodsadd', component: goodsadd },
                { name: 'goodsedit', path: 'goodsedit/:id', component: goodsedit }
            ]
        }
    ]
});

//axios的使用
//导入axios的包
import axios from "axios";
//设定axios的基本url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095'
    //将axios对象挂载到vue原型$http上
Vue.prototype.$http = axios;

// 使用elementUI这个ui框架
//导包
import elementUI from "element-ui";
//导入elementui的css样式  默认样式
// import 'element-ui/lib/theme-default/index.css';
//自己写的css样式
import '../statics/theme_rms/index.css';
import '../statics/css/site.css';
//将elementUI和vue绑定起来
Vue.use(elementUI);
//过滤器
Vue.filter('datafat', (input, string) => {
    var date = new Date(input);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (string == "YYYY - MM - DD") {
        return year + "-" + month + "-" + day
    } else {
        return year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second;
    }
})

new Vue({
    el: '#app',
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}
    router,
    // es6的写法 :将app当做根组件替换index1.html这个模板中的<div id="app">
    render: create => create(App)
});