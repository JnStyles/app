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
      name: '活动规则',
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
    },
    {
      path: '/person',
      name: '个人中心',
      component:  resolve => require(['../views/personal/person.vue'], resolve)
    },
    {
      path: '/login',
      name: '登陆',
      component:  resolve => require(['../views/login/login.vue'], resolve)
    },
    {
      path: '/registered',
      name: '注册',
      component:  resolve => require(['../views/login/registered.vue'], resolve)
    },
    {
      path: '/forget',
      name: '忘记密码',
      component:  resolve => require(['../views/login/forget.vue'], resolve)
    },
    {
      path: '/addressList',
      name: '地址管理',
      component:  resolve => require(['../views/personal/addressList.vue'], resolve)
    },
    {
      path: '/addAddress',
      name: '增加地址',
      component:  resolve => require(['../views/personal/addAddress.vue'], resolve)
    },
    {
      path: '/moneyDetail',
      name: '彩豆明细',
      component:  resolve => require(['../views/personal/moneyDetail.vue'], resolve)
    }
  ]
})
