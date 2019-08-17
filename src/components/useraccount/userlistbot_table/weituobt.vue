<template>
<div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      v-loading='loading'
      :data="tableDatawt"
      stripe
      highlight-current-row 
      height='24vh'   
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
  props:['wtcjList'],
  data () {
    return {
     activeName: 'first',
     loading:false,
         title:[
    {
      tile:'委托编号',
      key:'orderid',
 
    },{
      tile:'股票代码',
      key:'scode',
 
    },{
      tile:'股票名称',
       key:'sname',

    },{
      tile:'委托方向',
       key:'type',
       width:'160'
    },{
      tile:'委托价格',
       key:'price',
    },{
      tile:'委托时间',
       key:'ctime',
    },{
      tile:'委托状态',
       key:'zt',
    }],  
   tableDatawt:[],
    }
  },
  watch:{
    wtcjList(val){
      for(var i=0;i<val.length;i++){
        val[i].status==0?val[i].zt='委托中': val[i].status==1?val[i].zt='成功':val[i].zt='撤单' 
      }
      this.tableDatawt=val;
      console.log( this.tableDatawt);
    }
  },
  created(){

  },
  mounted(){
  
  },
  methods:{
     getdata(){
      this.loading=true;
     let url='http://47.103.114.28:8888/hcfshares/codeinfo/holdPositionList';
          let data={
            token:_const.zhgltoken,
            uid:_const.zhgluid,
            page:1,
            size:1000,
          }
         let _this=this;
         $.ajax({
            url:url, 
            dataType:"json",   
            data:data,    //参数值
            type:"POST",   //请求方式
            success:function(res){
              _this.loading=false;
              if(res.code==0){                            
               _this.tableDatawt=res.data.list;  
              }
            },          
            error:function(){
               _this.$message.error('网络错误');
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

</style>
