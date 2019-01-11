import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/views/index/my_index'
import Index from '@/views/index/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      meta: {title: '案例', lable: 'demo'},
      component: demo
    },
    {
      path: '/index',
      name: 'Index',
      meta: {title: '首页', lable: 'Index'},
      component: Index
    },
    {
      path: '/print',
      name: 'print',
      meta: {title: '打印页面', lable: 'print'},
      component: () => import('../views/dome/print-dome.vue')
    }
  ]
})
