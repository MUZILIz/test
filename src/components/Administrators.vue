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
        <el-menu-item index="1" @click="turn1">商品管理</el-menu-item>
        <el-menu-item index="3" @click="turn2">用户管理</el-menu-item>
        <el-menu-item index="4" @click="turn3">管理员管理</el-menu-item>
        <el-menu-item index="5" @click="turn()">退出</el-menu-item>
    </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    </template>
<script>
export default {
    name:'MyAdministrators',
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
      turn:function(){
        localStorage.clear();
        this.$router.push('/login2')
      },
      turn1(){
        this.$router.push('/administrators/adminigoods',()=>{},()=>{})
      },
      turn2(){
        this.$router.push('/administrators/adminiusers',()=>{},()=>{})
      },
      turn3(){
        this.$router.push('/administrators/adminimanagers',()=>{},()=>{})
      }
    }
  }
</script>

<style>
 .el-header {
    padding: 0;
  }
</style>