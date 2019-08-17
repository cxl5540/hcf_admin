<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
  <!--     <button style='background:#E65026'>导出列表</button> -->
        <span>登录名：</span>
        <input type="text" v-model='dlm'>
        <!-- <span>时间：</span>
        <input type="date" style='width:120px'> -->
        <button>查询</button>
      </div>
    </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      v-loading='loading'
      :data="tableData3"
      stripe
      height='60vh'
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
     dlm:'',
     lastPage:'',
     page:1,
      title:[
    {
      tile:'登录名',
      key:'loginname',
 
    }, {
      tile:'用户名',
      key:'username',
 
    },{
      tile:'操作信息',
      key:'remark',
 
    },{
      tile:'操作时间',
       key:'ctime',

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
          type:3,
          page:this.page,
          size:100,
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
             _this.loading=false;
              _this.lastPage=res.data.pages;   
              
            }
          },          
          error:function(){
             _this.loading=false;  
             _this.$message.error('网络错误');
          }
      });
    },
    gonext(){  //下一页
      this.page=this.page+1;
       this.getdata(); 
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
/* position: absolute;
bottom: 16vh; */
left: 50%;
text-align: center;
margin-top:40px;
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
