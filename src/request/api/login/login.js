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
const login = {
  //登录
  login (params) {
    return axios.get(`${base}/api/user/login/login`, {params:params});
  },
  //注册
  register (params) {
    return axios.get(`${base}/api/user/login/register`, {params:params});
  },
  //重置密码
  passwordReset (params) {
    return axios.get(`${base}/api/user/login/passwordReset`, {params:params});
  },
   //推出登录
   logout (params) {
    return axios.get(`${base}/api/user/login/logout`, {params:params});
  },
}

export default login;
