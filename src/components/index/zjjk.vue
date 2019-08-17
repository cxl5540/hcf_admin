<template>
<div>
  <div class="zjjkcom" >
    <div class="zjjk_left">
      <span style='font-size:14px;font-weight:bold'>实时资金监控</span>
    </div>
    <div class="zjjk_right">
      <span>登录名：</span>
      <div class="seachinpt">
      <input type="text" v-model='dlm'>
      </div>
      <button @click='searchssjk'>查询</button>      
    </div>
  </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" style='height:20vh'>
      <el-table
      stripe
        :cell-style="tablepading"
       v-loading="loading"
      highlight-current-row 
      :data="tableData3"
       height="32vh"
       :summary-method="getSummaries" 
       show-summary       
      :default-sort = "{prop: 'date', order: 'descending'}"
      style="width: 100%;">
      <el-table-column
      v-for="(item,index) in title"
       :label="item.tile"
        sortable 
       :key="item.index" 
       :property="item.key"    
        :width="item.width" >
         <template slot-scope="scope">
              {{scope.row[scope.column.property]}}  <!-- 渲染对应表格里面的内容 -->
          </template>
      </el-table-column> 
    </el-table>
    </div>
    </el-tabs>
   <!--   <div class="feny">
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
    </div> -->
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
      searchval:'',
     activeName: 'first',
     loadSign:true,
     dlm:'',
    title:[
    {
      tile:'登录名',
      key:'loginname',
      width:'120'
    },{
      tile:'账户名',
      key:'username',
      width:'120'
    },{
      tile:'手机号',
       key:'tel',
        width:'120'
    },{
      tile:'保证金',
       key:'blance',
       width:'120'
    },{
      tile:'自有资金',
       key:'curOwnFunds',
       width:'120'
    },{
      tile:'配资余额',
       key:'pzye',
        width:'120'
    },{
      tile:'配资金额',
       key:'assets',
        width:'120'
    },{
      tile:'总资产',
       key:'totalAssets',
       width:'120'
    },{
      tile:'开仓成本',
       key:'repCouPrice',
       width:'120'
    },{
      tile:'可取资金',
       key:'ky',
       width:'120'
    },{
      tile:'可用资金',
       key:'ableFunds',
       width:'100'
    },{
      tile:'浮动盈亏',
       key:'fdyk',
       width:'100'
    },{
      tile:'亏损比例',
       key:'fdykb',
       width:'100'
    },{
      tile:'平仓盈亏',
       key:'plus',
       width:'100'
    },{
      tile:'累计盈亏',
       key:'curProfit',
       width:'100'
    },{
      tile:'保证金余额',
       key:'bzjye',
       width:'120'
    },{
      tile:'出入金合计',
       key:'crjhj',
       width:'140'
    }],  
   tableData3: [],
   loading:false,
   lastPage:'',
   page:1,
   total:'',
    timer:'',
    token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),  
    }
  },

  created(){
       this.loading=true;
  
    this.getdata();
  },
  mounted(){
    
    if(_const.week !== 0 && _const.week !== 6){
          if(_const.timeNow > _const.timeDayStart1  && _const.timeNow < _const.timeDayEnd1 || _const.timeNow > _const.timeDayStart2 && _const.timeNow < _const.timeDayEnd2){
  this.timer = setInterval(() => {
                this.getdata();
           }, 10000);
    }
  }
  
  },

  destroyed(){    
    clearInterval(this.timer)  
},
  methods:{
  handleClick(row, event, column){  //选中莫一行
    console.log(row);
  },
  getdata(){
    let url=_const.requestUrl+'/hcfsharesmgr/user/userAssetsSys';
    let data={
     token:this.token,
      uid:this.uid,
      page:this.page,
      size:10000,
      loginname:this.dlm
    }
   let _this=this;
   $.ajax({
      url:url, 
      dataType:"json",   
      data:data,    //参数值
      type:"POST",   //请求方式
      success:function(res){
        if(res.code==0){           
          _this.lastPage=res.data[1].pages; 
            _this.tableData3=res.data[0];
          _this.total= res.data[1].total;
          localStorage.setItem('dada',JSON.stringify(res.data[0]));          
        _this.loading=false;
        }
      },          
      error:function(){
      _this.loading=false;
      _this.$message.error('网络错误');
      }
    });
  },
getdatatime(){
  this.tableData3=[];
    let url=_const.requestUrl+'/hcfsharesmgr/user/userAssetsSys';
    let data={
     token:this.token,
      uid:this.uid,
      page:this.page,
      size:10,
      loginname:this.dlm
    }
   let _this=this;
   $.ajax({
      url:url, 
      dataType:"json",   
      data:data,    //参数值
      type:"POST",   //请求方式
      success:function(res){
        if(res.code==0){
          _this.lastPage=res.data[1].pages; 
          _this.total= res.data[1].total;
         if(this.page==1){
               _this.tableData3=res.data[0]; 
              localStorage.setItem('dada',JSON.stringify(res.data[0]));
              }else{
                   _this.tableData3=JSON.parse(localStorage.getItem('dada'))
                   for(var i=0;i<res.data[0].length;i++){
                    _this.tableData3.push(res.data[0][i]);
                  }
               
              } 
           
        _this.loading=false;
        }
      },          
      error:function(){
      _this.loading=false;
      _this.$message.error('网络错误');
      }
    });
  },
/*  loadMore () {
   if (this.loadSign) {
     this.page++
     this.getdata();
     if (this.page = this.lastPage) {
       this.loadSign = false;
       return;
     }
     setTimeout(() => {
       this.loadSign = true
     }, 1000)
     console.log('到底了', this.page)
   }
 },*/
   gonext(){  //下一页
      this.page=this.page+1;
       this.getdata(); 
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
  searchssjk(){    //查询
    this.tableData3=[];
    this.page=1;
    this.getdata();
  },
  getSummaries(param){  //合计
     const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          if(index==1){
            sums[index] = this.total;
            return;
          }
          const values = data.map(item => Number(item[column.property]));
           if (!values.every(value => isNaN(value))) {        
           if(column.property=='pzye' || column.property=='curOwnFunds' || column.property=='fdyk' || column.property=='plus'|| column.property=='ky') {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr).toFixed(2);

              if (!isNaN(value)) {
               /* console.log(Number(prev + curr).toFixed(2));*/
                return  prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(index==9 || index==4 || index==5 || index==11 || index==12){
              sums[index]= sums[index].toFixed(2)
            }
          }
        }
        });
        return sums;      
  },
  tablepading({row, column, rowIndex, columnIndex}){ //颜色判断
         if(row.fdykb>0&&column.label=='亏损比例'){
           return "color:red"
         }else if(row.fdykb<0&&column.label=='亏损比例'){
           return "color:green"
         }
          if(row.fdyk>0&&column.label=='浮动盈亏'){
           return "color:red"
         }else if(row.fdyk<0&&column.label=='浮动盈亏'){
           return "color:green"
         }
          if(row.plus>0&&column.label=='平仓盈亏'){
           return "color:red"
         }else if(row.plus<0&&column.label=='平仓盈亏'){
           return "color:green"
         }
          if(row.curProfit>0&&column.label=='累计盈亏'){
           return "color:red"
         }else if(row.curProfit<0&&column.label=='累计盈亏'){
           return "color:green"
         }
       }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zjjkcom{
  display: flex;
  justify-content: space-between;
    border-bottom: 1px solid #eee;
}
.zjjkcom>div{
  padding: 10px 2px;
}
.zjjkcom>div:nth-child(1){
  margin-left: 10px;
  border-bottom: 3px solid #E65026;
}
.zjjkcom>div:nth-child(2){
  margin-right: 10px;
}
.zjjkcom>div:nth-child(2)>button{
  background:#16191F;
  color: #fff;
  border: none;
  padding: 6px 18px;
  border-radius: 4px;

}

.zjjkcom>div:nth-child(2) input{
 width: 100%;
 padding: 3px 2px;
 box-sizing: border-box;
}

.seachinpt{
   position: relative;
   display: inline-block;
    width: 36%;
}
.seachlist{
  position: absolute;
  top:0.44rem;
  left:0rem;
  border: 1px solid #eee;
  background: #fff;
  color: #000;
  z-index: 999;
  display: none;
  width: 98%;
}
.seachlist li{
  margin: 10px 0;
}
.feny{
width: 30%;
margin: auto;
/* position: absolute;
bottom: 16vh; */
left: 50%;
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
 border-width: 0.18rem;
 border-style: solid; 
}
.d4{
 
 border-color: transparent #000 transparent transparent;
}
.d2{
 border-color: transparent  transparent  transparent #000;
}
</style>
