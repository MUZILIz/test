<template>
  <div class="box">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="account">
      <el-input v-model.number="ruleForm.account"></el-input>
    </el-form-item>  
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="Gister()" :style="button1">注册</el-button>
      <!-- submitForm('ruleForm') -->
      <el-button @click="back" :style="button2">返回</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'MyRegister',
    data() {
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          account: ''
        },
        button1:{
            transform: 'translateX(100px)',
        },
        button2:{
            transform: 'translateX(120px)',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          account: [
            { validator: checkAccount, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      Gister:function(/*ruleForm*/){
          //console.log("注册函数")
          let url = 'http://localhost:8080/ssm/User/Register'
          let User= {
            userName:this.ruleForm.account,
            userPassword:this.ruleForm.pass
          }
          axios.post(url,User,{headers:{"Content-Type":"application/json"}}).then(rs=>{
              console.log(rs.data);
              this.$message.success({
              message: "注册成功", 
              })
              localStorage.setItem("LoginId",rs.data[0])
              this.$router.push('/login')
            }).catch(error => {
                    console.log('你不要过来呀')
                    console.log(error.data);
                    // this.$message.error({
                    //   message: error.data,
                    // })
                    //this.$router.push('/login')
                })
        },
      back:function(){
        this.$router.push('/login')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('注册成功!');
            this.$options.methods.Gister(this.ruleForm);
            console.log('submitForm Funcgtion')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
  .box {
    margin: 50px auto;
    width: 500px;
    height: 500px;
    transform: translate(-50px,150px);
  }
</style>