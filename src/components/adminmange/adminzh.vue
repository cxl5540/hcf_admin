<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
     <!--  <button style='background:#E65026'>导出列表</button> -->
        <span>账户名称：</span>
        <input type="text">
        <span>角色名：</span>
        <select name="" id="">
          <option value="1">角色</option>
          <option value="2">角色</option>
        </select>
        <button>查询</button>
      </div>
    </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      :data="tableData3" 
      stripe
      highlight-current-row   
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
        <el-table-column
      label="操作"
       fixed="right"
      width="160">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>
        <el-button type="text" size="small">启用</el-button>
        <el-button type="text" size="small">删除</el-button>
        <el-button type="text" size="small">编辑</el-button>
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
      tile:'账户名',
      key:'ggbs',
 
    },{
      tile:'电话号码',
      key:'yjx',
 
    },{
      tile:'邮箱',
       key:'pcx',

    },{
      tile:'角色',
       key:'js',

    }],  
   tableData3: [{
          'ggbs': '2',
          'yjx': '32',
          'pcx': '32',
          'js':'3'
               
        },
        ]
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
  margin-right: 10px;
}
.zjjkcom>div:nth-child(1) input{
 width: 120px;
 padding: 3px 2px;
}
.holdcangtb{
  height: 40vh;
}
</style>
