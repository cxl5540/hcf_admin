<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
        <span>用户名：</span>
        <input type="text">
        <span>登录名：</span>
        <input type="text">
        <button>查询</button>
      </div>
    </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      :data="tableData3"
      height='40vh'    
      :default-sort = "{prop: 'date', order: 'descending'}"
      style="width: 100%;">
      <el-table-column
      v-for="(item,index) in title"
       :label="item.tile"
        sortable 
       :key="item.index" 
       :property="item.key"    
        >
         <template slot-scope="scope">
              {{scope.row[scope.column.property]}}  <!-- 渲染对应表格里面的内容 -->
          </template>
      </el-table-column> 
    </el-table>
    </div>
    </el-tabs>
  </div>
   
 </div>   
</template>

<script>

export default {
  name: 'index',
  components:{
   
  },

  data () {
    return {
     activeName: 'first',
         title:[
    {
      tile:'登录名',
      key:'ggbs',
 
    },{
      tile:'账户名',
      key:'yjx',
 
    },{
      tile:'注册日期',
       key:'pcx',

    },{
      tile:'登录IP',
       key:'yjbl',
    },{
      tile:'登录时间',
       key:'yhsbl',
    }],  
   tableData3: [{
          'ggbs': '2',
          'yjx': '32',
          'pcx': '32',
          'yjbl':'32',
          'yhsbl':'32',         
        },
        ]
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods:{
    getdata(){    //获取列表数据
      let url=''
      let data={}
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(req){

          },          
          error:function(){
              //请求出错处理
          }
      });
    },
  handleClick(){

  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.zjjkcom{
  text-align: right;
  border-bottom: 1px solid #eee;
}
.zjjkcom>div:nth-child(1)>button{
  background:#16191F;
  color: #fff;
  border: none;
  padding: 6px 18px;
  border-radius: 4px;
}
.zjjkcom>div:nth-child(1) input{
 width: 120px;
 padding: 3px 2px;
}

</style>
