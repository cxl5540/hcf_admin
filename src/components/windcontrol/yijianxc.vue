<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
        <span>登录名：</span>
        <div class="seachinpt">
         <input type="text"  v-model='dlm'>
        </div>
        <button style='background:#16191F;' @click='searchlist'>查询</button>
        <button style='background:#FFAA25;' @click='pljexc'>批量解除限仓</button>
        <button style='background:#E65026;' @click='plxc'>批量限仓</button>
      </div>
    </div>
    <div>
       <el-tabs v-model="activeName">
        <div class="num" >
      <el-table
       :cell-style='cellstyle' 
       v-loading="loading"
        @selection-change="handleSelectionChange"
      :data="tableData3"
      stripe
      height='60vh'   
      :default-sort = "{prop: 'date', order: 'descending'}"
      style="width: 100%;">
      <el-table-column
      type="selection"
      width="100">
    </el-table-column>
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
      width="280">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.frozen=='未限仓'">限仓</el-button>
        <el-button @click="handleClick1(scope.row)" type="text" size="small" v-if="scope.row.frozen=='限仓'" >解除限仓</el-button>
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
     addDialog:false,
     selectts:'',
     dlm:'',
     searchval:'',
     chosee:'',
     page:1,
     lastPage:'',
     loading:false,
         title:[
    {
      tile:'登录名',
      key:'loginname',
 
    },{
      tile:'状态',
      key:'frozen',
 
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
      let url=_const.requestUrl+'/hcfsharesmgr/user/foundUserList';
       let data={
          token:this.token,
          uid:this.uid,
          loginname:this.dlm,
          page:this.page,
          size:10
        }
       let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
            _this.lastPage=res.data.pages;                            
             for(var i=0;i<res.data.list.length;i++){              
             res.data.list[i].frozen==1?res.data.list[i].frozen='未限仓': res.data.list[i].frozen='限仓'
            }
             _this.tableData3=res.data.list;
             _this.loading=false;
            }
            if(res.code==400){
                _this.$message.error(res.mesg);
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
  searchlist(){
   this.getdata();
   }, 
  handleClick(val){   //限仓操作
   this.$confirm('是否对此限仓?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { 
    let url=_const.requestUrl+'/hcfsharesmgr/user/updateFrozen';  
       let data={
          token:this.token,
          uid:this.uid,
          frozen:2,
          userIds:val.uid,
        }
       let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){                            
               _this.$message.success(res.msg);
              _this.$set(val,'frozen','限仓');
            }

          },          
          error:function(){
             _this.$message.error('网络错误');
          }
      });
    }).catch(() => {
    this.$message({
    type: 'info',
    message: '已取消'
     });
    }); 

  },
  handleClick1(val){    //解除限仓操作
    this.$confirm('是否解除限仓?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { 
    let url=_const.requestUrl+'/hcfsharesmgr/user/updateFrozen';
       let data={
          token:this.token,
          uid:this.uid,
          frozen:1,
          userIds:val.uid,
        }
       let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){                            
              _this.$message.success(res.msg);
              _this.$set(val,'frozen','未限仓');
            }

          },          
          error:function(){
             _this.$message.error('网络错误');
          }
      });
       }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消'
         });
        }); 
  },
  handleSelectionChange(val){  //批量操作
   this.chosee=val; 
    let str='';
    for(var i=0;i<val.length;i++){
      str+=val[i].uid+',';
    }
     this.selectts = str;
  },
    pljexc(){     //批量解除限仓
      if(this.selectts==''){
        this.$message.warning('请选择');
        return;
      }else{
        this.$confirm('是否批量解除限仓?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { 
        let url=_const.requestUrl+'/hcfsharesmgr/user/updateFrozen';
       let data={
          token:this.token,
          uid:this.uid,
          frozen:1,
          userIds:this.selectts,
        }
         let _this=this;
         $.ajax({
           url:url, 
            dataType:"json",   
            data:data,    //参数值
            type:"POST",   //请求方式
            success:function(res){
              if(res.code==0){                            
                _this.$message.success(res.msg);
               for(var i=0;i<_this.chosee.length;i++){
                _this.chosee[i].frozen='未限仓';
               }
              }

            },          
            error:function(){
               _this.$message.error('网络错误');
            }
        });
       }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消'
         });
        }); 
      }
    },
    plxc(){            //批量限仓     
       if(this.selectts==''){
        this.$message.warning('请选择');
        return;
      }else{
        this.$confirm('是否批量限仓?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  
        let url=_const.requestUrl+'/hcfsharesmgr/user/updateFrozen';
       let data={
          token:this.token,
          uid:this.uid,
          frozen:2,
          userIds:this.selectts,
        }
         let _this=this;
         $.ajax({
           url:url, 
            dataType:"json",   
            data:data,    //参数值
            type:"POST",   //请求方式
            success:function(res){
              if(res.code==0){                            
                _this.$message.success(res.msg);
               for(var i=0;i<_this.chosee.length;i++){
                _this.chosee[i].frozen='限仓';
               }
              }

            },          
            error:function(){
               _this.$message.error('网络错误');
            }
        });
      }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消'
      });          
    });
  }
},
   cellstyle(row,columu,rowIndex){   //判断颜色
     if(row.row.frozen=='限仓'&&row.column.label=='状态'){
      return "color:red"
     }else if(row.row.frozen=='未限仓'&&row.column.label=='状态'){
      return "color:#6c3"
     }
    
    },   

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
.seachinpt{
  display: inline-block;
  position: relative;
}
.seachlist{
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
.seachlist li{
  margin: 10px 0;
  text-align: center;
}
.addfrom{
  width: 80%;
  margin: auto;
}
.addfrom>p{
display: flex;
width: 100%;
margin: 20px 0;
}
.addfrom>p>span{
  width:40%;
  font-size: 0.28rem;
  line-height: 0.6rem;
}
.addfrom>p input{
    width: 60%;
    padding: 0.1rem 0.1rem;
}
.dialog-footer{
  padding: 20px;
}
.dialog-footer button{
  margin: 10px 40px;
  padding: .2rem .4rem;
  color: #fff;
  border: none;
  border-radius: 4px;
}
.feny{
width: 30%;
margin: auto;
position: absolute;
bottom: 16vh;
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
