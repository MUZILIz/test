<template>
  <div>
    <el-input v-model="input" placeholder="请输入用户ID查询" :style="search"></el-input>
    <el-button type="primary" icon="el-icon-search" :style="button" @click="Search()">搜索</el-button>
    <el-button type="primary"  :style="button" @click="Return()">返回</el-button>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户名称">
            <span>{{ props.row.userName }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.userGendar }}</span>
          </el-form-item>
          <el-form-item label="密码">
            <span>{{ props.row.userPasswor }}</span>
          </el-form-item>
          <el-form-item label="收货地址">
            <span>{{ props.row.userAddress }}</span>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="turnsetting(props.row.userId)">修改信息</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="用户ID"
      prop="userId">
    </el-table-column>
    <el-table-column
      label="是否禁用"
      prop="userForbid">
      <template slot-scope="props">
        <el-button type="primary" @click="NoForbid(props.row.userId)">启用</el-button>
        <el-button type="danger" @click="Forbid(props.row.userId)">禁用</el-button>
      </template>
      
    </el-table-column>
    
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AdminiUsers',
    data() {
      return {
        input: '',
        search:{
          width:'300px'
        },
        tableData: []
      }
    },
    mounted(){
      this.LoginA();
      this.GetAllUser();
      console.log("初始化");
    },
    methods:{
      LoginA(){
          if(localStorage.getItem("adminId")==null){
            this.$message.success("请登录")
            this.$router.push('/login2')
          }
        },
      Return:function(){
        this.$router.go(0)
      },
      Search:function(){
        let url = 'http://localhost:8080/ssm/User/GetUserInfo1'
        let params ={
          userId :this.input
        }
        axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    this.tableData=[]
                    rs.data.forEach(item => {this.tableData.push(item) })
                    //this.tableData=rs.data
                    console.log(this.tableData)
                    console.log("Search运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("Search运行出错");
                })
      },
      NoForbid:function(val){
        console.log(val)
        let url = 'http://localhost:8080/ssm/User/NoForbid'
        let params ={
          userId :val
        }
        axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    console.log("NoForbid运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("NoForbid运行出错");
                })
      },
      Forbid:function(val){
        console.log(val)
        let url = 'http://localhost:8080/ssm/User/Forbid'
        let params ={
          userId :val
        }
        axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    console.log("Forbid运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("Forbid运行出错");
                })
      },
      GetAllUser:function(){
        let url = 'http://localhost:8080/ssm/User/GetAllUser'
        axios.get(url).then(rs => {
                    console.log(rs.data) ;
                    rs.data.forEach(item => {this.tableData.push(item) })
                    console.log("GetAllUser运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("GetAllUsert运行出错");
                })
      },
      turnsetting(val){
        console.log(val)
        this.$router.push({name:'SettingUser',params:{userId:val,}})
      }
    }
}
</script>

<style>

.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>