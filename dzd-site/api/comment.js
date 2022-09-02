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
  },

  //评论点赞
  commentStar(commentId){
    return request({
      url: `${api_name}/commentStar/${commentId}`,
      method: 'post',
    })
  },

  //撤回点赞
  rollbackStar(commentId){
    return request({
      url: `${api_name}/rollbackStar/${commentId}`,
      method: 'delete',
    })
  },

  //根据评论父id和当前评论条数，每次增加10条获取子评论
  getCommentChildrenByParentId(parentId,count){
    return request({
      url: `${api_name}/getCommentChildrenByParentId/${parentId}/${count}`,
      method: 'get',
    })

  }

}
