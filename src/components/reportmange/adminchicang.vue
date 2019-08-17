<template>
<div class="holdcangtb">
   <div class="zjjkcom" >
      <div class="zjjk_right">
      <!-- <button style='background:#E65026' @click='download'>导出列表</button> -->
        <span>股票代码：</span>
        <input type="text" v-model='scode'>
        <button @click='searchxtcc'>查询</button>
      </div>
    </div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
       :cell-style="tablepading"
      id='exportTab'
      v-loading='loading'
      :data="tableData3"
      stripe
      height='60vh'
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
     scode:'',
     loading:false,
     page:1,
     lastPage:'',
     title:[{
      tile:'股票代码',
       key:'scode',

    },{
      tile:'股票名称',
       key:'sname',
    },{
      tile:'持仓数量',
       key:'pcount',
    },{
      tile:'成本价',
       key:'pprice',
    },{
      tile:'现价',
       key:'nowPrice',
    },{
      tile:'开仓成本',
       key:'kccb',
    },{
      tile:'可买数量',
       key:'bcount',
    },{
      tile:'冻结数量',
       key:'fcount',
    },{
      tile:'浮动盈亏',
       key:'fdyk',
    },{
      tile:'亏损比例',
       key:'fdykb',
       width:'140'
    }],  
   tableData3: [],
   loadData3:[],
       token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){
    if(JSON.parse(localStorage.getItem('ccdata2'))){
        this.tableData3=JSON.parse(localStorage.getItem('ccdata2'));
       }
       if(localStorage.getItem('lastpage2')){
        this.lastPage=localStorage.getItem('lastpage2')
       }
       if(localStorage.getItem('pagenum2')){
        this.page=localStorage.getItem('pagenum2')
       }
  },
  mounted(){
   
  },
  methods:{
    getdata(){    //获取系统持仓列表数据
      this.loading=true;
      let url=_const.requestUrl+'/hcfsharesmgr/user/systemPositionList';
             let data={
                token:this.token,
                uid:this.uid,
                page:this.page,
                size:10,
                scode:this.scode,
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
                   _this.tableData3=res.data.list;
                   localStorage.setItem('ccdata2',JSON.stringify(res.data.list));
                   localStorage.setItem('lastpage2',res.data.pages);
                    localStorage.setItem('pagenum2',res.data.pageNum);   
                   _this.loading=false;
                  }
                },          
                error:function(){
                   _this.loading=false;
                   _this.$message.error('网络错误');
                }
            });
    },
    download(){
      let url=_const.requestUrl+'/hcfsharesmgr/user/systemPositionList';
             let data={
                token:this.token,
                uid:this.uid,
                page:1,
                size:1000,
                scode:this.scode,
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
                    setTimeout(function(){
                     let wb = XLSX.utils.table_to_book(document.querySelector('#export'));

                            let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                            try {
                                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '用户持仓列表.xlsx');
                            } catch (e)
                            {
                                if (typeof console !== 'undefined')
                                    console.log(e, wbout)
                            }
                            return wbout
                  },500); 
                   
                  }
                },          
                error:function(){
                   _this.loading=false;
                   _this.$message.error('网络错误');
                }
            });
    },
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
    searchxtcc(){
      this.page=1;
      this.lastPage='';
      this.getdata();
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
