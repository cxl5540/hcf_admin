<template>
  <div class="windcontrol" >
  <div class="windcontrol_nav leftnav">
    <ul>
      <li class="jysz firstnav"  @click="toggleTabs(gupiaojy)">股票交易设置</li>
      <li class="yjxc"   @click="toggleTabs(yijianxc)">一键限仓</li>
    </ul>
  </div>
  <div class="windcontrol_content" >
    <div :is="currentView">
    </div>
  </div>
 
  </div>
</template>

<script>
import gupiaojy from '../components/windcontrol/gupiaojy'
import yijianxc from '../components/windcontrol/yijianxc'
export default {
  name: 'index',
  components:{
   gupiaojy,
   yijianxc
  },

  data () {
    return {
      gupiaojy:'gupiaojy',
      yijianxc:'yijianxc',
     currentView: 'gupiaojy',
     activeName: 'first',
     title0:[
    {
      tile:'复选框',
      key:'ggbs',
 
    },{
      tile:'股票代码',
      key:'yjx',
 
    },{
      tile:'股票名称',
       key:'pcx',

    },{
      tile:'股票状态',
       key:'zt',

    }],
    title:[
    {
      tile:'登录名',
      key:'ggbs',
 
    },{
      tile:'状态',
      key:'yjx',
 
    }],
    tableData2: [{
          'ggbs': '2',
          'yjx': '32',
          'pcx': '32',
          'yjbl':'32',
          'yhsbl':'32',
          'zt':'11',

        }],  
   tableData3: [{
          'ggbs': '2',
          'yjx': '32',
          'pcx': '32',
          'yjbl':'32',
          'yhsbl':'32', 
        }]
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods:{
  handleSelectionChange(val){
 console.log(val)
  },
    toggleTabs(tabItem) {
       this.currentView = tabItem;
       console.log(this.currentView);
       if(this.currentView=='gupiaojy'){
         $('.windcontrol_nav li').eq(0).addClass("firstnav");
         $('.windcontrol_nav li').eq(1).removeClass("firstnav");
       }else{
         $('.windcontrol_nav li').eq(1).addClass("firstnav");
         $('.windcontrol_nav li').eq(0).removeClass("firstnav");
       }
     },
  handleClick(){
   
  },
  handleEdit(){

  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.windcontrol{
  width: 100%;
  height: 81vh;
  overflow: hidden;
}
.windcontrol>div{
  display: inline-block;
}
.windcontrol_nav{
  width:10vw;
  height: 90vh;
  float: left;
}
.windcontrol_content>div{
  margin: 20px 0 0 20px;
}
.windcontrol_content{
  width: 88vw;
  height: 88vh;
  background: #fff; 
  float: left;
  margin-top: 2vh;
  margin-left: 1vw;
  text-align: left;
}

li{
  font-size: 14px;
  padding: 1.5vh 0;
  color: #fff;
}
.firstnav{
   background: #fff; 
   color: #000;
   border-left: 3px solid #E65026;
}
input{
  width: 120px;
}
button{
  margin: 0 20px;
  border: none;
  padding: 8px 12px;
  color: #fff;
  border-radius: 4px;
}
input{
  padding: 4px 2px;
}
</style>
