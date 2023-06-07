<template>
  <div>
    <div :style="div2">
      <div>
        <div>商品名称:</div>
        <el-input v-model="input" placeholder="请输入内容" :style="search"><router-link></router-link></el-input>
      </div>
      <div :style="div3">
        <div>商品类型:</div>
        <template>
          <el-select v-model="typeId" placeholder="请选择" :style="search2">
            <el-option
              v-for="item in options"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
              >
            </el-option>
          </el-select>
        </template>
      </div>

      <div :style="div4">
        <div>价格区间:</div>
        <div :style="div1">
        <el-input v-model="inputprice1" :style="search3"> <router-link></router-link></el-input>
        <div>--</div>
        <el-input v-model="inputprice2"  :style="search4"><router-link></router-link></el-input>
        <el-button type="primary" icon="el-icon-search" :style="button" @click="Search">搜索</el-button>
        <div><el-button type="primary"  :style="button" @click="ReturnHome">返回首页</el-button></div>
      </div>
      </div>
    </div>
  
    <div>
       <el-row :gutter="40">
      <el-col :span="6" v-for="item in tableData" :key="item.pId"  >
        <div class="grid-content bg-purple" :style="goods" @click="click(item)" >
          <img :src=item.pImg alt="" width="250px" class="img1">
          <div class="price"><span> 商品价格：{{item.pPrice}}</span></div>
          <div :style="{padding:'20px'}"><span>商品名：{{item.pName}}</span>></div>
        </div>
        <!-- <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small" @click=" deleteArticle(scope.row)">删除</el-button>
        </template> -->
      </el-col>
    </el-row>
    <div class="block">
    <span class="demonstration">页面</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="t">
    </el-pagination>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name:'MyGoods',
    data(){
      return {
        imgs:'http://localhost:8080/ssm/Img/GetP?name=c40717b5-eb0d-4426-8c53-bcd73ba4b414.jpg',
        t:100,
        size:'',
        currentPage4:1,
        tableData:[],
        typeData:[],
        input:'',
        options: [],
        value:'',
        inputprice1:'',
        inputprice2:'',
        typeId:'',
        SearchId:"",
        ReturnFlag:0,
      search:{
        width: '300px',
      },
      search2:{
        width: '100px',
      },
      search3:{

        width: '100px',
      },
      search4:{
  
        width: '100px',
        
      },
      button:{
       width:'100px',
       margin:'0px 20px'
      },
      div1:{
        width:'500px',
        display: 'flex',
        JustifyContent: 'space-between'
      },
      div2:{
        display: 'flex',
        width:'400px'
      },
      div3:{
        transform: 'translateX(100px)'
      },
      div4:{
        transform: 'translateX(200px)',
        // display:'flex'
      },
      goods:{
        margin:'10px',
        width:'350px',
        height:'400px'
      }
      }
    },
    mounted(){
      this.LoginA();
      this.GetProductInfo();
      this.GetTypeData();
    },
    methods:{
      LoginA(){
          if(localStorage.getItem("userId")==null){
            this.$message.success("请登录")
            this.$router.push('/login')
          }
        },
      ReturnHome:function(){
        this.ReturnFlag = 0;
        let url = 'http://localhost:8080/ssm/Product/GetPage/1'
          this.tableData = [];
          axios.get(url).then(rs => {
                    //console.log(rs.data) ;
                    //console.log(rs.data.list[1].pId)
                    rs.data.list.forEach(item => {this.tableData.push(item) })
                    this.size=rs.data.size;
                    this.t=rs.data.total;
                    //console.log(this.tableData)
                    console.log("ReturnHome运行正确");
                }).catch(error => {
                    console.log(error.data);
                    console.log("ReturnHome运行出错");
                })
      },
      Search:function(){
        let url = 'http://localhost:8080/ssm/UserSearch/CreateSearchTable'
        let SearchInfor = {
          typeId:this.typeId,
          price1:this.inputprice1,
          price2:this.inputprice2,
          pName:this.input,
          userId:localStorage.getItem('userId')
        }
        console.log(SearchInfor)
        axios.post(url,SearchInfor,{headers:{"Content-Type":"application/json"}}).then(rs=>{
              //console.log(rs.data);
              this.SearchId=(rs.data).toString();
              //console.log(this.SearchId)
              let url1='http://localhost:8080/ssm/UserSearch/GetPage/1'
              //console.log(url1)
              let params={
                userId:localStorage.getItem("userId"),
                searchId:this.SearchId 
              }
              axios.get(url1,{params:params}).then(rs => {
                    console.log(rs.data) ;
                    //console.log(rs.data.list[1].pId)
                    this.ReturnFlag=1
                    this.tableData=[]
                    rs.data.list.forEach(item => {this.tableData.push(item) })
                    this.size=rs.data.size;
                    this.t=rs.data.total;
                    //console.log('Size：'+this.size)
                    console.log(this.tableData)
                    console.log("Search获得查询列表成功");
                }).catch(error => {
                    console.log(error.data);
                    console.log("Search获得查询列表出错");
                })
            }).catch(error => {
              console.log('Search获得查询出错')
              console.log(error.data);
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
      handleCurrentChange:function(val){
        if(this.ReturnFlag==0){
          console.log(val)
          let url = 'http://localhost:8080/ssm/Product/GetPage/'+val
          this.tableData = [];
          axios.get(url).then(rs => {
                    console.log(rs.data) ;
                    //console.log(rs.data.list[1].pId)
                    rs.data.list.forEach(item => {this.tableData.push(item) })
                    //this.size=rs.data.size;
                    //this.t=rs.data.total;
                    //console.log(this.tableData)
                    console.log("handleCurrentChange函数ReturnFlag为0");
                }).catch(error => {
                    console.log(error.data);
                    console.log("handleCurrentChange函数ReturnFlag为0出错");
                })
        }else{
              let url1='http://localhost:8080/ssm/UserSearch/GetPage/'+val
              console.log(url1)
              let params={
                userId:localStorage.getItem("userId"),
                searchId:this.SearchId 
              }
              axios.get(url1,{params:params}).then(rs => {
                    //console.log(rs.data) ;
                    //console.log(rs.data.list[1].pId)
                    this.tableData=[]
                    rs.data.list.forEach(item => {this.tableData.push(item) })
                    //this.size=rs.data.size;
                    //this.t=rs.data.total;
                    console.log(this.tableData)
                    console.log("handleCurrentChange函数ReturnFlag为1");
                }).catch(error => {
                    console.log(error.data);
                    console.log("handleCurrentChange函数ReturnFlag为1出错");
                })
        }
        // console.log(val)
        // let url = 'http://localhost:8080/ssm/Product/GetPage/'+val
        // this.tableData = [];
        // axios.get(url).then(rs => {
        //             console.log(rs.data) ;
        //             console.log(rs.data.list[1].pId)
        //             rs.data.list.forEach(item => {this.tableData.push(item) })
        //             console.log(this.tableData)
        //             console.log("你好");
        //         }).catch(error => {
        //             console.log(error.data);
        //             console.log("出错");
        //         })
      },
      handleSizeChange:function(val){
        this.size=val
        console.log(val)
      },
      GetProductInfo:function(){
        //console.log("注册函数")
        let url = 'http://localhost:8080/ssm/Product/GetPage/'+this.currentPage4
        axios.get(url).then(rs => {
                    //console.log(rs.data) ;
                    //console.log(rs.data.list[1].pId)
                    rs.data.list.forEach(item => {this.tableData.push(item) })
                    //console.log(this.tableData)
                    this.t=rs.data.total
                    this.size = removeEventListener.data.size
                    console.log("GetProductInfo运行正确");
                }).catch(e => {
                    //console.log(this.tableData);
                    console.log("GetProductInfo运行出错"+e.data);//函数执行的时候争取和错误都会执行
                })
      },
      click:function(val){
        console.log(val.pImg)
        this.$router.push({name:'GoodDetail',params:{id:val.pId,name:val.pName,price:val.pPrice,num:val.pNum,img:val.pImg}})
      }
    }
}
</script>

<style>
  .img1 {
    margin: 0 50px;
  }
  .price {
    /* color: red; */
    padding: 10px 10px 0;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>