import request from '@/utils/request'
export default {
    //用户登录
    submitLogin(loginVo) {
        return request({
            url: `/api/user/login`,
            method: 'post',
            data:loginVo
        })
  },
    //根据token获取用户信息
    getLoginInfo(){
        return request({
            url: `/api/user/auth/getLoginInfo`,
            method: 'get',
        })
    }
}