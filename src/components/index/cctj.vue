<template>
<div>
  <div class="cctj" >
    <div class="zjjk_left">
      <span style='font-size:14px;font-weight:bold'>系统持仓统计</span>
    </div>
    <div class="zjjk_right">
      <span>股票代码：</span>
      <div class="seachinpt">
      <input type="text"  v-model='scode'>
      </div>
      <button @click='searchlist'>查询</button>
    
    </div>
      
  </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      stripe
       :cell-style="tablepading"
        v-loading="loading"
      highlight-current-row 
      :data="tableData3" 
       height="30vh"
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
    <div class="feny">
       <div class="fenlt" @click='gofirst'>
         <div class="d4" style='position: absolute;top: 0;right: 6px'></div>
         <div class="d4"></div>
       </div>
        <div class="d4"  @click='gopre'></div>
        <p><span>{{page}}</span>/<span>{{lastPage}}</span></p>
        <div class="d2"  @click='gonext'></div>
        <div class="fenrt"  @click='golast'>
          <div class="d2"></div>
          <div class="d2" style='position: absolute;top: 0;left: 6px'></div>
        </div>
      </div>
    </div>
 </div>   
</template>

<script>

export default {
  name: 'index',
  components:{
/*   Header,
   Leftbar */
  },

  data () {
    return {
     activeName: 'first',
     loading:false,
     scode:'',
     lastPage:'',
     page:1,
         title:[
    {
      tile:'股票代码',
      key:'scode',
  
    },{
      tile:'股票名称',
      key:'sname',
     
    },{
      tile:'持仓数量',
       key:'pcount',
   
    },{
      tile:'冻结数量',
       key:'fcount',
   
    },{
      tile:'可卖数量',
       key:'bcount',
    
    },{
      tile:'开仓成本',
       key:'kccb',
  
    },{
      tile:'浮动盈亏',
       key:'fdyk',
       timer:0 

    },{
      tile:'亏损比例',
       key:'fdykb',
       width:'140'
    }],  
   tableData3: [],
    token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){
     this.loading=true;
    this.getdata();
  },
 mounted(){
/*     if(this.timer){      
        clearInterval(this.timer)    
    }else{      
        this.timer = setInterval(()=>{ 
     this.tableData3=[]; 
        this.getdata();   
        },10000)    
    } */ 
  
  },
  destroyed(){    
    clearInterval(this.timer)  
},
  methods:{
    getdata(){    //获取列表数据
      if(this.timer){
         this.loading=false;
      }
      
       let url=_const.requestUrl+'/hcfsharesmgr/user/systemPositionList';
       let data={
          token:this.token,
          uid:this.uid,
          page:this.page,
          size:5,
          scode:this.scode,
        }
       let _this=this;
       $.ajax({
          url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){ 
             _this.tableData3=res.data.list;
              _this.lastPage=res.data.pages;    
             _this.loading=false;   
              
            }
          },          
          error:function(){
            _this.loading=false;  
             _this.$message.error('网络错误');
          }
      });
    },
     gonext(){  //下一页    
        if(this.page!==this.lastPage  && this.lastPage!==0){
         this.page=this.page+1;
         this.getdata(); 
       }
      },
      gopre(){  //上一页
        this.page=this.page-1;
        if(this.page<=0){
          this.page=1;
          return;      
        }else{
           this.getdata(); 
        }
      },
      gofirst(){  //第一页
        this.page=1;
        this.getdata();
      },
      golast(){  //最后一页
       this.page=this.lastPage;
       this.getdata();
      },
       tablepading({row, column, rowIndex, columnIndex}){ //颜色判断
         if(row.fdykb>0&&column.label=='亏损比例'){
           return "color:red"
         }else if(row.fdykb<0&&column.label=='亏损比例'){
           return "color:green"
         }
          if(row.fdyk>0&&column.label=='浮动盈亏'){
           return "color:red"
         }else if(row.fdyk<0&&column.label=='浮动盈亏'){
           return "color:green"
         }
       },
  handleClick(row, event, column){  //选中莫一行
    
  },
  searchlist(){     // 获取查询列表
  this.getdata();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cctj{
  display: flex;
  justify-content: space-between;
    border-bottom: 1px solid #eee;
}
.cctj>div{
  padding: 10px 2px;

}
.cctj>div:nth-child(1){
  margin-left: 10px;
  border-bottom: 3px solid #E65026;
}
.cctj>div:nth-child(2){
  margin-right: 10px;
}
.cctj>div:nth-child(2)>button{
  background:#16191F;
  color: #fff;
  border: none;
  padding: 6px 18px;
  border-radius: 4px;
}
.cctj>div:nth-child(2) input{
 width: 100%;
 padding: 3px 2px;
 box-sizing: border-box;
}

.seachinpt{
   position: relative;
   display: inline-block;
    width: 36%;
}
.seachcctj{
  position: absolute;
  top:0.44rem;
  left:0rem;
  border: 1px solid #eee;
  background: #fff;
  color: #000;
  z-index: 999;
  display: none;
  width: 98%;
}
.seachcctj li{
  margin: 10px 0;
}
.feny{
width: 30%;
margin: auto;
/* position: absolute;
bottom: 16vh; */
left: 50%;
}
.feny div{
  display: inline-block;
}
.feny p{
  display: inline-block;
  font-size: 0.32rem;
    margin: 0 .2rem;
    position: relative;
    top: -0.05rem;
}
.fenrt,.fenlt{
  position: relative;
}
.d2,.d4{
   width: 0; 
 height: 0;
 border-width: 0.18rem;
 border-style: solid; 
}
.d4{
 
 border-color: transparent #000 transparent transparent;
}
.d2{
 border-color: transparent  transparent  transparent #000;
}
</style>
