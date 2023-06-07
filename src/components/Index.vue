<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF">
      <el-menu-item index="1" @click="TurnGoods">商品浏览</el-menu-item>
      <el-menu-item index="3" @click="TurnShoppingCar">购物车</el-menu-item>
      <el-menu-item index="4" @click="TurnOrder">我的订单</el-menu-item>
      <el-menu-item index="5" @click="TurnPerson">个人中心</el-menu-item>
  
      <div class="demo-type" :style="div1">
        <div>
          <!-- <el-avatar src=url :style="image"></el-avatar> -->
          <span :style="{color:'white'}">{{username}},欢迎你</span>
        </div>
      </div>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  </template>
  
  <script>
  export default {
      name:'MyIndex',
      data(){
        return {
          username:'xxx',
          url:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          image:{
            transform: 'translateY(10px)'
          },
          div1:{
            transform: 'translateX(500px)'
          }
        }
      },
      mounted(){
        this.LoginA();
      },
      methods: {
        LoginA(){
          if(localStorage.getItem("userId")==null){
            
            this.$message.success("请登录")
            this.$router.push('/login')
          }else{
            this.$router.push('/index/goods')
            this.username = localStorage.getItem("userId")
          }
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        TurnGoods:function(){
          this.$router.push('/index/goods',()=>{},()=>{})
        },
        TurnOrder:function(){
          this.$router.push('/index/order',()=>{},()=>{})
        },
        TurnPerson:function(){
          this.$router.push('/index/person',()=>{},()=>{})
        },
        TurnShoppingCar:function(){
          this.$router.push('/index/shoppingcar',()=>{},()=>{})
        },
        
      }
    }
  </script>
  
  <style>
    .el-header {
      padding: 0;
    }
  
  </style>
  