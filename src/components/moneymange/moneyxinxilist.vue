<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
    <!--   <button style='background:#E65026'>导出列表</button> -->
        <span>登录名：</span>
        <input type="text" v-model='dlm'>      
        <button  @click='searchlist'>查询</button>
      </div>
    </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      :cell-style="tablepading"
      v-loading='loading'
      height='60vh'
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
       :width="item.width"
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
</template>

<script>

export default {
  name: 'index',
  components:{
   
  },

  data () {
    return {
     activeName: 'first',
     loading:false,
     page:1,
     lastPage:'',
     dlm:'',
        title:[
    {
      tile:'登录名',
      key:'loginname',
      width:'120'
    },{
      tile:'账户名',
      key:'username',
      width:'120'
    },{
      tile:'手机号',
       key:'tel',
        width:'160'
    },{
      tile:'保证金',
       key:'blance',
       width:'120'
    },{
      tile:'自有资金',
       key:'curOwnFunds',
       width:'120'
    },{
      tile:'配资余额',
       key:'pzye',
        width:'120'
    },{
      tile:'配资金额',
       key:'assets',
        width:'100'
    },{
      tile:'总资产',
       key:'totalAssets',
       width:'120'
    },{
      tile:'开仓成本',
       key:'repCouPrice',
       width:'100'
    },{
      tile:'可取资金',
       key:'ky',
       width:'100'
    },{
      tile:'可用资金',
       key:'ableFunds',
       width:'100'
    },{
      tile:'浮动盈亏',
       key:'fdyk',
       width:'100'
    },{
      tile:'平仓盈亏',
       key:'plus',
       width:'100'
    },{
      tile:'累计盈亏',
       key:'pzye',
       width:'120'
    },{
      tile:'保证金余额',
       key:'bzjye',
       width:'100'
    },{
      tile:'出入金合计',
       key:'crjhj',
       width:''
    }],  
   tableData3: [],
       token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods:{
    getdata(){
      this.loading=true;
    let url=_const.requestUrl+'/hcfsharesmgr/user/userAssetsSys';
    let data={
     token:this.token,
      uid:this.uid,
      page:this.page,
      size:10,
      loginname:this.dlm

    }
   let _this=this;
   $.ajax({
      url:url, 
      dataType:"json",   
      data:data,    //参数值
      type:"POST",   //请求方式
      success:function(res){
        if(res.code==0){ 
         _this.loading=false;                                                   
        _this.tableData3=res.data[0];
        _this.lastPage=res.data[1].pages;

        }
      },          
      error:function(){
         _this.loading=false;  
         _this.$message.error('网络错误');
      }
    });
  },
  searchlist(){
    this.getdata()
  },
  searchbtn(){
      this.getdata();
    },
    gonext(){  //下一页
      if(this.page!==this.lastPage  && this.lastPage!==''){
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
         if(row.fdyk>0&&column.label=='浮动盈亏'){
           return "color:red"
         }else if(row.fdyk<0&&column.label=='浮动盈亏'){
           return "color:green"
         }
          if(row.plus>0&&column.label=='平仓盈亏'){
           return "color:red"
         }else if(row.plus<0&&column.label=='平仓盈亏'){
           return "color:green"
         }
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
  margin-right: 10px;
}
.zjjkcom>div:nth-child(1) input{
 width: 120px;
 padding: 3px 2px;
}
.holdcangtb{
  height: 40vh;
}
.feny{
width: 30%;
margin: auto;
position: absolute;
bottom: 16vh;
left: 50%;
margin-left: -1.3rem;
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
 border-width: 0.2rem;
 border-style: solid; 
}
.d4{
 
 border-color: transparent #000 transparent transparent;
}
.d2{
 border-color: transparent  transparent  transparent #000;
}
</style>
