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
       <el-button type="primary" @click="Turnindex" :style="button2">管理员登录</el-button>
     </el-form>
   </div>
 </template>
 
 <script>
 import axios from 'axios'
 export default {
     name:'MyLogin2',
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
     methods:{
         Turnindex:function(){
          let postData={
            AdminId:this.formLabelAlign.account,
            AdminPassWord:this.formLabelAlign.pass,
           }
           let url = 'http://localhost:8080/ssm/Admin/Login';
           axios.get(url,{params:postData},).then(rs => {
                    console.log(rs.data);
                    this.$message({
                      message: rs.data,
                      type:rs.data=="1"||rs.data=="2"||rs.data=="3"?'success' : 'error' 
                    })
                    if(rs.data=="1"||rs.data=="2"||rs.data=="3"){
                      this.$router.push('/administrators')
                      localStorage.setItem('adminId',postData.AdminId);
                      localStorage.setItem('Leve',rs.data);
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
     }
   
 }
 </script>
 
 <style>
 
 </style>