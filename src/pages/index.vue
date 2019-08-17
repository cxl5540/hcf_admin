<template>
  <div class="home" >
    <div class="zjjk">
      <Zjjk></Zjjk>     
    </div>
    <div class="cctj">
      <div class="cctj_left">
        <Cctj></Cctj>
      </div>
      <div class="cctj_right">
        <Fktz></Fktz>
      </div>
    </div>
    
  </div>
</template>

<script>
import Zjjk from '../components/index/zjjk'
import Cctj from '../components/index/cctj'
import Fktz from '../components/index/fktz'
export default {
  name: 'index',
  components:{
    Zjjk,
    Cctj,
    Fktz
  },

  data () {
    return {
     
    }
  },
  created(){
     this.quanxian();
  },
  mounted(){
   
  },
  methods:{
     quanxian(){
    console.log(JSON.parse(localStorage.getItem('logindata')));
      let data=JSON.parse(localStorage.getItem('logindata'));
      data[0].prosess==1?$('.index').show():$('.index').hide();
      data[1].prosess==1?$('.trand').show():$('.trand').hide();
      data[2].prosess==1?$('.risk').show():$('.risk').hide();
      data[3].prosess==1?$('.amount').show():$('.amount').hide();
      data[4].prosess==1?$('.report').show():$('.report').hide();
      data[5].prosess==1?$('.money').show():$('.money').hide();
      data[6].prosess==1?$('.system').show():$('.system').hide();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
color: #000;
}
.zjjk{
  height: 40vh;
  background: #fff;
  width: 98%;
  margin: 20px auto 0;
  margin-bottom: 10px;
}
.cctj{
  height: 40vh;
  width: 98%;
  margin:auto;
}
.cctj>div{
  display: inline-block;
  height: 100%;
  width: 49%;
  background: #fff;
}
.cctj>div:nth-child(1){
  float: left;
}
.cctj>div:nth-child(2){
  float: right;
}
</style>
