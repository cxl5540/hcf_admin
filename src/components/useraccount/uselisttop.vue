<template>
<div>
  <div class="cctj" >
    <div class="zjjk_left">
      <button @click="additem">增加</button>
      <button @click="edititem" style="background:">修改</button>
      <button @click='del'>删除</button>
      <button @click='resetmony'>重置资金</button>
    </div>
    <div class="zjjk_right">
      <span>注册时间：</span>
      <input type="date" v-model='date' style="width:120px">
      <span>用户名：</span>
      <div class="searchyhm">
      <input type="text"  v-model='username'>
      </div>
      <span>登录名：</span>
      <div class="searchdlm">
      <input type="text" v-model='loginname'>
      </div>
      <button @click='search'>查询</button>
    </div>
  </div>
    <div style="background:#fff;position: relative">
       <el-tabs v-model="activeName">
        <div class="num" >
          <el-table
          v-loading='loading'
          :row-class-name="tableRowClassName"
           @row-click="handleClick"
          :data="tableData3"
          stripe
          height='30vh'
          highlight-current-row 
          :default-sort = "{prop: 'date', order: 'descending'}"
          style="width: 100%;">
          <el-table-column
          v-for="(item,index) in title"
           :label="item.tile"
            sortable 
           :key="item.index" 
           :property="item.key" 
           :width='item.width'   
           >
             <template slot-scope="scope">
                  <span>{{scope.row[scope.column.property]}}</span>  <!-- 渲染对应表格里面的内容 -->
              </template>
          </el-table-column> 
        </el-table>
    </div>
    </el-tabs>
     <div class="feny1">
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
          <p><span>登录名：</span> <input type="text" placeholder='请输入登录名' v-model='dlm' v-bind:disabled="disabled"></p>
          <p><span>账户名：</span> <input type="text" placeholder='请输入账户名' v-model='zhm'></p>
          <p><span>手机号：</span> <input type="text" placeholder='请输入手机号' v-model='sjh'  v-bind:disabled="disabled"></p>
          <p><span>登录密码：</span> <input type="text" placeholder='请输入登录密码' v-model='mm'></p>
          <p><span>杠杆比例：</span> <input type="text" v-model='ggbl'></p>
         <!--  <p><span>用户状态：</span>
           <select v-model='yhzt'>
             <option value="1">正常</option>
             <option value="2">冻结</option>
           </select></p> -->
          <p><span>到期时间：</span> <input type="date" v-model='dqsj'></p>
        </div>
      <span slot="footer" class="dialog-footer">
          <button style='background:#16191F' @click="addDialog = false">取 消</button>
          <button style="background:#E65026" @click='add1'>保存</button>
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
     yhzt:'1',
     loading:false,
     moneyList:[],
     token1:'',
     uid1:'',
     chooseitem:'',
     edittype:'',
     dlm:'',
     zhm:'',
     sjh:'',
     mm:'',
     ggbl:10,
     dqsj:'',
     page:1,
     lastPage:'',
     itemtoken:'',
     itemuid:'',
     addDialog:false,
     disabled:false,
     username:'',
     loginname:'',
     date:'',
         title:[
    {
      tile:'登录名',
      key:'loginname',
      width:'100'
  
    },{
      tile:'用户名',
      key:'username',
       width:'100'
     
    },{
      tile:'手机号',
       key:'tel',
       width:'120'
    },{
      tile:'杠杆倍数',
       key:'ggbs',
       width:'100'
    },{
      tile:'是否触发平仓线',
       key:'ppcx',
       width:'140'
    },{
      tile:'是否触发预警线',
       key:'pyjx',
       width:'140'
    },{
      tile:'是否限仓',
       key:'frozen',
      width:'100'
    },{
      tile:'注册时间',
       key:'ctime',
      width:''
    }],  
   tableData3:[],
   cjsj:'',
   wtcjscode:'',
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
          page:this.page,
          size:5,
          loginname:this.loginname,
          username:this.username,
          ctime:this.date,
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
             _this.lastPage=res.data.pages;                            
             for(var i=0;i<res.data.list.length;i++){              
             res.data.list[i].ppcx==1?res.data.list[i].ppcx='未触发': res.data.list[i].ppcx='触发'
             res.data.list[i].pyjx==1?res.data.list[i].pyjx='未触发': res.data.list[i].pyjx='触发'
             res.data.list[i].frozen==1?res.data.list[i].frozen='未限仓': res.data.list[i].frozen='限仓'

            }
             _this.tableData3=res.data.list;

            }
            if(res.code==400){
                _this.loading=false; 
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
    search(){
     this.getdata();
    },
    tableRowClassName ({row, rowIndex}) {
        row.index = rowIndex;
      },
  handleClick(row, event, column){   //选中莫一行
    this.chooseitem=row;     
    this.token1=row.token;
    this.uid1=row.uid;
  _const.zhgltoken=row.token;
   _const.zhgluid=row.uid;
   _const.chooseitem=row;
    let url='http://47.103.114.28:8888/hcfshares/codeinfo/userAssets';
       let data={
          token: _const.zhgltoken,
          uid: _const.zhgluid,
        }
       let _this=this;
       $.ajax({
          url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){ 
            _this.moneyList= res.data
            console.log(res.data);
            _this.$emit('zj',res.data);
              
            }
          },          
          error:function(){
             _this.$message.error('网络错误');
          }
      });

       let url2=_const.requestUrl+'/hcfsharesmgr/user/holdPositionList'; //持仓
                    let data2={
                     token:_this.token,
                      uid:_this.uid,
                      page:this.page,
                      size:5,
                      scode:this.scode,
                      username:'',
                      loginname:_const.chooseitem.loginname,
                    }
                   $.ajax({
                      url:url2, 
                      dataType:"json",   
                      data:data2,    //参数值
                      type:"POST",   //请求方式
                      success:function(res){
                        if(res.code==0){
                       /* _this.lastPage=res.data.pages; */                           
                        _this.chicangList=res.data.list;
                          _this.$emit('clild',res.data);
                        localStorage.setItem('ccpages',res.data.pages);
                       /* _this.bus.$emit('changedFormObject',res.data.list) */
                        }
                      },          
                      error:function(){
                         _this.$message.error('网络错误');
                      }
              }); 

            let url3=_const.requestUrl+'/hcfsharesmgr/user/entrustTranac';  //委托
                    let data3={
                     token:_this.token,
                      uid:_this.uid,
                      page:this.page,
                      size:5,
                      scode:this.scode,
                      username:_const.chooseitem.username,
                      loginname:_const.chooseitem.loginname,
                      ftime:this.cjsj,
                      ectime:this.initnowday(),
                      sctime:this.initnowday(),
                      type:'',
                      status:'',
                      scode:this.wtcjscode,
                    }
                   $.ajax({
                      url:url3, 
                      dataType:"json",   
                      data:data3,    //参数值
                      type:"POST",   //请求方式
                      success:function(res){
                     /* _this.lastPage=res.data.pages;*/
                        if(res.code==0){                                                    
                          for(var i=0;i<res.data.list.length;i++){  
                             res.data.list[i].type==0?res.data.list[i].type='买入': res.data.list[i].type='卖出';
                            }
                         _this.$emit('wt',res.data);   
                        }
                      },          
                      error:function(){
                         _this.$message.error('网络错误');
                      }
              });
              let url4=_const.requestUrl+'/hcfsharesmgr/user/entrustTranac';  //成交
                    let data4={
                     token:_this.token,
                      uid:_this.uid,
                      page:this.page,
                      size:5,
                      scode:this.scode,
                      username:_const.chooseitem.username,
                      loginname:_const.chooseitem.loginname,
                      ftime:this.cjsj,
                      ctime:'',
                      type:'',
                      status:1,
                      scode:this.wtcjscode,
                    }
                   $.ajax({
                      url:url4, 
                      dataType:"json",   
                      data:data4,    //参数值
                      type:"POST",   //请求方式
                      success:function(res){
                        if(res.code==0){                                                    
                          for(var i=0;i<res.data.list.length;i++){  
                             res.data.list[i].type==0?res.data.list[i].type='买入': res.data.list[i].type='卖出';
                            }
                         _this.$emit('cj',res.data);   
                        }
                      },          
                      error:function(){
                         _this.$message.error('网络错误');
                      }
              });       
    
  },
  del(){
    if(_const.zhgltoken==''||_const.zhgluid==''){  
           this.$message.error('请选中用户');
           } else{
    this.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {                  
            let url=_const.requestUrl+'/hcfsharesmgr/user/delUser'
            let data={
              token:this.token,
              uid:this.uid,
              userId:this.uid1,
            }
            let _this=this;
             $.ajax({
               url:url, 
                dataType:"json",   
                data:data,    //参数值
                type:"POST",   //请求方式
                success:function(res){
                  if(res.code==0){
                    _this.$message.success('删除成功');
                   /* _this.tableData3*/
                   _this.tableData3.splice(_this.chooseitem.index, 1);
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
      }
  },
  additem(){  //增加弹框
    this.disabled=false;
      this.dlm='' ;
      this.sjh='';
    this.addDialog=true;
    this.edittype='add';

  },
  edititem(){   //修改弹框
    console.log(this.token);
    if(this.token1==''||this.uid1==''){
      this.$message.error('请选中用户');
    }else{
      this.addDialog=true;
      this.dlm=this.chooseitem.loginname ;
      this.sjh=this.chooseitem.tel;
      this.mm=this.chooseitem.password;
      this.ggbl=this.chooseitem.ggbs;
      this.zhm=this.chooseitem.username;    
      this.disabled=true;
      this.edittype='eidt'
    }

  },
add1(){   //增加用户/修改提交
if(this.edittype=='add'){   
    if(this.check()){
      let url=_const.requestUrl+'/hcfsharesmgr/user/addUser'
      let data={
        token:this.token,
        uid:this.uid,
        loginname:this.dlm,
        username:this.zhm,
        password:this.mm,
        tel:this.sjh,
        ggbs:this.ggbl,
        mtime:this.dqsj
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

           }else if(res.code==401){
             _this.$message.error(res.msg);
           }
          },         
          error:function(){
             _this.$message.error(res.msg);
          }
      });
    }
   }else if(this.edittype=='eidt'){
      let url=_const.requestUrl+'/hcfsharesmgr/user/updateUser'
      let data={
        token:this.token,
        uid:this.uid,
        userId:this.uid1,
        username:this.zhm,
        password:this.mm,
        ggbs:this.ggbl,
        mtime:this.dqsj
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
               console.log(_this.tableData3[_this.chooseitem.index]);
              _this.$set(_this.tableData3[_this.chooseitem.index], 'username', _this.zhm);
              _this.$set(_this.tableData3[_this.chooseitem.index], 'password', _this.mm);
              _this.$set(_this.tableData3[_this.chooseitem.index], 'ggbs', _this.ggbl);
              _this.$set(_this.tableData3[_this.chooseitem.index], 'mtime', _this.dqsj);
               _this.addDialog=false;
           }
          },         
          error:function(){
             _this.$message.error(res.msg);
          }
      });
    }  
  },
  resetmony(){                              //重置资金
     if(this.token1==''||this.uid1==''){
      this.$message.error('请选中用户');
    }else{
    this.$confirm('是否重置此用户资金?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {                  
            let url=_const.requestUrl+'/hcfsharesmgr/user/resetMoney'
            let data={
              token:this.token,
              uid:this.uid,
              userId:this.uid1,
            }
            let _this=this;
             $.ajax({
               url:url, 
                dataType:"json",   
                data:data,    //参数值
                type:"POST",   //请求方式
                success:function(res){
                  if(res.code==0){
                    _this.$message.success('重置成功');
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
            message: '已取消'
          });          
        });
       } 
  },

  check(){ //验证
     if(this.dlm==''){
       this.$message.error('请填写登录名');
         return false;
    }else{
       if(!(/^[a-zA-Z0-9]{4,23}$/.test(this.dlm))){
      this.$message.error('请输入4-23位字母+数字登录名');
      return false;
     }
    }
     if(this.zhm==''){
        this.$message.error('请输入账户名');
      return false;
    }
    if(this.sjh==''){
        this.$message.error('请填写手机号');
         return false;
    }else{
       if(!(/^1[34578]\d{9}$/.test(this.sjh))){
      this.$message.error('手机号码格式不正确');
      return false;
     }
    }   
    if(this.mm==''){
        this.$message.error('请输入密码');
      return false;
    }
    return true;
   }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cctj{
  display: flex;
  justify-content: space-between;
    border-bottom: 1px solid #eee;
    background: #fff;
    padding-bottom: 2px;
}
.cctj>div{
  padding: 10px 2px;
  background: #fff;

}
.cctj>div:nth-child(1){
  margin-left: 10px;
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
 width: 100px;
 padding: 3px 2px;
}
button{
  border: none;
  background: #e0e0e0;
  padding: 8px 12px;
  border-radius: 4px;
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
select{
   width: 66%;
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
.searchyhm,.searchdlm{
display: inline-block;
position: relative;
}
.seachdlmlist,.seachyhmlist{
  position: absolute;
  top:0.45rem;
  left:0;
  border: 1px solid #eee;
  background: #fff;
  color: #000;
  width: 100%;
  z-index: 999;
  display: none;
}
.seachdlmlist li,.seachyhmlist li{
  margin: 10px 0;
}
.feny1{
width: 30%;
margin: auto;
/* position: absolute;
bottom: 16vh;
left: 50%; */
}
.feny1 div{
  display: inline-block;
}
.feny1 p{
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
