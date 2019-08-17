<template>
<div>
  <div class="fktz" >
    <div class="zjjk_left">
      <span style='font-size:14px;font-weight:bold'>实时风控通知</span>
    </div>
    <div class="zjjk_right">
      <span>登录名：</span>
      <div class="seachinpt">
       <input type="text" v-model='dlm'>
      </div>
      <button @click=searchlist>查询</button>
      
    </div>
   
  </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
        v-loading="loading"
      :data="tableData3" 
      stripe
      height="30vh"
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

  },

  data () {
    return {
     activeName: 'first',
     loading:false,
     searchval:'',
     dlm:'',
     lastPage:'',
     page:1,
     title:[
    {
      tile:'登录名',
      key:'loginname',
 
    },{
      tile:'账户名',
      key:'username',
 
    },{
      tile:'预警类型',
       key:'type',

    },{
      tile:'预警时间',
       key:'ctime',
    },{
      tile:'预警内容',
       key:'remark',
    }],  
   tableData3: [],
    token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){
   this.getdata();
  },
  mounted(){
   
  },
  methods:{
    getdata(){    //获取列表数据
      this.loading=true;
      let url=_const.requestUrl+'/hcfsharesmgr/user/foundFKnotice';
       let data={
          token:this.token,
          uid:this.uid,
          loginname:this.dlm,
          type:2,
          page:1,
          size:10,
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
    searchlist(){        //查询列表数据
      this.getdata();
    },
  handleClick(row, event, column){  //选中莫一行
    console.log(row);
  },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fktz{
  display: flex;
  justify-content: space-between;
    border-bottom: 1px solid #eee;
}
.fktz>div{
  padding: 10px 2px;
}
.fktz>div:nth-child(1){
  margin-left: 10px;
  border-bottom: 3px solid #E65026;
}
.fktz>div:nth-child(2){
  margin-right: 10px;
}
.fktz>div:nth-child(2)>button{
  background:#16191F;
  color: #fff;
  border: none;
  padding: 6px 18px;
  border-radius: 4px;
}
.fktz>div:nth-child(2) input{
 width: 100%;
 padding: 3px 2px;
 box-sizing: border-box;
}

.seachinpt{
   position: relative;
   display: inline-block;
    width: 36%;
}
.seachfktz{
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
.seachfktz li{
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
