/**
 * api接口的统一出口
 */
// 用户模块接口

import activity from '@/request/api/activity/activity';
import login from '@/request/api/login/login';


// 导出接口
export default {
    activity,
    login
}
