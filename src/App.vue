<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    
    <div class="tmpl">
        <router-view></router-view>
    </div>
</template>

<script>

// es5 写法：
// module.exports={
//     data:function(){
//         return {
                // name:'heima'
//         }
//     },
//     methods:{
        
//     }
// }

// es6的export default{ 写法等同于 module.exports={
export default{
    // es6的写法 data() 等同于es5的 data:function()
    data(){
        return{
            name:'heima'
        }
    },methods:{

    }
}

</script>

<style>
     .tmpl{
         color:red;
     }
</style>