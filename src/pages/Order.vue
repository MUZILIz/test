<template>
  <div>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.pName }}</span>
          </el-form-item>
          <el-form-item label="数量">
            <span>{{ props.row.pCount }}</span>
          </el-form-item>
          <el-form-item label="价格">
            <span>{{ props.row.pPrice }}</span>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="PayOrder(props.row)">支付</el-button>
        <el-button type="danger" @click="DeleteOrder(props.row)">删除</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="订单创建时间"
      prop="orderCreate">
    </el-table-column>
    <el-table-column
      label="订单编号"
      prop="orderId">
    </el-table-column>
    <el-table-column
      label="订单总金额"
      prop="orderPrice">
    </el-table-column>
    
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'MyOrder',
    data() {
      return {
        tableData: [
        ]
      }
    },
    mounted(){
      this.LoginA();
      this.GetAllOrder();
    },
    methods: {
      LoginA(){
          if(localStorage.getItem("userId")==null){
            this.$message.success("请登录")
            this.$router.push('/login')
          }
        },
      PayOrder:function(row){
        console.log(row)
        let OrderComplete = row
        let url = 'http://localhost:8080/ssm/Order/payOrder'
        axios.post(url,OrderComplete,{headers:{"Content-Type":"application/json"}}).then(rs=>{
              console.log(rs.data);
              this.$router.go(0)
            }).catch(error => {
                    console.log('你不要过来呀')
                    console.log(error.data);
                })
      },
      DeleteOrder:function(row){
        let url = 'http://localhost:8080/ssm/Order/deleteOrder'
        let param = {
          orderId:row.orderId
        }
        axios.get(url,{params:param}).then(rs => {
                    console.log(rs.data);
                    //console.log(this.tableData)
                    console.log("DeleteOrder运行正确");
                    this.$router.go(0)
                }).catch(error => {
                    console.log(error.data);
                    console.log("DeleteOrder运行出错");
                })
      },
      GetAllOrder:function(){
        let url = 'http://localhost:8080/ssm/Order/getOrderInfo'
        let param = {
          userId:localStorage.getItem("userId")
        }
        axios.get(url,{params:param}).then(rs => {
                    console.log(rs.data);
                    rs.data.forEach(item => {this.tableData.push(item) })
                    console.log(this.tableData);
                    //console.log(this.tableData)
                    console.log("GetAllOrder运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("GetAllOrder运行出错");
                })
      },
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