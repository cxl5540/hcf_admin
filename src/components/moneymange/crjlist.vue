<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
    <!--   <button style='background:#E65026'>导出列表</button> -->
        <span>登录名：</span>
        <input type="text" v-model='dlm'>
        <span>起始时间：</span>
        <input type="date" style="width:120px" v-model='sctime'>
        <span>终止时间：</span>
        <input type="date" style="width:120px" v-model='ectime'>
        <span>转账方向：</span>
        <select name="" id="" v-model='zzfx'>
          <option value="1">充值</option>
          <option value="2">提现</option>
        </select>
        <span>业务类型：</span>
        <select name="" id="" v-model='czlx' v-if='cz'>
          <option value="1">配资入金</option>
          <option value="2">蓝补</option>
           <option value="3">追加保证金</option>
          <option value="4">追加配资</option>
        </select>
        <select name="" id="" v-model='czlx' v-if='tx'>
          <option value="1">出金提现</option>
          <option value="2">提盈</option>
           <option value="3">扣保证金</option>
          <option value="4">扣配资</option>
        </select>
        <button @click='searchlist'>查询</button>
      </div>
    </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
       :cell-style="tablepading"
      height='60vh'
      :data="tableData3"
      stripe
      highlight-current-row    
      :default-sort = "{prop: 'date', order: 'descending'}"
      style="width: 100%;">
      <el-table-column
      v-for="(item,index) in title"
       :label="item.tile"
        sortable 
       :key="item.index" 
       :property="item.key"    
        >
         <template slot-scope="scope">
              {{scope.row[scope.column.property]}}  <!-- 渲染对应表格里面的内容 -->
          </template>
      </el-table-column> 
    </el-table>
    </div>
    </el-tabs>
  </div>
  <div class="feny">
   <div class="fenlt" @click='gofirst'>
     <div class="d4" style='position: absolute;top: 0;right: 6px'></div>
     <div class="d4"></div>
   </div>
    <div class="d4"  @click='gopre'></div>
    <p><span>{{page}}</span>/<span>{{lastPage}}</span></p>
    <div class="d2"  @click='gonext'></div>
    <div class="fenrt"  @click='golast'>
      <div class="d2"></div>
      <div class="d2" style='position: absolute;top: 0;left: 6px'></div>
    </div>
  </div>
 </div>   
</template>

<script>

export default {
  name: 'index',
  components:{
   
  },

  data () {
    return {
     activeName: 'first',
     dlm:'',
     sctime:'',
     zzfx:'',
     czlx:'',
     txlx:'',
     cz:false,
     tx:true,
     lastPage:'',
     page:1,
     ectime:'',
    title:[
    {
      tile:'登录名',
      key:'loginname',
 
    },{
      tile:'账户名',
      key:'username',
 
    },{
      tile:'转账方向',
       key:'type',

    },{
      tile:'业务类型',
       key:'status',
    },{
      tile:'金额',
       key:'amount',
    },{
      tile:'发生时间',
       key:'ctime',
    }],  
   tableData3: [],
    token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  watch:{
    zzfx(val,oldval){ 
    console.log(val);   
      if(val==1){
          this.cz=true;
          this.tx=false;
      }else if(val==2){
         this.cz=false;
          this.tx=true;
      }
    },
  },
  created(){

  },
  mounted(){
   
  },
  methods:{
    getdata(){    //获取列表数据
      let url=_const.requestUrl+'/hcfsharesmgr/money/foundEnyrtGold';
       let data={
          token:this.token,
          uid:this.uid,
          type:this.zzfx,
          loginname:this.dlm,
          status:this.czlx,
          page:this.page,
          size:10,
          ectime:this.ectime,
          sctime:this.sctime
        }
       let _this=this;
       $.ajax({
          url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
                _this.lastPage=res.data.pages;
            for(var i=0;i<res.data.list.length;i++){
             res.data.list[i].type==1?res.data.list[i].type='充值': res.data.list[i].type='提现'
             if(res.data.list[i].type=='充值'&&res.data.list[i].status=='1'){
               res.data.list[i].status='配资入金'
             }else if(res.data.list[i].type=='充值'&&res.data.list[i].status=='2'){
                res.data.list[i].status='蓝补'
              }else if(res.data.list[i].type=='充值'&&res.data.list[i].status=='3'){
                  res.data.list[i].status='追加保证金'
                }else if(res.data.list[i].type=='充值'&&res.data.list[i].status=='4'){
                   res.data.list[i].status='追加配资'
                 }else if(res.data.list[i].type=='提现'&&res.data.list[i].status=='4'){
                   res.data.list[i].status='扣配资'
                 }else if(res.data.list[i].type=='提现'&&res.data.list[i].status=='3'){
                  res.data.list[i].status='扣保证金'
                }else if(res.data.list[i].type=='提现'&&res.data.list[i].status=='2'){
                    res.data.list[i].status='提盈'
                  }else if(res.data.list[i].type=='提现'&&res.data.list[i].status=='1'){
                     res.data.list[i].status='追加配资'
                  }
            } 
            _this.tableData3= res.data.list
            }
          },          
          error:function(){
             _this.$message.error('网络错误');
          }
      });
    },
    gonext(){  //下一页
     if(this.page!==this.lastPage  && this.lastPage!==''){
         this.page=this.page+1;
         this.getdata(); 
       } 
    },
    gopre(){  //上一页
      this.page=this.page-1;
      if(this.page<=0){
        this.page=1;
        return;      
      }else{
         this.getdata(); 
      }
    },
    gofirst(){  //第一页
      this.page=1;
      this.getdata();
    },
    golast(){  //最后一页
     this.page=this.lastPage;
     this.getdata();
    },
    searchlist(){
       this.getdata(); 
    },
  searchlist(){ //搜索列表
    this.getdata();
    },
    tablepading({row, column, rowIndex, columnIndex}){ //颜色判断
       if(row.type=='充值'&&column.label=='转账方向'){
         return "color:red"
       }else if(row.type=='提现'&&column.label=='转账方向'){
         return "color:blue"
       }
     },
  handleClick(){

  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.zjjkcom{
  text-align: right;
  border-bottom: 1px solid #eee;
}
.zjjkcom>div:nth-child(1)>button{
  background:#16191F;
  color: #fff;
  border: none;
  padding: 6px 18px;
  border-radius: 4px;
  margin-right: 10px;
}
.zjjkcom>div:nth-child(1) input{
 width: 120px;
 padding: 3px 2px;
}
.holdcangtb{
  height: 40vh;
}
.feny{
width: 30%;
margin: auto;
position: absolute;
bottom: 16vh;
left: 50%;
margin-left: -24px;
}
.feny div{
  display: inline-block;
}
.feny p{
  display: inline-block;
  font-size: 0.32rem;
    margin: 0 .2rem;
    position: relative;
    top: -0.05rem;
}
.fenrt,.fenlt{
  position: relative;
}
.d2,.d4{
   width: 0; 
 height: 0;
 border-width: 0.2rem;
 border-style: solid; 
}
.d4{
 
 border-color: transparent #000 transparent transparent;
}
.d2{
 border-color: transparent  transparent  transparent #000;
}
</style>
