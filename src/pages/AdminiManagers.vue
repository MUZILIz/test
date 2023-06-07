<template>
  <div>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="atypeId"
      label="管理员职位"
      width="180">
    </el-table-column>
    <el-table-column
      prop="adminName"
      label="管理员姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="adminId"
      label="管理员ID"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="props">
          <el-button type="primary" @click="NoForbid(props.row)">启用</el-button>
          <el-button type="warning" @click="Forbid(props.row)">禁用</el-button>
          <el-button type="danger"  @click="DeleteAdmin(props.row.adminId)">删除</el-button>
      </template>
    </el-table-column> 
  </el-table>
  <el-button type="primary" round :style="{transform:'translateY(20px)'}" @click="add">添加管理员</el-button>
  </div>
</template>

<script>
import axios from 'axios'
 export default {
  name:'AdminiManagers',
    data() {
      return {
        tableData: []
      }
    },
    mounted(){
      this.LoginA();
      this.GetAllAdmin();
    },
    methods:{
      LoginA(){
          if(localStorage.getItem("adminId")==null){
            this.$message.success("请登录")
            this.$router.push('/login2')
          }
        },
      DeleteAdmin:function(val){
        console.log(val)
        let url = 'http://localhost:8080/ssm/Admin/delete'
        let params ={
          adminId :val.adminId
        }
        if(val.atypeId>localStorage.getItem('Leve')){
          axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    console.log("NoForbid运行正确");
                    this.$router.go(0)
                }).catch(error => {
                    console.log(error.data);
                    console.log("NoForbid运行出错");
                })
        }else{
          this.$message.error("权限不足")
        }
        // axios.get(url,{params:params}).then(rs => {
        //             console.log(rs.data) ;
        //             console.log("NoForbid运行正确");
        //             this.$router.go(0)
        //         }).catch(error => {
        //             console.log(error.data);
        //             console.log("NoForbid运行出错");
        //         })
      },
      NoForbid:function(val){
        //console.log(val)
        let url = 'http://localhost:8080/ssm/Admin/NoForbid'
        let params ={
          adminId :val.adminId
        }
        console.log(val.atypeId)
        console.log(localStorage.getItem('Leve'))
        if(val.atypeId>localStorage.getItem('Leve')){
          axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    console.log("NoForbid运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("NoForbid运行出错");
                })
        }else{
          this.$message.error("权限不足")
        }
        // axios.get(url,{params:params}).then(rs => {
        //             console.log(rs.data) ;
        //             console.log("NoForbid运行正确");
        //         }).catch(error => {
        //             console.log(error.data);
        //             console.log("NoForbid运行出错");
        //         })
      },
      Forbid:function(val){
        console.log(val)
        let url = 'http://localhost:8080/ssm/Admin/Forbid'
        let params ={
          adminId :val.adminId
        }
        if(val.atypeId>localStorage.getItem('Leve')){
          axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    console.log("Forbid运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("Forbid运行出错");
                })
        }else{
          this.$message.error("权限不足")
        }
        // axios.get(url,{params:params}).then(rs => {
        //             console.log(rs.data) ;
        //             console.log("Forbid运行正确");
        //         }).catch(error => {
        //             console.log(error.data);
        //             console.log("Forbid运行出错");
        //         })
      },
      GetAllAdmin:function(){
        let url = 'http://localhost:8080/ssm/Admin/GetAllAdmin'
        axios.get(url).then(rs => {
                    console.log(rs.data) ;
                    rs.data.forEach(item => {this.tableData.push(item) })
                    console.log("GetAllAdmin运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("GetAllAdmin运行出错");
                })
      },
      add(){
        this.$router.push('/administrators/adminimanagers/addmanager',()=>{},()=>{})
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