<template>
  
  <div>
    <div class="left"><img :src="img" alt="" width="250px"></div>
    <div class="right">
      <div>商品名称:<span>{{name}}</span></div>
      <div>商品价格:<span>{{price}}</span></div>
      <div>商品数量:<span>{{num}}</span></div>
    </div>
    <div class="button">
      <template>
        <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      </template>
      <el-button type="danger" round @click="get">加入购物车</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'GoodDetail',
    data() {
      return {
        num1: 1,
        num:0,
        name:'',
        price:0,
        id:'',
        img:''
      };
    },
    mounted(){
      this.LoginA();
      this.t();
    },
    methods: {
      LoginA(){
          if(localStorage.getItem("userId")==null){
            this.$message.success("请登录")
            this.$router.push('/login')
          }
        },
      t:function(){
        console.log("dad")
        console.log(this.$route.params.img)
        this.id=this.$route.params.id
        this.name=this.$route.params.name
        this.price=this.$route.params.price
        this.num=this.$route.params.num
        this.img=this.$route.params.img
        
      },
      handleChange(value) {
        console.log(value);
      },
      get() {
      let url = 'http://localhost:8080/ssm/Cart/addProductToCart';
      let params={
        UserId:localStorage.getItem('userId'),
        PId:this.id,
        PCount:this.num1
      };
      console.log(params)
      axios.get(url,{params:params}).then(res => {
          console.log(res.data);
          console.log('成功')
          this.data = res.data;
        },err=>{
          console.log(err.data);
        })
    }
    }
}
</script>

<style>
.left {
    position: absolute;
    top: 150px;
    left: 400px;
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: absolute;
    top: 150px;
    right: 340px;
    width: 400px;
    height: 300px;
    background: pink;
  }
  .button {
    display: flex;
    justify-content:space-between;
    width:400px;
    position: absolute;
    right: 340px;
    top: 500px;
  }
</style>