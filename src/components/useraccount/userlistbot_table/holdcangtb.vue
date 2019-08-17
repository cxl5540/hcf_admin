<template>
<div class="holdcangtb">
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      v-loading='loading'
      :data="tableDatacc"
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
  props:['chicangList'],

  data () {
    return {
     activeName: 'first',
     loading:false,
         title:[
    {
      tile:'股票代码',
      key:'scode',
 
    },{
      tile:'股票名称',
      key:'sname',
 
    },{
      tile:'持仓数量',
       key:'count',

    },{
      tile:'成本价',
       key:'price',
       width:'160'
    },{
      tile:'现价',
       key:'nowPrice',
    },{
      tile:'开仓成本',
       key:'kccb',
    },{
      tile:'持仓市值',
       key:'nowValue',
    },{
      tile:'可卖数量',
       key:'bcount',
    },{
      tile:'冻结数量',
       key:'fcount',
    },{
      tile:'浮动盈亏',
       key:'fdyk',
    }],  
   tableDatacc:[],
    }
  },
  watch:{
    chicangList(val){
      this.tableDatacc=val;
    }
  },
  created(){
   
  },
  mounted(){
/*  this.getdata();*/
  },
  methods:{
  handleClick(){
   },
   getdata(){
      if(_const.zhgltoken==''||_const.zhgluid==''){
      this.$message.error('请选中用户');
      return;
    }else{
      this.loading=true;
     let url=_const.requestUrl+'/hcfsharesmgr/user/holdPositionList';
          let data={
           token:_const.token,
            uid:_const.uid,
            page:1,
            size:1000,
            scode:'',
            username:'',
            loginname:'',
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
               _this.tableDatacc=res.data.list; 
              
              }
            },          
            error:function(){
               _this.$message.error('网络错误');
            }
          });
       }
     },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>


</style>
