<template>
<div class="tmpl">
    <div>
      <el-row>
        <el-col>
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="uname">
              <el-input v-model="form.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="upwd">
              <el-input v-model="form.upwd"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="login('ruleForm')" >登录</el-button>
          </el-form-item>
        </el-form>  
        </el-col>
      </el-row>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    uname: '',
                    upwd: ''
                },
                rules: {
                    uname: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    upwd: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                }
            }

        },
        methods: {
            login() {
                //验证当前表单元素是否符合验证规则
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        //登录的接口
                        this.$http.post('/admin/account/login', this.form)
                            .then(res => {
                                if (res.data.status == 1) {
                                    this.$message.error(res.data.message);
                                    return;
                                }
                                //跳转到layout页面
                                this.$router.push({
                                    name: 'layout'
                                });
                            });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>

</style>