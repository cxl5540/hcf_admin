<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
     <!--  <button style='background:#E65026'>导出列表</button> -->
       <button style='background:rgb(255, 170, 37)' @click='additem'>新增</button>
        <span>用户名：</span>
        <input type="text" v-model='yhm'>
        <button @click='searchlist'>查询</button>
      </div>
    </div>
    <div style='position:'>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      v-loading='loading'
      :data="tableData3"
       :row-class-name="tableRowClassName"
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
        <el-table-column
      label="操作"
       fixed="right"
      width="280">
      <template slot-scope="scope">
        <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
         <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>      
        <el-button type="text" size="small" @click="setqx(scope.row)">权限设置</el-button>
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
  <el-dialog
      :visible.sync="addDialog"
      width="30%"
      center>
        <div class="addfrom">
          <p><span>管理员用户名：</span> <input type="text" placeholder='管理员用户名' v-model='username'></p>
          <p><span>登录密码：</span> <input type="text" placeholder='请输入登录密码' v-model='password'></p>
          <p><span>手机号：</span> <input type="text" placeholder='请输入手机号' v-model='tel'></p>
          <p><span>备注：</span> <textarea rows="3" cols="20" v-model='bz'></textarea></p>
        </div>
      <span slot="footer" class="dialog-footer">
          <button style='background:#16191F' @click="addDialog = false">取 消</button>
          <button style="background:#E65026" @click='add1'>保存</button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="editDialog"
      width="30%"
      center>
        <div class="addfrom">
          <p><span>用户名：</span> <input type="text" placeholder='用户名' v-model='editname' disabled></p>
          <p><span>登录密码：</span> <input type="text" placeholder='请输入登录密码' v-model='editpassword'></p>
          <p><span>手机号：</span> <input type="text" placeholder='请输入手机号' v-model='edittel'></p>
          <p><span>是否禁用：</span><el-radio v-model="radio" :label="1" size="medium">正常</el-radio>
                                    <el-radio v-model="radio" :label="2">禁用</el-radio></p>
          <p><span>备注：</span> <textarea rows="3" cols="20" v-model='editbz'></textarea></p>
        </div>
      <span slot="footer" class="dialog-footer">
          <button style='background:#16191F' @click="editDialog = false">取 消</button>
          <button style="background:#E65026" @click='saveedit'>保存</button>
      </span>
    </el-dialog>
     <el-dialog
      :visible.sync="qxDialog"
      width="30%"
      center>
        <div class="setqx">
           <el-checkbox-group v-model="checkboxGroup2"  size="medium">
               <div>
                  <el-checkbox label="index" border >首页</el-checkbox>
                  <el-checkbox label="trand" border >交易管理</el-checkbox>               
                </div>  
                <div>
                    <el-checkbox label="risk" border >风控管理</el-checkbox>
                  <el-checkbox label="amount" border >账户管理</el-checkbox>                 
                </div>
                <div>
                  <el-checkbox label="report" border >报表管理</el-checkbox>
                  <el-checkbox label="money" border  >资金管理</el-checkbox>                 
                </div>
                <div>
                  <el-checkbox label="system" border>系统管理</el-checkbox>
                </div>
            </el-checkbox-group>
        </div>
      <span slot="footer" class="dialog-footer">
          <button style='background:#16191F' @click="qxDialog = false">取 消</button>
          <button style="background:#E65026" @click='quxianset'>保存</button>
      </span>
    </el-dialog>  
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
     addDialog:false,
     username:'',
     password:'',
     checkboxGroup2:[],
     yhm:'',
     tel:'',
     bz:'',
     lastPage:'',
     page:1,
     qxDialog:false,
     editDialog:false,
     editname:'',
     editpassword:'',
     edittel:'',
     radio:'',
     editbz:'',
    title:[
    {
      tile:'用户名称',
      key:'username',
 
    },{
      tile:'电话',
       key:'tel',

    },{
      tile:'状态',
       key:'status',

    },{
      tile:'备注',
      key:'remark',
 
    }],  
   tableData3: [],
   aid:'',
    token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){

  },
  mounted(){
   this.getdata();
  },
  methods:{
    getdata(){    //获取列表数据
      this.loading=true;
      let url=_const.requestUrl+'/hcfsharesmgr/prosession/foundAdminList';
          let data={
           token:this.token,
            uid:this.uid,
            page:this.page,
            size:10,
            username:this.yhm,
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
              _this.loading=false;                                                   
               for(var i=0;i<res.data.list.length;i++){  
                   res.data.list[i].status=='1'?res.data.list[i].status='正常': res.data.list[i].status='禁用';
               
                  }
              _this.tableData3=res.data.list;

              }else if(res.code==400){
                 _this.$message.error(res.msg);
              }
               
            },          
            error:function(){
             _this.loading=false;    
               _this.$message.error('网络错误');
            }
    });
  },
  searchlist(){
    this.getdata();
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
  additem(){  //打开弹窗
   this.addDialog=true;
    },
    tableRowClassName ({row, rowIndex}) {  //选中某行index
        row.index = rowIndex;
    },
  add1(){     //添加
    if(this.check()){
      let url=_const.requestUrl+'/hcfsharesmgr/prosession/addAdmin';
          let data={
           token:this.token,
            uid:this.uid,
            username:this.username,
            password:this.password,
            tel:this.tel,
            remark:this.bz
          }
         let _this=this;
         $.ajax({
            url:url, 
            dataType:"json",   
            data:data,    //参数值
            type:"POST",   //请求方式
            success:function(res){
              if(res.code==0){
                  _this.$message.success('添加成功');
                 _this.getdata();
                 _this.addDialog=false;
            
              }else if(res.code==402){
                 _this.$message.error(res.msg);
                 _this.addDialog=false;
              }
            },          
            error:function(){
             _this.loading=false;    
               _this.$message.error('网络错误');
            }
    });    
    }
  },
  edit(val){   //编辑
    console.log(val);
    this.aid=val.aid;
   this.editDialog=true;
   this.editname=val.username;
   this.edittel=val.tel;
   this.editbz=val.remark;
   val.status=='正常'?this.radio=1:this.radio=2;
   
  },
  saveedit(){   //保存修改
     let url=_const.requestUrl+'/hcfsharesmgr/prosession/updateAdmin';
          let data={
           token:this.token,
            uid:this.uid,
            aid:this.aid,
            password:this.editpassword,
            tel:this.edit.tel,
            remark:this.editbz,
            status:this.radio,
          }
         let _this=this;
         $.ajax({
            url:url, 
            dataType:"json",   
            data:data,    //参数值
            type:"POST",   //请求方式
            success:function(res){
              if(res.code==0){
                  _this.$message.success('修改成功'); 
                 _this.getdata();
                 _this.editDialog=false;                       
              }
            },          
            error:function(){  
               _this.$message.error('网络错误');
            }
    }); 
  },
  del(val){   //删除
    this.$confirm('是否删除此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {                  
            let url=_const.requestUrl+'/hcfsharesmgr/prosession/delAdmin'
            let data={
              token:this.token,
              uid:this.uid,
              aid:val.aid,
            }
            let _this=this;
             $.ajax({
               url:url, 
                dataType:"json",   
                data:data,    
                type:"POST",  
                success:function(res){
                  if(res.code==0){
                    _this.$message.success('删除成功');

                   _this.tableData3.splice(val.index, 1);
                 }
                 if(res.code==402){
                    _this.$message.error(res.msg);
                 }
                },         
                error:function(){
                   _this.$message.error(res.msg);
                }
            });        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

  },
  setqx(val){   //打开权限弹窗
    this.checkboxGroup2=[];
    console.log(val);
   this.aid=val.aid; 
    let url=_const.requestUrl+'/hcfsharesmgr/prosession/foundAdminProsess';
          let data={
           token:this.token,
            uid:this.uid,
            aid:val.aid,
          }
         let _this=this;
         $.ajax({
            url:url, 
            dataType:"json",   
            data:data,    //参数值
            type:"POST",   //请求方式
            success:function(res){
              if(res.code==0){
                  _this.qxDialog=true;
                     for(var i=0;i<res.data.length;i++){
                      if(res.data[i].prosess==1){
                        _this.checkboxGroup2.push(res.data[i].varcat);
                      }
                     }
                  console.log(_this.checkboxGroup2);                               
              }
            },          
            error:function(){  
               _this.$message.error('网络错误');
            }
    }); 
  },
  quxianset(){            //修改权限
    let url=_const.requestUrl+'/hcfsharesmgr/prosession/updateAdminProsess';
          let data={
           token:this.token,
            uid:this.uid,
            aid:this.aid,
            varcat:this.checkboxGroup2
          }
         let _this=this;
         $.ajax({
            url:url, 
            dataType:"json",   
            data:data,    //参数值
            type:"POST",   //请求方式
           /* traditional: true,*/
            success:function(res){
              if(res.code==0){
                 _this.$message.success(res.msg+',请重新登录');
                setTimeout(function(){              
                   _this.$router.push('/')
                },2000);
                _this.qxDialog=false;          
              }
              
            },          
            error:function(){  
               _this.$message.error('网络错误');
            }
    }); 
  },
   check(){ //验证
     if(this.username==''){
       this.$message.error('请填写用户名');
         return false;
    }
    if(this.tel==''){
        this.$message.error('请填写手机号');
         return false;
    }else{
       if(!(/^1[34578]\d{9}$/.test(this.tel))){
      this.$message.error('手机号码格式不正确');
      return false;
     }
    }   
    if(this.password==''){
        this.$message.error('请输入密码');
      return false;
    }
    return true;
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
.addfrom>p input,textarea{
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
.addfrom div{
  margin: 20px auto;
  text-align: center;
}
.red{
  color: red;
}
.green{
  color:green;
}
.feny{
width: 30%;
margin: auto;
text-align: center;
margin-top: 10px;
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
.setqx{
  text-align: left;
}
.setqx div{
 margin-top: 20px;
}
.setqx>div>div{
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 20px auto;
}
</style>
