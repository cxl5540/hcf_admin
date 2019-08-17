<template>
  <div class="transmange" >
  <div class="tansmange_nav leftnav">
    <ul>
      <li>交易费用设置</li>
    </ul>
  </div>
  <div class="tansmange_content">
  <div>
      <div>
        <span>佣金设置(‰)</span>
        <span>
        <input type="number" v-model='jyyj'>
        </span>
        <span>备注：买入或卖出成功后扣除的手续费</span>
      </div>
      <div>
        <span>印花税设置(‰)</span>
        <span>
        <input type="number" v-model='yhs'>
        </span>
        <span>备注：卖出成功后扣除的服务费</span>
      </div>
      <div>
        <span>过户费(‰)</span>
        <span>
        <input type="number" v-model='ghs'>
        </span>
        <span></span>
      </div>
      <div>
        <span>最低过户费</span>
        <span>
        <input type="number" v-model='minghs'>
        </span>
        <span></span>
      </div>
      <div >
        <span>最低交易费</span>
        <span>
        <input type="number" v-model='minjyyj'>
        </span>
        <span></span>
      </div>
      <hr>
      <div>
        <span>预警线</span>
        <span>总亏损&nbsp;>=&nbsp;<input class="set" type="text" v-model='yjx'>&nbsp;%时</span>
        <span>备注：提示预警，亏损/自有资金>=设置值</span>
      </div>
      <div>
        <span>平仓线</span>
        <span>总亏损&nbsp;>=&nbsp;<input class="set" type="text" v-model='pcx'>&nbsp;%时</span>
        <span>备注：强制平仓，亏损/自有资金>=设置值</span>
      </div>
      <hr>
        <div class="table-b"> 
        <table  border="0" cellspacing="0" cellpadding="0"> 
        <tr> 
        <th width='200'>风控项目</th> 
        <th  width='100'>涨跌幅值(%)</th> 
        <th >风控说明</th>
         <th>开关</th> 
        </tr> 
        <tr> 
        <td>涨幅值设置</td> 
        <td><input type="text" v-model='zfval'></td> 
        <td >股票可以卖出委托和卖出成功但是不能买入委托和买入成功</td> 
         <td>
            <el-switch
              v-model="zfopen">
            </el-switch>
          </td> 
        </tr> 
        <tr> 
        <td>跌幅值设置</td> 
        <td><input type="text" v-model='dfval'></td> 
        <td>股票，不可以买入委托和买入成功，也不能卖出委托和卖出成功</td> 
         <td>
            <el-switch
              v-model="dfopen">
            </el-switch>
          </td> 
        </tr> 
        </table> 
        </div>    
      <div>
       <el-button styele='margin:60px auto' type="primary"  @click='saveset'>保存</el-button>
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
     jyyj:'',
     yhs:'',
     yjx:'',
     pcx:'',
     ghs:'',
     minghs:'',
     minjyyj:'',
     zfval:'',
     dfval:'',
     zfopen:'',
      dfopen:'',
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
  getdata(){              //获取交易参数
    let url=_const.requestUrl+'/hcfsharesmgr/tranc/foundTrancManager';
      let data={
        token:this.token,
        uid:this.uid,
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              _this.jyyj=res.data.jyyj;
              _this.yhs=res.data.yhs;
              _this.yjx=res.data.yjx;
              _this.pcx=res.data.pcx;
              _this.ghs=res.data.ghs;
              _this.minghs=res.data.minghs;
             _this.minjyyj=res.data.minjyyj;
             _this.dfval=res.data.low;
              _this.zfval=res.data.high;
              res.data.lowstatus==0?_this.dfopen=true:_this.dfopen=false;
              res.data.highstatus==0?_this.zfopen=true:_this.zfopen=false;
            }
          },          
          error:function(){
             _this.$message.error('网络错误');
          }
      });

  },  
  saveset(){              //设置交易参数
      let zfopen='';
      let dfopen='';
      this.zfopen==true?zfopen=0:zfopen=1;
      this.dfopen==true?dfopen=0:dfopen=1;
     let url=_const.requestUrl+'/hcfsharesmgr/tranc/updateTrancManager';
      let data={
        token:this.token,
        uid:this.uid,
        jyyj:this.jyyj,
        yhs:this.yhs,
        yjx:this.yjx,
        pcx:this.pcx,
        ghs:this.ghs,
        mingfs:this.mingfs,
        minjyyj:this.minjyyj,
        low:this.dfval,
        high:this.zfval,
        highstatus:zfopen,
        lowstatus:dfopen,
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

            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error('网络错误');
          }
      });

  },
  check(){
    if(this.jyyj<=0||this.yhs<=0||this.yjx<=0||this.pcx<=0){
       this.$message.error('设置参数必须大于0');
      return false;
    }
     return true;
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transmange{
  width: 100%;
  height: 81vh;
  overflow: hidden;
}
.transmange>div{
  display: inline-block;
}
.tansmange_nav{
  width:10vw;
  height: 90vh;
  float: left;
}
.tansmange_content{
  width: 88vw;
  height: 88vh;
  background: #fff; 
  float: left;
  margin-top: 2vh;
  margin-left: 1vw;
  text-align: left;
}
li{
  background: #fff;
  color: #000;
   border-left: 3px solid #E65026;
  font-size: 14px;
  padding: 1.5vh 0;
}
.tansmange_content>div{
  margin: 20px 0 0 20px;
}
.tansmange_content>div>div{
  width: 50vw;
  text-align: left;
  display: flex;
  margin: 20px 0;
      font-size: 0.28rem;

}
 .tansmange_content>div>div>span:nth-child(1){

width: 22%;
}
.tansmange_content>div>div>span:nth-child(2){
width: 28%;
}
.tansmange_content>div>div>span:nth-child(3){
width: 50%;
}
.set{
  width: 45px;
}
.table-b table td{
  border:1px solid #eee;
  padding: 4px;
} 
.table-b input{
  padding: 5px 0;
}
</style>
