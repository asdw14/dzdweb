import request from '@/utils/request'
const api_name = '/api/user'
export default {
  //下载记录
  getDownLog() {
    return request({
      url: `${api_name}/getDownLog`,
      method: 'get'
    })
  },

  //浏览记录
  getArticleView(){
    return request({
      url: `${api_name}/getArticleView`,
      method: 'get'
    })
  },

  //点赞记录
  getArticleStar(){
    return request({
      url: `${api_name}/getArticleStar`,
      method: 'get'
    })
  },

  //用户所有信息
  getUserInfo(){
    return request({
      url: `${api_name}/getUserInfo`,
      method: 'get'
    })
  }

}
