/**
 * 登陆模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

/**
 *
 *
 */
const activity = {
  getLoginSmsCode (params) {
    return  axios({method:'post',url:`${base}/art/login/getLoginSmsCode`,data:qs.stringify(params)})
  },

  //首页bannerhe中奖纪录
  getBannerList (params) {
    return axios.get(`${base}/api/product/getBannerList`, {params:params});
  },

  //首页商品分类
  getCategoryList (params) {
    return axios.get(`${base}/api/product/getCategoryList`, {params:params});
  },

  //商品列表
  getProductList (params) {
    return axios.get(`${base}/api/product/getProductList`, {params:params});
  },
   //商品详情
   getProductInfo (params) {
    return axios.get(`${base}/api/product/getProductInfo`, {params:params});
  },

  //活动动态列表
  getProductPeriodsList (params) {
    return axios.get(`${base}/api/product/getProductPeriodsList`, {params:params});
  },
  //
  //商品详情页的活动记录
  getProductPeriodsOrderList (params) {
    return axios.get(`${base}/api/product/getProductPeriodsOrderList`, {params:params});
  },
  //
  //商品详情页的动态列表
  getProductPeriodsDynamic (params) {
    return axios.get(`${base}/api/product/getProductPeriodsDynamic`, {params:params});
  },

  //领取礼品
  getGift (params) {
    return axios.get(`${base}/api/product/getGift`, {params:params});
  },

  //领取礼品详情
  getProductPeriodsInfo (params) {
    return axios.get(`${base}/api/product/getProductPeriodsInfo`, {params:params});
  },

   //活动记录
   getProductPeriodsLog (params) {
    return axios.get(`${base}/api/product/getProductPeriodsLog`, {params:params});
  },

   //校验密码
   verificationPassword (params) {
    return  axios({method:'post',url:`${base}/api/product/verificationPassword`,data:qs.stringify(params)})
  },

  //收货地址列表
  getShippingAddressList (params) {
    return axios.get(`${base}/api/user/getShippingAddressList`, {params:params});
  },

  //添加编辑收货地址列表
  addShippingAddress (params) {
    return  axios({method:'post',url:`${base}/api/user/addShippingAddress`,data:qs.stringify(params)})
  },

  //彩豆明细
  balanceLog (params) {
    return axios.get(`${base}/api/user/balanceLog`, {params:params});
  },

  //获取用户信息
  getUserInfo (params) {
    return axios.get(`${base}/api/user/getUserInfo`, {params:params});
  },

  //活动分享列表
  getShareList (params) {
    return axios.get(`${base}/api/share/getShareList`, {params:params});
  },

  //支付
  doPay (params) {
    return axios.get(`${base}/api/product/doPay`, {params:params});
  },

  //参与详情
  getProductParticipationInfo (params) {
    return axios.get(`${base}/api/product/getProductParticipationInfo`, {params:params});
  },

  //发表分享
  doShare (params) {
    return  axios({method:'post',url:`${base}/api/share/doShare`,data:qs.stringify(params)})
  },

  //活动动态点赞 取消点赞
  shareLike (params) {
    return axios.get(`${base}/api/share/shareLike`, {params:params})
  },

   //活动规则
   getArticlesList (params) {
    return axios.get(`${base}/api/portal/getArticlesList`, {params:params})
  },

  //计算详情
  getCalculateInfo (params) {
    return axios.get(`${base}/api/product/getCalculateInfo`, {params:params})
  },

  //修改资料
  editUser (params) {
    return  axios({method:'post',url:`${base}/api/user/editUser`,data:qs.stringify(params)})
  },

  //删除收获地址
  deleteShippingAddress (params) {
    return  axios({method:'post',url:`${base}/api/user/deleteShippingAddress`,data:qs.stringify(params)})
  },

  //收货地址设置默认
  setDefaultShippingAddress (params) {
    return  axios({method:'post',url:`${base}/api/user/setDefaultShippingAddress`,data:qs.stringify(params)})
  },

  //修改密码
  setPassword (params) {
    return  axios({method:'post',url:`${base}//api/user/login/setPassword`,data:qs.stringify(params)})
  },

  //获取客服电话
  getServiceTel (params) {
    return axios.get(`${base}/api/setting/getServiceTel`, {params:params})
  },

  //付款码详情
  getPayPortalInfo (params) {
    return axios.get(`${base}/api/portal/getPayPortalInfo`, {params:params})
  },

  //获取banner详情
  getPortalInfo (params) {
    return axios.get(`${base}/api/portal/getPortalInfo`, {params:params})
  },
};

export default activity;
