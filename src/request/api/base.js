/**
 * 接口域名的管理
 */
let base ;
if (process.env.NODE_ENV == 'development') {
    base = '/api'
} else if (process.env.NODE_ENV == 'debug') {
    base ='/api';
} else if (process.env.NODE_ENV == 'production') {
    base ='https://6bouseradmin.6bo.pw';
}

export default base;
