<template>
<div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      v-loading='loading'
      :data="tableDatacj"
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
       :width="item.width"    
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
  props:['cjList'],

  data () {
    return {
     activeName: 'first',
       loading:false,
         title:[
    {
      tile:'成交编号',
      key:'orderid',
      width:'260',

    },{
      tile:'股票代码',
      key:'scode',
       width:''
    },{
      tile:'股票名称',
       key:'sname',
       width:'',

    },{
      tile:'交易方向',
       key:'type',
       width:''
    },{
      tile:'成交数量',
       key:'ccount',
    },{
      tile:'成交价格',
       key:'cprice',
       width:'',
    },{
      tile:'成交金额',
       key:'amount',
    },{
      tile:'佣金',
       key:'tax',
       width:'',
    }],  
   tableDatacj: [],
    }
  },
  watch:{
    cjList(val){
     this.tableDatacj=val;
     console.log( this.tableDatacj);
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods:{

  handleClick(){

  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
