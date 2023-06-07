<template>
  <div class="box2">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="当前头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/ssm/Img/Get"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
        <el-button @click="turn()">切换用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'MyPerson',
    data() {
      return {
        imageUrl: 'blob:http://localhost:8081/c10a7579-0392-4ba8-b20e-a380ac47482b',
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
      this.GetP();
    },
    methods: {
      GetP:function(){
        this.imageUrl = 'http://localhost:8080/ssm/Img/GetP?name=c40717b5-eb0d-4426-8c53-bcd73ba4b414.jpg';
        console.log(this.imageUrl)
      },
      LoginA(){
          if(localStorage.getItem("userId")==null){
            this.$message.success("请登录")
            this.$router.push('/login')
          }
        },
      turn:function(){
        localStorage.clear();
        this.$router.push('/login')
      },
      GetUserInfo:function(){
        let params = {
          userId:localStorage.getItem('userId')
        }
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
        this.imageUrl = '/Img/GetP?name='+res.data;
        console.log(file.raw)
        console.log(this.imageUrl)
        console.log(res)
      },
      beforeAvatarUpload(file) {
        console.log(file)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit() {
        //console.log(this.imageUrl);
        let User = {
          userId:localStorage.getItem("userId"),
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