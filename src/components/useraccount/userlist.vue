<template>
<div>
  <Userlisttop v-on:clild='getdata' v-on:zj='getdata3' v-on:wt='getdata1' v-on:cj='getdata2'></Userlisttop>
   <div class="userlisbot_left">
    <span> 子账户资金信息</span>
    <ul>
      <li><span>保证金:</span><span>{{usermoneyList.blance}}</span></li>
      <li><span>自有资金:</span><span>{{usermoneyList.curOwnFunds}}</span></li>
      <li><span>可取资金:</span><span>{{usermoneyList.ky}}</span></li>
      <li><span>配资金额:</span><span>{{usermoneyList.assets}}</span></li>
      <li><span>总资产：</span><span>{{usermoneyList.totalAssets}}</span></li>
      <li><span>开仓成本：</span><span>{{usermoneyList.repCouPrice}}</span></li>
      <li><span>可用资金：</span><span>{{usermoneyList.ableFunds}}</span></li>
      <li><span>浮动盈亏：</span><span>{{usermoneyList.fdyk}}</span></li>
      <li><span>平仓盈亏：</span><span>{{usermoneyList.plus}}</span></li>
      <li><span>累计盈亏：</span><span>{{usermoneyList.curProfit}}</span></li>
      <li><span style='width:60%'>保证金余额：</span><span>{{usermoneyList.bzjye}}</span></li>
      <li><span>配资余额：</span><span>{{usermoneyList.pzye}}</span></li>
    </ul>
   </div>
  <Userlisbot v-bind:itemdata='itemdata' v-bind:wtdata='wtdata' v-bind:cjdata='cjdata'>
  </Userlisbot>
 </div>   
</template>

<script>
import Userlisttop from './uselisttop'
import Userlisbot from './userlistbot'
export default {
  name: 'index',
  components:{
    Userlisttop,
    Userlisbot,

   
  },

  data () {
    return {
      itemdata:'',
      usermoneyList:'',
      wtdata:'',
      cjdata:''
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods:{
    getdata(data){  //持仓
      this.itemdata=data;    
    },
    getdata1(data){  //委托
       this.wtdata=data;
    },
    getdata2(data){  //成交
       this.cjdata=data;
    },
    getdata3(data){  //资金
       this.usermoneyList=data;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userlisbot_left{
  width: 14%;
  float: left;
  height: 38vh;

}
.userlisbot_left>span{
  display: inline-block;
   border-bottom: 3px solid #E65026; 
   font-weight: bold;
  padding: 4px 0;

}
.userlisbot_left ul{
  height:100%;
  overflow-y: scroll;
  border-top:1px solid #eee;
  text-decoration: none;
    background: #fff; 
    padding-bottom: 30px;  
}
.userlisbot_left ul li{
  display: flex;
  text-align: left;
  margin: .2rem 10px;
  font-size: 0.24rem;

}
.userlisbot_left span:nth-child(1){
  width: 40%;
}
.userlisbot_left span:nth-child(1){
  font-weight: bold;
  width: 60%
}
</style>
