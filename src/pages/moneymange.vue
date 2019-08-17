<template>
  <div class="transmange" >
  <div class="tansmange_nav leftnav">
    <ul>
      <li v-bind:class="{activclass:index==activclass}"  v-for="(item,index) in title"  @click="toggleTabs(item.name,index)">{{item.tile}}</li>
    </ul>
  </div>
  <div class="tansmange_content">
    <div :is="currentView">
    </div>
 </div>
  </div>
</template>

<script>
import moneyxinxilist from '../components/moneymange/moneyxinxilist'
import crjlist from '../components/moneymange/crjlist'
import liushuilist from '../components/moneymange/liushuilist'
export default {
  name: 'index',
  components:{
   moneyxinxilist,
   crjlist,
   liushuilist

  },

  data () {
    return {
       activclass: 0,
      currentView: 'moneyxinxilist',
       title:[
       {
      name:'moneyxinxilist',
      tile:'资金信息列表',

    },
    {
      name:'crjlist',
      tile:'出入金列表',
 
    },{
       name:'liushuilist',
      tile:'资金流水列表',
 
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
