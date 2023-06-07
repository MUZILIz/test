<template>
  <div>
    <div>我的购物车信息</div>
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="商品名称"
      width="120">
      <template slot-scope="scope">{{ scope.row.pName }}</template>
    </el-table-column>
    <el-table-column
      prop="pPrice"
      label="商品价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="pCount"
      label="商品数量"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button :style="{background:'#fc5531',color:'white'}" @click="DeleteCart">管理（删除订单）</el-button>
    <el-button :style="{background:'skyblue',color:'white'}" @click="SubimtOrder">结算（提交订单）</el-button>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
 export default {
  name:'ShoppingCar',
    data() {
      return {
        tableData: [],
        multipleSelection: []
      }
    },
    mounted(){
      this.LoginA();
      this.GetCart();
      
    },
    methods: {
      LoginA(){
          if(localStorage.getItem("userId")==null){
            this.$message.success("请登录")
            this.$router.push('/login')
          }
        },
      SubimtOrder:function(){
          let CartIds=[];
          this.multipleSelection.forEach(item => {CartIds.push(item.cartId) })
          let url = 'http://localhost:8080/ssm/Order/CreateOrder'
          let PostData={
            cartId:CartIds,
            userId:localStorage.getItem("userId")
          }
          let postData = qs.parse(PostData);
          console.log(postData)
          axios.post(url,postData,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(rs=>{
              console.log(rs.data);
              this.$message.success({
              message: rs.data,
              })
              this.$router.go(0)
            }).catch(error => {
                    console.log('你不要过来呀')
                    console.log(error.data);
                })
      },
      DeleteCart:function(){
          console.log(this.multipleSelection)
          let url = 'http://localhost:8080/ssm/Cart/DeleteCartProduct'
          let Carts= this.multipleSelection
          console.log(Carts)
          axios.post(url,Carts,{headers:{"Content-Type":"application/json"}}).then(rs=>{
              console.log(rs.data);
              this.$message.success({
              message: '有'+rs.data+'订单被删除',
             // type:rs.data==''?'success' : 'error' 
              })
            // if(rs.data=="1"){
            //   this.$router.push('/login')
            // }
            }).catch(error => {
                    console.log('删除购物车失败')
                    console.log(error.data);
                    // this.$message.error({
                    //   message: error.data,
                    // })
                    //this.$router.push('/login')
                })
      },
      GetCart:function(){
        let url = 'http://localhost:8080/ssm/Cart/GetCartInfo'
        let params={
          userId:localStorage.getItem("userId")
        }
        axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    //console.log(rs.data.list[1].pId)
                    rs.data.forEach(item => {this.tableData.push(item) })
                    console.log(this.tableData)
                    console.log("GetCart运行正确");
                }).catch(e => {
                    //console.log(this.tableData);
                    console.log("GetCart运行出错"+e.data);//函数执行的时候争取和错误都会执行
                })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //console.log(val)
      }
    }
  }
</script>

<style>


</style>