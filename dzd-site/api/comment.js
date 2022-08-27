import request from '@/utils/request'
const api_name = '/api/dzd/comment'
export default {

  //发送一级帖子评论
  commentPush(commentInfo) {
    return request({
      url: `${api_name}/commentPush`,
      method: 'post',
      data : commentInfo
    })
  },

  //获取帖子详情
  getArticleInfo(id) {
    return request({
      url: `${api_name}/getArticleInfo/${id}`,
      method: 'post',
    })
  },

  //根据帖子id获取评论
  getCommentByArticleId(id){
    return request({
      url: `${api_name}/getCommentByArticleId/${id}`,
      method: 'get',
    })
  }

}
