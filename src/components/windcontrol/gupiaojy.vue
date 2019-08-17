<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
        <span>股票代码：</span>
       <div class="seachinpt">
         <input type="text"  v-model='scode'>
        </div>
        <span>名单类型：</span>
        <select name="" id="" v-model='hbtype'>
           <option value="">所有</option>
          <option value="1">黑名单</option>
          <option value="0">白名单</option>
        </select>
        <button style='background:#16191F;' @click='searchlist'>查询</button>
        <button style='background:#E65026;' @click='plhmd'>批量加入黑名单</button>
        <button style='background:#FFAA25;' @click='plbmd' >批量解除黑名单</button>
      </div>
    </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      height='60vh'
      v-loading='loading'
      :data="tableData3"
      stripe
       :row-class-name="tableRowClassName"
       :cell-style='cellstyle' 
      @selection-change="handleSelectionChange"  
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
          <el-button @click="handleClick(scope.row)" type="text" size="small" class='caozuo' v-if="scope.row.status=='白名单'">加入黑名单</el-button>
          <el-button @click="handleClick1(scope.row)" type="text" size="small" v-if="scope.row.status=='黑名单'">解除黑名单</el-button>
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
     searchval:'',
     loading:false,
     page:1,
     lastPage:'',
     hbtype:'',
     scode:'',
     chosee:'',
     selectts:'',
         title:[
    {
      tile:'股票代码',
      key:'scode',
 
    },{
      tile:'股票名称',
      key:'sname',
 
    },{
      tile:'股票状态',
       key:'status',

    }],  
   tableData3: [],
   caozuo:'',
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
      let url=_const.requestUrl+'/hcfsharesmgr/money/foundBlackWhtie';
       let data={
          token:this.token,
          uid:this.uid,
          scode:this.scode,
          status:this.hbtype,
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
             res.data.list[i].status==1?res.data.list[i].status='黑名单': res.data.list[i].status='白名单'

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
    searchlist(){  // 查询列表
       this.getdata(); 
    },
   tableRowClassName ({row, rowIndex}) {
        row.index = rowIndex;

      }, 
  handleClick(val){   //加入黑名单
this.$confirm('是否删除此用户加入黑名单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {   

    let url=_const.requestUrl+'/hcfsharesmgr/money/updateBlackWhtie';
       let data={
          token:this.token,
          uid:this.uid,
          status:1,
          scodes:val.scode,
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
              _this.$set(val,'status','黑名单');
              console.log($('.caozuo').eq(val.index).text());
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
  handleClick1(val){  //解除黑名单
   this.$confirm('是否删除此用户解除黑名单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  
    let url=_const.requestUrl+'/hcfsharesmgr/money/updateBlackWhtie';
       let data={
          token:this.token,
          uid:this.uid,
          status:0,
          scodes:val.scode,
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
              _this.$set(val,'status','白名单');
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
  handleSelectionChange(val){ //多选
   this.chosee=val; 
    let str='';
    for(var i=0;i<val.length;i++){
      str+=val[i].scode+',';
    }
     this.selectts = str;
  },
  plhmd(){                //批量加入黑名单
    if(this.selectts==''){
        this.$message.warning('请选择');
        return;
      }else{
    this.$confirm('是否批量加入黑名单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {   
        let url=_const.requestUrl+'/hcfsharesmgr/money/updateBlackWhtie';
       let data={
          token:this.token,
          uid:this.uid,
          status:1,
          scodes:this.selectts,
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
                _this.chosee[i].status='黑名单';
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
  plbmd(){                  //批量加入白名单
     if(this.selectts==''){
        this.$message.warning('请选择');
        return;
      }else{
      this.$confirm('是否批量解除黑名单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { 
        let url=_const.requestUrl+'/hcfsharesmgr/money/updateBlackWhtie';
       let data={
          token:this.token,
          uid:this.uid,
          status:0,
          scodes:this.selectts,
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
                _this.chosee[i].status='白名单';
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
   if(row.row.status=='黑名单'&&row.column.label=='股票状态'){
    return "color:red"
   }else if(row.row.status=='白名单'&&row.column.label=='股票状态'){
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
.seachlit{
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
.seachlit li{
  margin: 10px 0;
  text-align: center;
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
