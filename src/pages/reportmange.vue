<template>
  <div class="transmange" >
  <div class="tansmange_nav leftnav">
    <ul>
      <li v-bind:class="{activclass:index==activclass}"  v-for="(item,index) in title"  @click="toggleTabs(item.name,index)">{{item.tile}}</li>
    </ul>
  </div>

  <div class="tansmange_content">
<keep-alive include="userchicang">
    <component  :is="currentView">
    </component >
</keep-alive>
 </div>
  </div>
</template>

<script>
import userchicang from '../components/reportmange/userchicang'
import adminchicang from '../components/reportmange/adminchicang'
import weituolist from '../components/reportmange/weituolist'
import chengjiaolist from '../components/reportmange/chengjiaolist'
export default {
  name: 'index',
  components:{
   userchicang,
   adminchicang,
   weituolist,
   chengjiaolist
  },

  data () {
    return {
      activclass: 0,
     currentView: 'userchicang',
       title:[
    {
      name:'userchicang',
      tile:'用户持仓列表',
 
    },{
       name:'adminchicang',
      tile:'系统持仓列表',
 
    },{
        name:'weituolist',
      tile:'委托列表',

    },{
       name:'chengjiaolist',
      tile:'成交列表',
    }],
    }
  },
  created(){
  },
  mounted(){
   
  },
  methods:{
   toggleTabs(tabItem,index) {
       this.currentView = tabItem;
       this.activclass=index;
      

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
.activclass{
  background: #fff;
  color: #000 !important;
   border-left: 3px solid #E65026;
  font-size: 14px;
  padding: 1.5vh 0;
}
.tansmange_content>div{
  margin: 20px 0 0 20px;
}
.tansmange_nav li{
  font-size: 14px;
  padding: 1.5vh 0;
  color: #fff;
}
</style>
