<template>
    <div class="box2">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品图片">
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
      <el-form-item label="商品ID">
       <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
       <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.typeId" placeholder="商品类型"> 
          <el-option
            v-for="item in options"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
       <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
       <el-input v-model="form.pNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AddGoods',
    data() {
      return {
        options: [],
        imageUrl: '',
        form: {
          id:'',
          name: '',
          typeId:'',
          price: '',
          pImg:'',
          pNum:''
        }
      }
    },
    mounted(){
      this.LoginA();
      this.GetTypeData();
    },
    methods: {
      LoginA(){
          if(localStorage.getItem("adminId")==null){
            this.$message.success("请登录")
            this.$router.push('/login2')
          }
        },
      GetTypeData:function(){
        let url = 'http://localhost:8080/ssm/ProductType/GetProductType'
        axios.get(url).then(rs => {
                    console.log(rs.data) ;
                    console.log(rs.data)
                    rs.data.forEach(item => {this.options.push(item) })
                    //console.log(this.tableData)
                    console.log("GetTypeData运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("GetTypeData运行出错");
                })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = 'http://localhost:8080/ssm/Img/GetP?name='+res;
        this.form.pImg = this.imageUrl
        console.log(file.raw)
        console.log(this.imageUrl)
        console.log(res)
      },
      beforeAvatarUpload(file) {
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
        let Product = {
          pId:this.$route.params.pId,
          pName:this.form.name,
          pPrice:this.form.price,
          pImg:this.form.pImg,
          pType:this.form.typeId,
          pNum:this.form.pNum
        }
        let url = 'http://localhost:8080/ssm/Product/insert';
        axios.post(url,Product,{headers:{"Content-Type":"application/json"}}).then(rs => {
                    console.log(rs.data);
                    this.$message.success({
                      message: rs.data,
                    })
                  
                }).catch(error => {
                    console.log('添加商品信息失败')
                    console.log(error.data);
                })
      },
      back(){
        this.$router.push('/administrators/adminigoods',()=>{},()=>{})
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