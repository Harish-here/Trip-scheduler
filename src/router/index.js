import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Bill from '@/components/Bill'


Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/appointment/',
      name: 'Make',
      component: Bill
    },
    {
      path: '/appointment/list',
      name: 'List',
      component: Hello
    }
  ]
})
