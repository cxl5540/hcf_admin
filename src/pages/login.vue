<template>
  <div class="login" >
    <div class="uname">
    <span>登录名：</span>
        <input type="text" placeholder="请输入登录名" v-model='username'>
    </div>
    <div class="upwd">
    <span>密码：</span>
        <input type="password" placeholder="请输入密码" v-model='password'>
    </div>
    <button class="btn_login" @click='login'>登录</button>
</div>
</template>

<script>

export default {
  name: 'login',
  components:{

  },

  data () {
    return {
      username:'',
      password:''
    }
   },
   
  created(){
  localStorage.clear();
  },
  mounted(){
   
  },
  methods:{
    login(){    //登录
      let url=_const.requestUrl+'/hcfsharesmgr/login/loginUser'
      let data={login_name:this.username,pwd:this.password}
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              _const.token=res.data[7].token;
              _const.uid=res.data[7].uid;
              localStorage.setItem('token', res.data[7].token);
              localStorage.setItem('uid', res.data[7].uid);
               localStorage.setItem('logindata', JSON.stringify(res.data));
              _const.logindata=res.data;
              _const.oldpassword=_this.password;
              _this.$message.success(res.msg);
              _const.loginusername=_this.username;
             _this.$router.push({path:'/index'});

            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
    width: 5rem;
    margin: auto;
    font-size: 0.30rem;
    border: 1px solid #eee;
    padding: 0.2rem 0.5rem 1.4rem 0.5rem;
    border-radius: 4px;
    background: #fff;
    position: relative;
    top: 3rem;


   
}
.login div{
        margin:1rem 0;
    }
.login div{
    display: flex;
    justify-content: space-between;
}
.login div input{
    padding: 0.1rem 0.1rem;
}
.btn_login{
    border: none;
    background: #E65026;
    color: #fff;
    width: 100%;
    padding: 0.2rem 0;
    border-radius: 4px;
}    
</style>
