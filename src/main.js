// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  '../static/js/global.js'
Vue.use(ElementUI)
Vue.config.productionTip = false
import Axios from 'axios'
/*import Vuex from 'vuex'
import store from './store/store'
Vue.use(Vuex)*/
/*Vue.prototype.bus = new Vue(); */
Vue.prototype.initnowday=function(){
    var date=new Date();
    //年
    var year=date.getFullYear();
    //月
    var month=date.getMonth()+1;
    //日
    var day=date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var ss=date.getSeconds();
    var rq=year+'-'+month+'-'+day
     var nowday='';
     return nowday=rq;
}
Vue.directive('loadmore', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function() {
      let sign =100
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
})

Vue.prototype.$axios = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
/*  store,*/
  components: { App },
  template: '<App/>'
})
