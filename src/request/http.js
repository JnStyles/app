/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '@/router//index.js';
import Vue from 'vue'




/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */


/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:

        case 403:

        // 404请求不存在
        case 404:
            Cube.Dialog.$create({
                type: 'alert',
                title: '提示',
            }, (createElement) => {
                return [
                    createElement('p', {
                        'style': {
                            'text-align': 'center'
                        },
                        slot: 'content'
                    },'请求的资源不存在')
                ]
            }).show()
            break;
        case 500:
            console.log('断网处理函数')
            break;
        default:
            console.log(other);
    }};

// 创建axios实例
var instance = axios.create({timeout: 6000 * 10});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(

    config => {
        Vue.$vux.loading.show({
          text: '加载中',
          delay: 800
        });
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        let token = localStorage.getItem('token')?localStorage.getItem('token'):'';
        token && (config.headers['user-token'] = token);
        return config;
    },
    error => Promise.error(error));

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    response => {
        Vue.$vux.loading.hide();
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            console.log(response);
            if(response.data.code =='1'){
                return Promise.resolve(response);
            }else if(response.data.code=='10001'){
              Vue.$vux.alert.show({
                title: '提示',
                content: '身份信息已过期',
                onShow () {
                  console.log('Plugin: I\'m showing')
                },
                onHide () {
                  localStorage.removeItem('token');
                  router.replace({
                    path: '/login',
                    query: {
                      redirect: router.currentRoute.fullPath
                    }
                  });
                  console.log('Plugin: I\'m hiding')
                }
              });
            } else{
              Vue.$vux.alert.show({
                    title: '提示',
                    content:response.data.msg,
                    onShow () {
                      console.log('Plugin: I\'m showing')
                    },
                    onHide () {
                      console.log('Plugin: I\'m hiding now')
                    }
                  })
                 return null;
            }
        } else {
            return Promise.reject(response);
        }
    },
    // 请求失败
    error => {
      Vue.$vux.loading.hide();
      Vue.$vux.alert.show({
        title: '提示',
        content:'网络链接失败',
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding now')
        }
      })
      console.log('请求失败');
        console.log(error);
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            // errorHandle(response.status, response.data.message);
            // return Promise.reject(response);
            return null
        } else {

        }
    });

export default instance;
