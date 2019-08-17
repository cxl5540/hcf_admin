<template>
  <div >
    <div class="header" v-show='show'>
 <div class="logo"><img src="../../assets/logo1.png" alt=""> <span>宏财富管理端</span></div>
      <div class="navbar">
        <ul>
        <router-link to='/index'>
          <li class="index"><i class='fa fa-home'></i><span>首页</span></li>
        </router-link > 
        <router-link to='/transmange'>
          <li class="trand"><i class='fa fa-user'></i><span>交易管理</span></li>
         </router-link>
         <router-link to='/windcontrol'>
          <li class="risk"><i class='fa fa-flash'></i><span>风控管理</span></li>
         </router-link>
         <router-link to='/useraccount'>
          <li class="amount"><i class='fa fa-money'></i><span>账户管理</span></li>
         </router-link>
         <router-link to='/reportmange'>
          <li class="report"><i class='fa fa-bar-chart'></i><span>报表管理</span></li>
         </router-link>
         <router-link to='/moneymange'>
          <li class="money"><i class='fa fa-rmb'></i><span>资金管理</span></li>
         </router-link>        
         <router-link to='/adminmange'>
          <li class='system'><i class='fa fa-cog'></i><span>系统管理</span></li>
         </router-link>  

        </ul>        
      </div>
      <div class="back"><i class="fa fa-user-o" ></i><span>欢迎您：{{username}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class='esc' @click='goindex'>退出</span></div>
     </div>       
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      show:true,
      username:'',
      token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  watch:{
        $route(to,from){
          if(to.path=='/index'){
            this.show=true;
             this.username=_const.loginusername;
          }
        }
      },
  created(){
   
  },
  mounted(){
   
  },
  methods:{

   goindex(){
    let url=_const.requestUrl+'/hcfsharesmgr/login/exitLog'
      let data={
        token:this.token,
        uid:this.uid
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
              _this.show=false;
              $('footer').hide();
              _this.$router.push({path:'/'})
                localStorage.clear();
            }

          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });

   }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  text-align: left;
  width: 100%;
  background: #16191F;
  color: #fff;
  height: 10vh;
  position: relative;
}
.header div{
  display: inline-block;
  vertical-align: middle;
}
.navbar{
  width: 80%;
}
ul{
  margin-left:.5rem;
}
  li{
    display: inline-block;
    padding: 0px .2rem;
    font-size: 26px;
    height: 100%;
    height: 10vh;
    line-height: 10vh;
  }
a{
color: #fff;
} 
.router-link-exact-active li{
  background: #E65026;
}
ul span{
  display: inline-block;
  margin-left: 10px;
}
.logo{
  height: 70%;
  margin-left: 1%;
  width: 14%;
}
.logo img{
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
.logo span{
  font-size: 0.32rem;
}
.back{
  color: #fff;
  position: absolute;
  right:10vh;
  top: 3.5vh;
}
.esc{
  text-decoration: underline;
  cursor: pointer;
} 
</style>
