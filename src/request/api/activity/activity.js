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

  //

  //商品
  getProductList (params) {
    return axios.get(`${base}/api/product/getProductList`, {params:params});
  },

};

export default activity;
