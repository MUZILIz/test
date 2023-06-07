<template>
  <div>
    <el-select v-model="typeId" placeholder="请选择要删除的商品类型">
    <el-option
      v-for="item in options"
      :key="item.typeId"
      :label="item.typeName"
      :value="item.typeId">
    </el-option>
  </el-select>
  <el-button type="danger" @click="DeleteType()">删除</el-button>
  <br><br><br>
  <el-input v-model="input" placeholder="请输入要添加的商品类型" :style="search"></el-input>
  <el-button type="primary" @click="TypeInsert()">添加</el-button>
  <br><br><br>
  <hr>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.pName }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.pId }}</span>
          </el-form-item>
          <el-form-item label="商品价格">
            <span>{{ props.row.pPrice }}</span>
          </el-form-item>
          <el-form-item label="商品分类码">
            <span>{{ props.row.pType }}</span>
          </el-form-item>
          <el-form-item label="图片地址">
            <span>{{ props.row.pImg }}</span>
          </el-form-item>
          <el-form-item label="商品数量">
            <span>{{ props.row.pNum }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="pId">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="pName">
    </el-table-column>
    <el-table-column
      label="价格"
      prop="pPrice">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="props">
        <el-button type="primary" @click="TurnSetting(props.row.pId)">修改</el-button>
        <el-button type="danger" @click="DeleteProduct(props.row.pId)">删除</el-button>
      </template>

    </el-table-column>
  </el-table>
  <el-button type="primary" round :style="{transform:'translateY(20px)'}" @click="TurnAdd">添加商品</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'AdminiGoods',
    data() {
      return {
        typeId:'',
        value: '',
        input: '',
        search:{
          width:'218px'
        },
        options: [],
        tableData: []
      }
    },
    mounted(){
      this.LoginA();
      this.GetTypeData();
      this.GetAllProduct();
    },
    methods:{
      LoginA(){
          if(localStorage.getItem("adminId")==null){
            this.$message.success("请登录")
            this.$router.push('/login2')
          }
        },
      DeleteProduct:function(val){
        let url = 'http://localhost:8080/ssm/Product/delete'
        let params = {
          pId:val
        }
        axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    console.log("DeleteProduct运行正确");
                    this.$router.go(0)
                }).catch(error => {
                    console.log(error.data);
                    console.log("DeleteProduct运行出错");
                })
      },
      GetAllProduct:function(){
        let url = 'http://localhost:8080/ssm/Product/GetAllProduct'
        axios.get(url).then(rs => {
                    console.log(rs.data) ;
                    console.log(rs.data)
                    rs.data.forEach(item => {this.tableData.push(item) })
                    //console.log(this.tableData)
                    console.log("GetTypeData运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("GetTypeData运行出错");
                })
      },
      DeleteType:function(){
        let url = 'http://localhost:8080/ssm/ProductType/delete'
        let params = {
          typeId:this.typeId
        }
        axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    console.log("TypeInsert运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("TypeInsert运行出错");
                })
      },
      TypeInsert:function(){
        let url = 'http://localhost:8080/ssm/ProductType/insert'
        let params = {
          productTypeName:this.input
        }
        axios.get(url,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    console.log("TypeInsert运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("TypeInsert运行出错");
                })
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
      TurnSetting(val){
        console.log(val)
        this.$router.push({name:'SettingGoods',params:{pId:val}})
      },
      TurnAdd(){
        this.$router.push('/administrators/adminigoods/addgoods',()=>{},()=>{})
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
    width: 50%;
  }
</style>