<template>
    <div class="box2">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="管理员ID">
         <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
         <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
         <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-radio-group v-model="form.zhiwei">
            <el-radio label="商品专员"></el-radio>
            <el-radio label="营销经理"></el-radio>
            <el-radio label="系统管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="AddAdmin()">立即添加</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
      name:'AddManager',
      data() {
        return {
          form: {
            id:'',
            name: '',
            zhiwei:'',
            password:'',
          }
        }
      },
      mounted(){
        this.LoginA();
      },
      methods: {
        LoginA(){
          if(localStorage.getItem("adminId")==null){
            this.$message.success("请登录")
            this.$router.push('/login2')
          }
        },
        AddAdmin:function(){
          let url = 'http://localhost:8080/ssm/Admin/insertAdmin'
          let i=0;
          if(this.form.zhiwei=='商品专员') {
            i=1;
          }else if(this.form.zhiwei=='营销经理'){
            i=2
          }else{
            i=3;
          }

          let admin= {
            adminId:this.form.id,
            adminName:this.form.name,
            adminPassword:this.form.password,
            atypeId:i,
          }
          axios.post(url,admin,{headers:{"Content-Type":"application/json"}}).then(rs=>{
              console.log(rs.data);
              this.$message.success({
              message: rs.data,
              })
            }).catch(error => {
                    console.log('出错')
                    console.log(error.data);
                })
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        onSubmit() {
          console.log('submit!');
        },
        back(){
          this.$router.push('/administrators/adminimanagers',()=>{},()=>{})
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