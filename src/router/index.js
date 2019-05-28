import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/activeDynamic',
      name: '活动动态',
      component:  resolve => require(['../views/activeDynamic/activeDynamic.vue'], resolve),
    },
    {
      path: '/activeShare',
      name: '活动分享',
      component:  resolve => require(['../views/activeShare/activeShare.vue'], resolve),
    },
    {
      path: '/activeRules',
      name: '活动动态',
      component:  resolve => require(['../views/activeDynamic/activeRules.vue'], resolve),
    },
    {
      path: '/activeRecord',
      name: '活动记录',
      component:  resolve => require(['../views/activeRecord/activeRecord.vue'], resolve),
    },
    {
      path: '/comments',
      name: '我要晒单',
      component:  resolve => require(['../views/activeRecord/comments.vue'], resolve),
    },
    {
      path: '/getInfo',
      name: '领取详情',
      component:  resolve => require(['../views/activeRecord/getInfo.vue'], resolve),
    },
    {
      path: '/getProduct',
      name: '礼品领取',
      component:  resolve => require(['../views/activeRecord/getProduct.vue'], resolve)
    },
    {
      path: '/productInfo',
      name: '礼品详情',
      component:  resolve => require(['../views/productInfo/productInfo.vue'], resolve)
    }
  ]
})
