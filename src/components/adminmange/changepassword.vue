<template>
  <div class="changepassword" >
     <p>
     <span>输入原密码：</span>
     <input type="password" v-model='oldpassword'>
     </p>
     <p>
     <span>输入新密码：</span>
     <input type="password" v-model='newpassword'>
     </p>
     <p>
     <span>确认新密码：</span>
     <input type="password" v-model='repassword'>
     </p>
     <button @click='changepassword'>保存</button>   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      oldpassword:'',
      newpassword:'',
      repassword:'',
      token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods:{
    changepassword(){    //登录
      if(this.check()){
        let url=_const.requestUrl+'/hcfsharesmgr/login/updateUserPwd'
        let data={
          token:this.token,
          uid:this.uid,
          ypwd:this.oldpassword,
          pwd:this.newpassword,
          pwdh:this.repassword
        }
        let _this=this;
         $.ajax({
           url:url, 
            dataType:"json",   
            data:data,    //参数值
            type:"POST",   //请求方式
            success:function(res){
              if(res.code==0){
                   _this.$message.success(res.msg+',请重新登录');
                 setTimeout(function(){              
                   _this.$router.push('/')
                },2000);
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
     }  
    },
    check(){

      if(this.newpassword!==this.repassword){
          this.$message.error('确认密码和新密码不等');
          return false;
      }
      return true;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.changepassword>p{
  margin: 40px 20px;
}
.changepassword>p>span{
  font-weight: bold;
}
.changepassword>p>input{
  padding: 4px 2px;
}
button{
  margin-left: 180px;
  border: none;
  background: #E65026;
  padding: 10px 44px;
  color: #fff;
  border-radius: 4px;
}
</style>
