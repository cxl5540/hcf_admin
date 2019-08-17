<template>
  <div class="userlisbot" >
    <div class="userlisbot_right">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="出入金" name="first">
          <div class="crj">
            <p>
            <span>转账方向：</span>
             <select v-model='zzfx'>
              <option value="1">充值</option>
              <option value="2">提现</option>
            </select>
            </p>
          <p>
            <span>业务类型：</span>
             <select v-model='ywlx' v-if='iscz' >
              <option value="1">配资入金</option>
              <option value="2">蓝补</option>
              <option value="3">加保证金</option>
              <option value="4">加配资金额</option>
            </select>
            <select v-model='ywlx' v-if='istx'>
              <option value="1">出金提现</option>
              <option value="2">提盈</option>
              <option value="3">扣保证金</option>
              <option value="4">扣配资</option>
            </select>
            </p>
             <p>
              <span>资金金额：</span>
              <input type="text" v-model='amount'>
            </p>
            <button @click='savecrj'>保存</button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="持仓信息" name="second">
          <Holdcangtb v-bind:chicangList='chicangList'></Holdcangtb>
        </el-tab-pane>
        <el-tab-pane label="当日委托" name="third">
          <Weituotb v-bind:wtcjList='wtcjList'></Weituotb>
        </el-tab-pane>
        <el-tab-pane label="成交信息" name="fourth">
          <Chengjiaotb  v-bind:cjList='cjList'></Chengjiaotb>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="holdcangtb_right">
      <span>股票代码：</span>
      <div class="chichangcx">
      <input type="text" v-model='scode'>
      </div>
      <button @click='chicangsearch'>查询</button>
      <button class="pingcang" @click='allpc'>一键全平</button>
    </div>
    <div class="weituo_right">
      <span>股票代码：</span>
      <div class="weituocx">
      <input type="text" v-model='wtscode'>
      </div>
      <button @click='searchwt'>查询</button>
      <button class="chedan" @click='delcd'>撤单</button>
    </div>
    <div class='holdcangtb_chengjiao'>
      <span>股票代码：</span>
      <div class="chengjiaocx">
      <input type="text" v-model='cjscode'>
      </div>
     <!--  <span>成交时间:</span>
     <input type="date" style='width:120px' v-model='cjsj'> -->
      <button @click='searchcj'>查询</button>
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
     <!--  <div class="feny" style='dispaly:none'>
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
     </div> -->
  </div>
</template>

