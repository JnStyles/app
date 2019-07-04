import Vue from 'vue'
import 'lib-flexible/flexible.js'
// import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from '@/router/index'
import "./wrap.css"
import api from './request/api' // 导入api接口
import Vuex from 'vuex';
import store from './vuex';

Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$store = store;
Vue.use(Vuex)

// var VConsole = require('vconsole');
// var vConsole = new VConsole();

//全局注册组件
import { Group, Cell,CellBox ,XHeader,Swiper,Grid,Icon, GridItem,Marquee, MarqueeItem,SwiperItem,Tab,
  TabItem,Panel,XButton,XProgress,Card,Timeline,TimelineItem,Badge,XTextarea,XInput,Confirm,TransferDom,
  Actionsheet,Flexbox,FlexboxItem,Clocker,Divider,XAddress ,PopupHeader,Popup,CheckIcon,Alert,XSwitch,Checklist,
  CellFormPreview,XTable,XNumber, Checker, CheckerItem,Scroller,Spinner,Sticky,ViewBox,PopupRadio,XDialog,XImg,Previewer,Swipeout, SwipeoutItem, SwipeoutButton
,WechatPlugin,ToastPlugin ,AlertPlugin,ConfirmPlugin,LoadingPlugin,Loading} from 'vux'

Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('panel', Panel)
Vue.component('x-button', XButton)
Vue.component('x-progress', XProgress)
Vue.component('x-header', XHeader)
Vue.component('card', Card)
Vue.component('grid', Grid)
Vue.component('group', Group)
Vue.component('icon', Icon)
Vue.component('grid-item', GridItem)
Vue.component('cell', Cell)
Vue.component('cell-box', CellBox)
Vue.component('timeline', Timeline)
Vue.component('timeline-item', TimelineItem)
Vue.component('badge', Badge)
Vue.component('x-textarea', XTextarea)
Vue.component('x-input', XInput)
Vue.component('confirm', Confirm)
Vue.directive('transfer-dom', TransferDom)
Vue.component('actionsheet', Actionsheet)
Vue.component('swiper', Swiper)
Vue.component('swipe-item', SwiperItem)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('clocker', Clocker)
Vue.component('divider', Divider)
Vue.component('x-address', XAddress)
Vue.component('popup-header', PopupHeader)
Vue.component('popup', Popup)
Vue.component('check-icon', CheckIcon)
Vue.component('alert', Alert)
Vue.component('x-switch', XSwitch)
Vue.component('checklist', Checklist)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('x-table', XTable)
Vue.component('x-number', XNumber)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('scroller', Scroller)
Vue.component('spinner', Spinner)
Vue.component('sticky', Sticky)
Vue.component('view-box', ViewBox)
Vue.component('popup-radio', PopupRadio)
Vue.component('x-dialog', XDialog)
Vue.component('x-img', XImg)
Vue.component('previewer', Previewer)
Vue.component('swipeout', Swipeout)
Vue.component('swipeout-item', SwipeoutItem)
Vue.component('swipeout-button', SwipeoutButton)
Vue.component('loading', Loading)

Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

Vue.use(VueRouter)

// FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log('beforeEachbeforeEachbeforeEachbeforeEach')
  store.commit('updateLoadingStatus', {isLoading: true})
  console.log(to);
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if(to.meta.isLogin){
    if(!localStorage.getItem('token')){
      if(from.fullPath){
        sessionStorage.setItem('goUrl',from.fullPath);
      }
      next('/login');
       return false;
    }
  }
  next();
});

router.afterEach(function (to) {
  console.log('afterEachafterEachafterEachafterEach')
  store.commit('updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
