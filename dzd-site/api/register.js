import request from '@/utils/request'
export default {
      //用户注册
    submitRegister(userInfo) {
        return request({
            url: `/api/user/register`,
            method: 'post',
            data:userInfo
        })
  },
    //根据手机号码发送短信
    getPhoneMessge(phone){
        return request({
            url: `/api/user/phone/send/${phone}`,
            method: 'get',
        })
    }
}