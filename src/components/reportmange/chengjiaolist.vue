<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
    <!--   <button style='background:#E65026' @click='download'>导出列表</button> -->
        <span>登录名：</span>
        <input type="text" v-model='dlm'>
        <span>账户名：</span>
        <input type="text" v-model='zhm'>
        <span>股票代码：</span>
        <input type="text" v-model='scode'>
        <span>起始时间：</span>
        <input type="date" style="width:120px" v-model='sctime'>
        <span>终止时间：</span>
        <input type="date" style="width:120px" v-model='ectime'>
        <span>交易方向：</span>
        <select name="" id="" v-model='jyfx'>
          <option value="0">买入</option>
          <option value="1">卖出</option>
        </select>
        <button @click='searchcjlist'>查询</button>
      </div>
    </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      :cell-style="tablepading"
      v-loading='loading'
      :data="tableData3"
       height='60vh'
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
       :width='item.width'    
        >
         <template slot-scope="scope">
              {{scope.row[scope.column.property]}}  <!-- 渲染对应表格里面的内容 -->
          </template>
      </el-table-column> 
    </el-table>
    </div>
    </el-tabs>
  </div>
   <div style='opacity:0'>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      id='export'
      v-loading='loading'
      :data="loadData3"
      height='60vh'
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
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'index',
  components:{
   
  },

  data () {
    return {
     activeName: 'first',
     dlm:'',
     zhm:'',
     cjsj:'',
     jyfx:'',
     scode:'',
     page:1,
     lastPage:'',
     loading:false,
     sctime:'',
     ectime:'',
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
      tile:'成交编号',
       key:'orderid',
       width:'140'

    },{
      tile:'成交时间',
       key:'ftime',
       width:'160'
    },{
      tile:'股票代码',
       key:'scode',
       width:'100'
    },{
      tile:'股票名称',
       key:'sname',
       width:'100'
    },{
      tile:'交易方向',
       key:'type',
       width:'90'
    },{
      tile:'成交数量',
       key:'ccount',
       width:'100'
    },{
      tile:'成交价格',
       key:'cprice',
       width:'90'
    },{
      tile:'成交金额',
       key:'amount',
       width:'100'
    },{
      tile:'佣金',
       key:'tax',
       width:'100'
    },{
      tile:'过户费',
       key:'transfer',
       width:'100'
    },{
      tile:'印花税',
       key:'duty',
       width:'100'
    },{
      tile:'下单类型',
       key:'ordertype',
       width:''
    }],  
   tableData3: [],
   loadData3:[],
       token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){
     if(JSON.parse(localStorage.getItem('ccdata3'))){
        this.tableData3=JSON.parse(localStorage.getItem('ccdata3'));
       }
       if(localStorage.getItem('lastpage3')){
        this.lastPage=localStorage.getItem('lastpage3')
       }
       if(localStorage.getItem('pagenum3')){
        this.page=localStorage.getItem('pagenum3')
       }
  },
  mounted(){
   
  },
  methods:{
    getdata(){    //获取列表数据
      this.loading=true;
     let url=_const.requestUrl+'/hcfsharesmgr/user/entrustTranac';
              let data={
               token:this.token,
                uid:this.uid,
                page:this.page,
                size:10,
                scode:this.scode,
                username:this.zhm,
                loginname:this.dlm,
                type:this.jyfx,
                sctime:this.sctime,
                ectime:this.ectime,
                status:1,
              }
             let _this=this;
             $.ajax({
                url:url, 
                dataType:"json",   
                data:data,    //参数值
                type:"POST",   //请求方式
                success:function(res){
              _this.loading=false;
                  if(res.code==0){
                   _this.lastPage=res.data.pages;                                                    
                   for(var i=0;i<res.data.list.length;i++){  
                       res.data.list[i].type=='0'?res.data.list[i].type='买入': res.data.list[i].type='卖出';
                       res.data.list[i].ordertype==0?res.data.list[i].ordertype='限价': res.data.list[i].ordertype='市价'; 
                      }
                  _this.tableData3=res.data.list;
                   localStorage.setItem('ccdata3',JSON.stringify(res.data.list));
                   localStorage.setItem('lastpage3',res.data.pages);
                    localStorage.setItem('pagenum3',res.data.pageNum);

                  }
                },          
                error:function(){
                 _this.loading=false;
                 _this.$message.error('网络错误');
              }
        });
    },
     download(){
      let url=_const.requestUrl+'/hcfsharesmgr/user/entrustTranac';
             let data={
                token:this.token,
                uid:this.uid,
                page:this.page,
                size:10000000,
                scode:this.scode,
                username:this.zhm,
                loginname:this.dlm,
                ftime:this.cjsj,
                type:this.jyfx,
              }
             let _this=this;
             $.ajax({
                url:url, 
                dataType:"json",   
                data:data,    //参数值
                type:"POST",   //请求方式
                success:function(res){
                  if(res.code==0){                   
                    _this.loadData3=res.data.list; 
                    let wb = XLSX.utils.table_to_book(document.querySelector('#export'));

                      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                      try {
                          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '系统持仓列表.xlsx');
                      } catch (e)
                      {
                          if (typeof console !== 'undefined')
                              console.log(e, wbout)
                      }
                      return wbout
                   
                  }
                },          
                error:function(){
                   _this.loading=false;
                   _this.$message.error('网络错误');
                }
            });
    },
  /*  download(){   //导出列表
       let wb = XLSX.utils.table_to_book(document.querySelector('#export'));

          let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
          try {
              FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '系统持仓列表.xlsx');
          } catch (e)
          {
              if (typeof console !== 'undefined')
                  console.log(e, wbout)
          }
          return wbout
    },*/
    gonext(){  //下一页
     if(this.page!==this.lastPage  && this.lastPage!==0){
         this.page=Number(this.page)+1;
         this.getdata(); 
       }
      },
      gopre(){  //上一页
        this.page=Number(this.page)-1;
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
    searchcjlist(){ //查询列表数据
      this.page=1;
      this.lastPage='';
      this.getdata();
    },
    tablepading({row, column, rowIndex, columnIndex}){ //颜色判断
         if(row.ordertype=='市价'&&column.label=='下单类型'){
           return "color:blue"
         }else if(row.ordertype=='限价'&&column.label=='下单类型'){
           return "color:000"
         }
          if(row.type=='买入'&&column.label=='交易方向'){
           return "color:red"
         }else if(row.type=='卖出'&&column.label=='交易方向'){
           return "color:green"
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
