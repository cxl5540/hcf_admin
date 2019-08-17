<template>
  <div class="transmange" >
  <div class="tansmange_nav leftnav">
    <ul>
      <li class="activclass" @click="toggleTabs(userlist)">子账户列表</li>
      <li  @click="toggleTabs(onaccountlist)" style="display:none">在线账户列表</li>
     <!--  <li>子账户</li> -->
    </ul>
  </div>
  <div class="tansmange_content">
    <div :is="currentView">
    </div>
 </div>
  </div>
</template>

<script>
import userlist from '../components/useraccount/userlist'
import onaccountlist from '../components/useraccount/onaccountlist'
export default {
  name: 'index',
  components:{
   userlist,
   onaccountlist
  },

  data () {
    return {
       userlist: 'userlist',
       onaccountlist: 'onaccountlist',
       currentView: 'userlist'
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods:{
   toggleTabs(tabItem) {
       this.currentView = tabItem;
       if(this.currentView=='userlist'){
        $('.tansmange_nav li').eq(0).addClass("activclass");
        $('.tansmange_nav li').eq(1).removeClass("activclass");
       }else{
         $('.tansmange_nav li').eq(1).addClass("activclass");
        $('.tansmange_nav li').eq(0).removeClass("activclass");
       }
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
  background: #F4F4F9; 
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
