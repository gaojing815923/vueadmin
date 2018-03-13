<template>
  <div class="tmpl">
       <el-row>
        <el-col>
            <div class="topbg top-right top-nav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }"><a href="javascript:void(0)">知识内容</a></el-breadcrumb-item>
                    <el-breadcrumb-item><a href="javascript:void(0)">首页</a></el-breadcrumb-item>
                    <el-breadcrumb-item><a href="javascript:void(0)">内容管理</a></el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-col>

    </el-row>
      <el-row>
            <div class="btn-border">  
               <el-col :span="5">
                  <div class="btn">
                         <router-link to="/admin/goodsadd">
                           <el-button  class="btn-size"><i class="el-icon-plus icon-img"></i>新增</el-button>
                         </router-link>
<el-button class="btn-size" @click="selectAll"><i class="el-icon-check icon-img"></i>全选</el-button>
<el-button class="btn-size" @click="deldata"><i class="el-icon-delete icon-img"></i>删除</el-button>
</div>
</el-col>
<el-col :span="3" :offset="16">
    <div class="btn">
        <el-input placeholder="请输入搜索内容" v-model="searchValue" icon="search" :on-icon-click="getlist" @keydown.13="searchtext"></el-input>
    </div>
</el-col>
</div>
</el-row>

<el-row>
    <el-col :span="24">
        <el-table ref="multipleTable" :data="list" height="400" border style="width: 100%"  @selection-change="getrows" rows>
            <el-table-column type="selection" width="55">
            </el-table-column>

            <!--<el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">-->
            <el-table-column prop="title" label="标题">
                <template scope="scope">
                              <router-link v-bind="{to:'./goodsedit/'+scope.row.id}">
                                 {{scope.row.title}}
                              </router-link>
                          </template>
<!--</el-tooltip>-->
</el-table-column>
<el-table-column prop="categoryname" label="所属类别" width="100">
</el-table-column>
<el-table-column prop="stock_quantity" label="库存" width="80">
</el-table-column>
<el-table-column prop="market_price" label="市场价" width="80">
</el-table-column>
<el-table-column prop="sell_price" label="销售价" width="80">
</el-table-column>
<el-table-column prop="sell_price" label="发布人/发布时间" width="220">
    <template scope="scope">
    {{scope.row.user_name}}/{{scope.row.add_time | datafat("YYYY - MM - DD")}}
    </template>
</el-table-column>
<el-table-column label="属性" width="180">
    <template scope="scope">
      <el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_slide==1?'进入轮播图':'不进轮播图')}"  placement="bottom">
    <i v-bind="{class:'el-icon-picture ls '+(scope.row.is_slide==1?'imgactive':'')}" ></i>
    </el-tooltip>
     <el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_top==1?'置顶':'不置顶')}" placement="bottom">
    <i v-bind="{class:'el-icon-upload ls '+(scope.row.is_top==1?'imgactive':'')}"></i>
    <!--<i class='el-icon-upload ls imgactive'></i>-->
    </el-tooltip>
     <el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_hot==1?'推荐':'不推荐')}" placement="bottom">
    <i v-bind="{class:'el-icon-star-on ls '+(scope.row.is_hot==1?'imgactive':'')}"></i>
    </el-tooltip>
    {{scope.row.is_slide}}/{{scope.row.is_top}}/{{scope.row.is_hot}}
  </template>
</el-table-column>
<el-table-column label="操作" width="100">
    <template scope="scope">
       <router-link v-bind="{to:'./goodsedit/'+scope.row.id}">
       <el-button class="success" size="min">编辑</el-button>
                        </router-link>
                     </template>
</el-table-column>
</el-table>
</el-col>
</el-row>
<el-row>
    <div class="btn-border page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10, 20, 50, 100,200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</el-row>
</div>
</template>

<script>
    export default {
        data() {
            return {
                ids: "",
                //轮播图的默认状态
                is_slide: 0,
                //推荐的默认状态
                is_hot: 1,
                //是否置顶的默认状态
                is_top: 0,
                //搜索框的默认值
                searchValue: "",
                //当前是多少页
                currentPage: 1,
                //每一页有多少条数据
                pageSize: 10,
                //当前表格中一共有多少条数据
                //全选和反选
                total: 1,

                list: []
            }
        },
        //获取数据列表
        created() {
            this.getlist();
        },
        methods: {
            // 全选和反选功能
            selectAll() {
                var rows = this.list;

                if (rows) {
                    // 遍历数据数组中的每个对象（代表一行）
                    rows.forEach(row => {
                        // 将当前行的checkbox勾选
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    // 将当前行的checkbox反选
                    this.$refs.multipleTable.clearSelection();
                }
            },
            // 删除商品数据的方法
            deldata() {
                if (this.ids.length <= 0) {
                    this.$message.error('请勾选你要删除的数据');
                    return;
                }

                this.$confirm('您确认要删除数据吗?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    // 执行删除逻辑请求
                    this.$http.get('/admin/goods/del/' + this.ids)
                        .then(res => {
                            // 判断服务器是否处理成功
                            if (res.data.status == 1) {
                                this.$message.error(res.data.message);
                                return;
                            }

                            // 如果服务器成功则数组列表
                            this.getlist();
                        });


                }).catch(() => {
                    // 如果用户点击取消，自动关闭对话框
                });
            },
            //单机某个页码的时候出发该事件
            handleCurrentChange(pageIndex) {
                this.currentPage = pageIndex
                this.getlist();
            },
            //当每页显示的数据条数发生变化的时候，页面上的内容也会发生变化的
            handleSizeChange(currentSize) {
                this.pageSize = currentSize;
                this.getlist();
            },
            //全选   复选框的方法
            getrows(rows) {
                this.ids = '';
                var splicchar = ',';
                for (var i = 0; i < rows.length; i++) {
                    if (i == rows.length - 1) {
                        splicchar = '';
                    }
                    this.ids += rows[i].id + splicchar;

                }

                console.log(this.ids);
            },
            //获取所有的数据
            getlist() {
                var url = '/admin/goods/getlist?pageIndex=' + this.currentPage + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue;
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.list = res.data.message;
                    this.total = res.data.totalcount;
                    // this.is_slide = res.data.is_slide;
                    // this.is_top = res.data.is_top;
                    // this.is_hot = res.data.is_hot;
                    // console.log(res.data.is_slide, res.data.is_top, res.data.is_hot)

                });
            },
            //筛选数据
            // searchtext() {
            //     console.log("**********************");
            //     var url = '/admin/goods/getlist?pageIndex=1&pageSize=10&searchvalue=' + this.searchValue;
            //     this.$http.get(url).then(res => {
            //         if (res.data.status == 1) {
            //             this.$message.error(res.data.message);
            //             return;
            //         }
            //         this.list = res.data.message;
            //         console.log(res.data.message);
            //     })
            // }
        }
    }
</script>
<style scoped>

</style>