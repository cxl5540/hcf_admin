import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import transmange from '@/pages/transmange'
import windcontrol from '@/pages/windcontrol'
import useraccount from '@/pages/useraccount'
import reportmange from '@/pages/reportmange'
import moneymange from '@/pages/moneymange'
import adminmange from '@/pages/adminmange'
import login from '@/pages/login'
Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    name: 'login',
    component: login
  },
 {
  	path: '/index',
  	name: 'index',
  	component: index
  }, 		   
    {
    path: '/transmange',
    name: 'transmange',
    component: transmange
 },{
    path: '/windcontrol',
    name: 'windcontrol',
    component: windcontrol
 },{
    path: '/useraccount',
    name: 'useraccount',
    component: useraccount
 },{
    path: '/reportmange',
    name: 'reportmange',
    component: reportmange
 },{
    path: '/moneymange',
    name: 'moneymange',
    component: moneymange
 },{
    path: '/adminmange',
    name: 'adminmange',
    component: adminmange
 }
  
  ]
})
