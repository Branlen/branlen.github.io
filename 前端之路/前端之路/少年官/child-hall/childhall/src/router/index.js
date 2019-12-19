import Vue from 'vue'
import Router from 'vue-router'
import ativityManage from '../modules/ativityManage.vue'
import attendance from '../modules/attendanceManage.vue'
import classManage from '../modules/classManage.vue'
import contactManage from '../modules/contactManage.vue'
import serverManage from '../modules/serverManage.vue'
import stuManage from '../modules/stuManage.vue'
import login from '../pages/login.vue';
import selClass from '../modules/selClassManage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home/ativity',
      component:ativityManage
    },
    {
      path:'/home/attendance',
      component:attendance
    },
    {
      path:'/home/class',
      component:classManage
    },
    {
      path:'/home/contact',
      component:contactManage
    },
    {
      path:'/home/server',
      component:serverManage
    },
    {
      path:'/home/student',
      component:stuManage
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/home/selClass',
      component:selClass
    },
  ]
})
