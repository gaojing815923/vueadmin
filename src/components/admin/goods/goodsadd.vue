<template>
<div class="tmpl">
      <el-row>
        <el-col>
            <div class="topbg top-right top-nav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }"><a href="javascript:void(0)">知识内容</a></el-breadcrumb-item>
                    <el-breadcrumb-item><a href="javascript:void(0)">首页</a></el-breadcrumb-item>
                    <el-breadcrumb-item><a href="javascript:void(0)">添加数据</a></el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-col>

      </el-row>
    
    <el-row>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm top-right">
          <el-row>  
             <el-col :span="10">
               <el-form-item label="内容标题" prop="title">
                   <el-input v-model="form.title"></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="10">
                <el-form-item label="副标题" prop="sub_title">
                   <el-input v-model="form.sub_title"></el-input>
               </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="所属类别" prop="category_id">
                   <el-select v-model="form.category_id" placeholder="请选择">
                     <el-option v-for="(cate,index) in categorylist" :key="index" :label="cate.title" :value="cate.category_id">
                                <span v-for="count in (cate.class_layer-1)">&nbsp;</span>
                                <span v-if="cate.class_layer>1">|-</span>
                                <span v-text="cate.title"></span>
                     </el-option>
                   </el-select>
                 </el-form-item>
            </el-col>
            <el-col :span="5" :offset="2">
                <el-form-item label="是否发布">
                  <el-switch on-text="发布" off-text="发布" v-model="form.status"></el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="推荐类型">
                
                  <el-switch on-text="轮播图" off-text="轮播图" v-model="form.is_slide" :width="75"></el-switch>
                
                  <el-switch on-text="置顶" off-text="置顶" v-model="form.is_top"></el-switch>
                
                  <el-switch on-text="推荐" off-text="推荐" v-model="form.is_hot"></el-switch>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="上传封面">
                   <el-upload class="upload-demo" action="http://157.122.54.189:9095/admin/article/uploadimg"  :file-list="form.imgList"  list-type="picture" :on-success="imgUploaded">
                     <el-button size="small" type="primary">点击上传</el-button>
                       <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
                   </el-upload>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="图片相册">
                    <el-upload class="upload-demo" action="http://157.122.54.189:9095/admin/article/uploadfile" :file-list="form.fileList" list-type="picture" :on-success="fileUploaded">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
                    </el-upload>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <el-form-item label="商品货号" prop="goods_no">
                  <el-input v-model="form.goods_no"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="库存数量" prop="stock_quantity">
                  <el-input v-model="form.stock_quantity"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="市场价格" prop="market_price">
                  <el-input v-model="form.market_price"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="销售价格" prop="sell_price">
                  <el-input v-model="form.sell_price"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <el-form-item label="内容摘要" prop="zhaiyao">
                  <el-input type="textarea" v-model="form.zhaiyao"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <el-form-item label="详细内容" prop="content">
                  <quill-editor v-model="form.content" class="ql-container "></quill-editor>
                </el-form-item>
            </el-col>
        </el-row>
  <el-row>
      <el-col>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" >立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
      </el-col>
  </el-row>
</el-form>
    </el-row>

</div>
</template>

<script>
    import {
        quillEditor
    } from 'vue-quill-editor';
    export default {
        components: {
            quillEditor
        },
        data() {
            var checkNumber = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空！'));
                }
                if (isNaN(value)) {
                    return callback(new Error('输入的值必须是数字'));
                } else {
                    callback();
                }
            };
            return {
                //商品的分类数组
                categorylist: [],
                form: {
                    title: "",
                    sub_title: "",
                    //轮播图的默认状态
                    is_slide: false,
                    //推荐的默认状态
                    is_hot: true,
                    //是否置顶的默认状态
                    is_top: true,
                    //是否发布的状态
                    status: true,
                    content: '',
                    zhaiyao: '',
                    //商品类别
                    category_id: '',
                    //商品货号
                    goods_no: '',
                    //库存数量
                    stock_quantity: 0,
                    //市场价格
                    market_price: 0,
                    //销售价格
                    sell_price: 0,
                    // 商品封面图片数据对象
                    imgList: [],
                    //商品相册图片数组
                    fileList: []



                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                    goods_no: [{
                        required: true,
                        message: '请输入商品编号',
                        trigger: 'blur'
                    }],
                    // category_id: {
                    //     required: true,
                    //     message: '请选择商品分类',
                    //     trigger: 'blur'
                    // },
                    zhaiyao: [{
                        required: true,
                        message: '请输入摘要',
                        trigger: 'blur'
                    }],
                    content: [{
                        required: true,
                        message: '请输入商品详细信息',
                        trigger: 'blur'
                    }],
                    stock_quantity: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    market_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    sell_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            this.getCatelist();
        },
        methods: {
            // 商品有多个相册图片
            fileUploaded(response, file, fileList) {
                this.form.fileList.push(response);
            },
            // 当封面图片上传完毕以后的回调函数
            imgUploaded(response, file, fileList) {
                // 将服务器响应回来的数据对象增加到 form.imgList数组中即可
                this.form.imgList = [response]; // 单张封面图片

            },
            getCatelist() {
                this.$http.get('/admin/category/getlist/goods')
                    .then(res => {
                        this.categorylist = res.data.message;
                    });
            },
            // 重置表单元素
            resetForm(formref) {
                this.$refs[formref].resetFields();
            },
            // 用来提交表单元素到服务器api接口的
            submitForm(formref) {
                // 验证当前表单元素是否符合规则
                this.$refs[formref].validate((valid) => {
                    // 如果表单的所有元素值均合法，valid则返回true
                    if (valid) {
                        // ajax提交数据进行新增操作
                        this.$http.post('/admin/goods/add/goods', this.form)
                            .then(res => {
                                if (res.data.status == 1) {
                                    this.$message.error(res.data.message);
                                    return;
                                }

                                // 数据新增成功以后跳转到商品列表页面
                                // 利用vue-router的编程式导航实现页面的跳转
                                this.$router.push({
                                    name: 'goodslist'
                                });
                            });
                        // console.log(this.form);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>

</style>