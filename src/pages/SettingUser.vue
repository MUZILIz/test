<template>
  <div class="box2">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
       <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
       <el-input v-model="form.pass"></el-input>
      </el-form-item>
      <el-form-item label="电话">
       <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
       <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gendar">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input type="textarea" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'SettingUser',
    data() {
      return {
        form: {
          name: '',
          pass:'',
          gendar: '',
          address: '',
          phone:'',
          email:'',
        }
      }
    },
    mounted(){
      this.LoginA();
      this.GetUserInfo();
    },
    methods: {
      LoginA(){
          if(localStorage.getItem("adminId")==null){
            this.$message.success("请登录")
            this.$router.push('/login2')
          }
        },
      GetUserInfo:function(){
        let params = {
          userId:this.$route.params.userId
        }
        console.log(this.$route.params.userId);
        let url = 'http://localhost:8080/ssm/User/GetUserInfo';
           axios.get(url,{params:params},).then(rs => {
                    console.log(rs.data);
                    this.form.name=rs.data.userName
                    this.form.pass=rs.data.userPassword 
                    if(rs.data.userGender){
                      this.form.gendar='男' 
                    }else{
                      this.form.gendar='女' 
                    }
                    
                    this.form.address=rs.data.userAddress 
                    this.form.phone=rs.data.userPhone 
                    this.form.email=rs.data.userEmail   
                }).catch(error => {
                    console.log(error.data);
                })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      onSubmit() {
        let User = {
          userId:this.$route.params.userId,
          userName:this.form.name,
          userAddress:this.form.address,
          userGender:this.form.gendar=='男',
          userPhone:this.form.phone,
          userEmail:this.form.email
        }
        let url = 'http://localhost:8080/ssm/User/Update';
        axios.post(url,User,{headers:{"Content-Type":"application/json"}}).then(rs => {
                    console.log(rs.data);
                    this.$message({
                      message: rs.data,
                      type:rs.data=='验证成功'?'success' : 'error' 
                    })
                  
                }).catch(error => {
                    console.log('修改个人信息失败')
                    console.log(error.data);
                })
      },
      back(){
        this.$router.push('/administrators/adminiusers',()=>{},()=>{})
      }
    }
  }
</script>

<style>
  .box2 {
    margin:0 auto;
    width: 500px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>