<template>
  <div id="app">
   <Header v-show='hed'></Header>
     <router-view></router-view>
      <footer v-show='show'>
      <span><i class="fa fa-star"></i>版本：</span><span>v1.0.0.23&nbsp;&nbsp;</span>
      <span><i class="fa fa-star"></i>交易服务：</span><span style='color:green'>{{jyfw}}&nbsp;&nbsp;</span>
      <span><i class="fa fa-star"></i>行情服务：</span><span style='color:green'>{{hqfw}}</span>
    </footer>
    
  </div>
</template>

<script>
import Header from './components/navbar/Header'
export default {
  name: 'index',
  name: 'App',
  data(){
    return {
       show:false,
       hqfw:'',
       jyfw:'',
       hed:false,
    }
  },

  components:{
      Header,
  },
    watch:{
        $route(to,from){
          _const.zhgltoken='';
          _const.zhgluid='';
          _const.chooseitem='';
          if(to.path=='/index'){
            this.show=true;
            this.hed=true;
          }
           if(this.$route.path=='/'){
              this.hed=false;
               this.show=false;
           }else{
             this.show=true;
               this.hed=true; 
           }
         /* if(to.path=='/index'||to.path=='/index')*/
        },

      },
  created(){
    if(this.$route.path=='/'){
      this.hed=false;
    }else{
      this.hed=true; 
    }
    this.getdata();
  },
  mounted(){

  },
  methods:{
    getdata(){
      let url='http://47.103.114.28:8888/hcfshares/codeinfo/transService';
       let data={
          token:_const.token,
          uid:_const.uid
        }
       let _this=this;
       $.ajax({
          url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){                            
              console.log(res);
              if(res.data=='a1'){
                _this.jyfw='已连接';
                _this.hqfw='已连接';
              }else if(res.data=='a0'){
                _this.jyfw='已断开';
                _this.hqfw='已断开';
              }else if(res.data=='t0'){
                 _this.jyfw='已断开';
                 _this.hqfw='已连接';
              }
            }
          },          
          error:function(){
             _this.$message.error('网络错误');
          }
      });
    }
  }


}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
    background: #F4F4F9;

}
body{
  margin: 0;
  padding: 0;
  height: 100vh;
  background: #F4F4F9;
   font-size: 0.28rem;
}
li{
  list-style: none;
}
img{
  max-width: 100%;
}
footer {
   text-align: right; 
   line-height: 6vh;
   margin-right:20px;
   margin-top: 10px;
}
footer span{
  line-height: 6vh;

}
.el-button--small{
  font-size: 0.28rem !important;
}
.el-button--primary{
  margin: 60px auto !important;
}
.leftnav{
  background: #2D3441;
 
}
.leftnav li{
   font-size: 22px !important;
}
.el-tabs--card{
  background: #fff;
}
.el-tabs__nav{
  background: #eee;
}
.el-tabs__item{
  color: #000 !important;
}
.is-active{
  background: #2D3441;
  color: #fff !important;
}
.el-table tr{
  font-size: 0.22rem !important;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
  font-size: 0.28rem;
}
.el-table thead{
  color: #000 !important;
}
.has-gutter{
   color: #000 !important; 
}
.el-table__body tr.current-row>td{
  background-color: #F4F4e9 !important;
  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
}
/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #F4F4e9;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
.el-button--small{
  margin: 0 20px;
}
.el-button--text{
  margin-left: 0;
}
.el-radio__label{
  font-size: 0.3rem;
}
.el-radio{
  line-height: 0.6rem;
}
.el-radio__input{
  height: 0.32rem;
}
.el-radio__inner{
  height: 0.28rem;
  width: 0.28rem;
}
.el-table{
  overflow: visible !important;
}
.el-tabs__content{
  overflow: visible !important; 
}
</style>