<script>
import Holdcangtb from './userlistbot_table/holdcangtb'
import Weituotb from './userlistbot_table/weituobt'
import Chengjiaotb from './userlistbot_table/chengjiaotb'
export default {
  name: 'index',
  components:{
  Holdcangtb,
  Weituotb,
  Chengjiaotb
  },
props:['itemdata','wtdata','cjdata'],
  data () {
    return {
      activeName2: 'first',
    /*  usermoneyList:this.$store.state.usermoneyList,*/
      scode:'',
      chicangList:[],
      wtcjList:[],
      cjList:[],
      cjval:'',
      amount:'',
      zzfx:'1',
      ywlx:'1',
      iscz:true,
      istx:false,
      wtcjscode:'',
      status:'',
      cjsj:'',
      type:'',
      nowday:'',
      lastPage:'',
      cclastPage:'',
      ccpage:1,
      page:1,
      cjscode:'',
      wtscode:'',
      token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){

  },
  mounted(){
  },
  watch:{
    zzfx(val,oldval){    
      if(val==1){
          this.iscz=true;
          this.istx=false;
      }else if(val==2){
         this.iscz=false;
          this.istx=true;
      }
    },
    itemdata(val){  //持仓
      this.chicangList=val.list;
      if(this.activeName2=='second'){
        this.lastPage=val.lastPage;
        this.page=val.pageNum;
      }

    },
    wtdata(val){   //委托
      this.wtcjList=val.list;
       if(this.activeName2=='third'){
        this.lastPage=val.lastPage;
        this.page=val.pageNum;
      }
    },
    cjdata(val){   //成交
       this.cjList=val.list;
       if(this.activeName2=='fourth'){
        this.lastPage=val.lastPage;
        this.page=val.pageNum;
      }
    }
  },
  methods:{
    getchicanglist(){      //获取持仓列表
       if(_const.zhgltoken==''||_const.zhgluid==''){
              /*  this.$message.error('请选中用户');*/
                return;
              }else{
               let url=_const.requestUrl+'/hcfsharesmgr/user/holdPositionList';
                    let data={
                     token:this.token,
                      uid:this.uid,
                      page:this.page,
                      size:5,
                      scode:this.scode,
                      username:'',
                      loginname:_const.chooseitem.loginname,
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
                        _this.chicangList=res.data.list; 
                        }
                      },          
                      error:function(){
                         _this.$message.error('网络错误');
                      }
              });
       }     
    },
    chicangsearch(){        //查询持仓
        this.getchicanglist();
    },
   getwtcjlist(){                  //委托成交列表
    console.log(_const.zhgltoken);
    if(_const.zhgltoken==''||_const.zhgluid==''){
             return;
              }else{
               let url=_const.requestUrl+'/hcfsharesmgr/user/entrustTranac';
                    let data={
                     token:this.token,
                      uid:this.uid,
                      page:this.page,
                      size:5,
                      /*scode:this.scode,*/
                      username:_const.chooseitem.username,
                      loginname:_const.chooseitem.loginname,
                      ftime:this.cjsj,
                      sctime:this.nowday,
                      ectime:this.nowday,
                      type:'',
                      status:this.status,
                      scode:this.scode,
                    }
                   let _this=this;
                   $.ajax({
                      url:url, 
                      dataType:"json",   
                      data:data,    //参数值
                      type:"POST",   //请求方式
                      success:function(res){
                      _this.lastPage=res.data.pages;
                        if(res.code==0){                                                    
                          for(var i=0;i<res.data.list.length;i++){  
                             res.data.list[i].type==0?res.data.list[i].type='买入': res.data.list[i].type='卖出';
                            }
                        _this.wtcjList=res.data.list;
                        _this.cjList=res.data.list;   
                        }
                      },          
                      error:function(){
                         _this.$message.error('网络错误');
                      }
              });
       } 
   },
   searchcj(){
    
    this.scode=this.cjscode;
    this.getwtcjlist(); //查询成交
   },
   searchwt(){
     this.scode=this.wtscode;
    this.getwtcjlist(); //查询委托
   },
   gonext(){  //下一页     
    if(this.activeName2=='second'){  

     if(this.page!==this.lastPage){
        this.page=this.page+1;
        this.getchicanglist(); 
       }     
    }else if(this.activeName2=='third'||this.activeName2=='fourth'){
      if(this.page!==this.lastPage && this.lastPage!==0){
        this.page=this.page+1;
          this.getwtcjlist(); 
       }
     
      }
    },
    gopre(){
     if(this.activeName2=='second'){ 
        this.page=this.page-1;
         if(this.ccpage<=0){
          this.page=1;
          return;      
        }else{
           this.getchicanglist(); 
        }
     }else if(this.activeName2=='third'||this.activeName2=='fourth'){
        this.page=this.page-1;
        if(this.page<=0){
          this.page=1;
          return;      
        }else{
           this.getwtcjlist(); 
        }
     } 
       
     },
     gofirst(){
      if(this.activeName2=='second'){
        this.page=1;
        this.getchicanglist(); 
      }else if(this.activeName2=='third'||this.activeName2=='fourth'){
        this.page=1;
         this.getwtcjlist(); 
      }
     },
     golast(){
      if(this.activeName2=='second'){
        this.page=this.lastPage
        this.getchicanglist(); 
      }else if(this.activeName2=='third'||this.activeName2=='fourth'){
        this.page=this.lastPage;
         this.getwtcjlist(); 
      }
     },

   /* gopre(){  //上一页
      this.page=this.page-1;
      if(this.page<=0){
        this.page=1;
        return;      
      }else{
         this.getwtcjlist(); 
      }
    },
    gofirst(){  //第一页
      this.page=1;
      this.getwtcjlist();
    },
    golast(){  //最后一页
     this.page=this.lastPage;
     this.getwtcjlist();
    },*/
    searchlist(){
       this.getwtcjlist(); 
    },
   delcd(){         //撤单
    if(_const.zhgltoken==''||_const.zhgluid==''){
      this.$message.warning('请选中用户');
             return;
              }else{
               let url=_const.requestUrl+'/hcfsharesmgr/user/entrustTranac';
                    let data={
                     token:this.token,
                      uid:this.uid,
                      page:1,
                      size:1000,
                      scode:this.scode,
                      username:_const.chooseitem.username,
                      loginname:_const.chooseitem.loginname,
                      ftime:this.cjsj,
                      ctime:this.nowday,
                      type:'',
                      status:2,
                      scode:this.wtcjscode,
                    }
                   let _this=this;
                   $.ajax({
                      url:url, 
                      dataType:"json",   
                      data:data,    //参数值
                      type:"POST",   //请求方式
                      success:function(res){
                        if(res.code==0){                                                    
                           _this.$message.success('撤单成功');
                        }
                      },          
                      error:function(){
                         _this.$message.error('网络错误');
                      }
              });
       } 
   },  
   handleClick(tab, event) {
      if(this.activeName2=='first'){
       $('.weituo_right,.holdcangtb_right,.holdcangtb_chengjiao').hide();
       $('.feny').hide();
       }
       if(this.activeName2=='second'){           //获取持仓列表
        this.ccpage=1;
        this.cclastPage='';
        $('.holdcangtb_right,.feny').show();
        $('.weituo_right,.holdcangtb_chengjiao').hide();
            this.getchicanglist();
       }
       if(this.activeName2=='third'){             //当日委托
         this.page=1;
        this.lastPage='';
         $('.weituo_right,.feny').show();
         $('.holdcangtb_right,.holdcangtb_chengjiao').hide();
         this.status='';
         this.nowday=this.initnowday();
         this.getwtcjlist();        
       }
       if(this.activeName2=='fourth'){           //成交信息
         this.page=1;
        this.lastPage='';
         $('.holdcangtb_chengjiao,.feny').show();
         $('.holdcangtb_right,.weituo_right').hide();
         this.status=1;
         this.nowday='';
         this.getwtcjlist();

       }
      },

  savecrj(){               //设置保证金
    if(_const.zhgltoken==''||_const.zhgluid==''){  
        this.$message.error('请选中用户');
         }else if(this.amount==''){
          this.$message.error('请设置金额');
         }else{
       let url=_const.requestUrl+'/hcfsharesmgr/user/chargeAndWith';
             let data={
                token:this.token,
                uid:this.uid,
                userId:_const.chooseitem.uid,
                amount:this.amount,
                type:this.zzfx,
                status:this.ywlx,
              }
             let _this=this;
             $.ajax({
                url:url, 
                dataType:"json",   
                data:data,    //参数值
                type:"POST",   //请求方式
                success:function(res){
                  if(res.code==0){ 
                   _this.$message.success('操作成功');   
                    
                  }
                  if(res.code==402){
                     _this.$message.error(res.msg);  
                  }
                },          
                error:function(){
                   _this.$message.error('网络错误');
                }
            });
           }
    },
    allpc(){  //一键平仓
      console.log(_const.zhgltoken);
      if(_const.zhgltoken==''||_const.zhgluid==''){  
           this.$message.error('请选中用户');
           } else{
    this.$confirm('是否全部平仓?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {                  
            let url=_const.requestUrl+'/hcfsharesmgr/money/shoudClose'
            let data={
              token:this.token,
              uid:this.uid,
              userId:_const.zhgluid,
            }
            let _this=this;
             $.ajax({
               url:url, 
                dataType:"json",   
                data:data,    //参数值
                type:"POST",   //请求方式
                success:function(res){
                  if(res.code==0){
                    _this.$message.success(res.meg);
                 }else if(res.code==402){
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userlisbot{
  overflow: hidden;
  background: #fff;
  margin-top: 20px;
  height: 39vh;
  position: relative;
}

.userlisbot>div:nth-child(1){
 margin-left: 10px;
  width: 100%;
  float: right;
  background: #ccc;
}

.crj{
  width: 30%;
}
.crj>p{
  display: flex;
  margin: .1rem 0;
}
.crj>p>span{
font-weight: bold;
font-size: 0.26rem;
}
.crj>p>input{
  width: 145px;
}
.crj>p>select{
  width: 150px;
}
.crj>button{
  border: none;
  padding: 8px 36px;
  color: #fff;
  background: #E65026;
  margin-top: 10px;
  margin-left: 10%;
  border-radius: 4px;
}
.holdcangtb_right,.holdcangtb_chengjiao,.weituo_right{
  position: absolute;
  right: 10px;
  top: 0px;
  z-index: 9999;
  display: none;
}
.holdcangtb_right button,.holdcangtb_chengjiao button,.weituo_right button{
  background:#16191F;
  color: #fff;
  border: none;
  padding: 6px 18px;
  border-radius: 4px;
}
.holdcangtb_right input,.holdcangtb_chengjiao input,.weituo_right input{
 width: 100px;
 padding: 3px 2px;
}
.weituocx,.chengjiaocx,.chichangcx{
display: inline-block;
}
.chichangcx,.weituocx,.chengjiaocx{
  position: relative;
  display: inline-block;
}
.feny{
width: 30%;
margin: auto;
position: absolute;
bottom: 4vh;
left: 50%;
margin-left: -1.3rem;
display: none;
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
