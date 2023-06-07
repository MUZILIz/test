<template>
   <div class="box">

    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="105px" :model="formLabelAlign">
    <el-form-item label="账号">
        <el-input v-model="formLabelAlign.account"></el-input>
    </el-form-item>
    <el-form-item label="密码">
        <el-input v-model="formLabelAlign.pass"></el-input>
    </el-form-item>
      <el-button  @click="Turnregister" :style="button1">注册</el-button>
      <el-button type="primary" @click="Login" :style="button2">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'MyLogin',
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          account: '',
          pass: '',
        },
        button1:{
            transform: 'translateX(200px)',
        },
        button2:{
            transform: 'translateX(220px)',
        }
      };
    },
    mounted(){
      this.GetLongId();
    },
    methods:{
        GetLongId:function(){
          this.formLabelAlign.account=localStorage.getItem("LoginId")
        },
        Login:function(){
           let postData={
            UserId:this.formLabelAlign.account,
            PassWord:this.formLabelAlign.pass,
           }
           let url = 'http://localhost:8080/ssm/User/Login';
           axios.get(url,{params:postData},).then(rs => {
                    console.log(rs.data);
                    this.$message({
                      message: rs.data,
                      type:rs.data=='验证成功'?'success' : 'error' 
                    })
                    if(rs.data=="验证成功"){
                      this.$router.push('/')
                      localStorage.setItem('userId',postData.UserId);
                    }else if(rs.data=="禁用"){
                      console.log(rs.data)
                    }
                }).catch(error => {
                    console.log(error.data);
                    this.$message.error({
                      message: error.data,
                    })
                    //this.$router.push('/login')
                })
        },
        Turnregister:function(){
            this.$router.push('/register')
        },
        Turnindex:function(){
            this.$router.push('/')
        },
    }
  
}
</script>

<style>

</style>