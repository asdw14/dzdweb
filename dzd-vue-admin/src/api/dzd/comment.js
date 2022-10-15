import request from '@/utils/request'
const api_name = '/admin/dzd/comment'

export default{
  getAllPageList(page,limit){
    return request({
      url:`${api_name}/getAllPageList/${page}/${limit}`,
      method : 'get',
    })
  },
  //获取一个文章下的所有评论
  getAllByArticle(articleId){
    return request({
      url:`${api_name}/getAllByArticle/${articleId}`,
      method : 'get',
    })
  },

  //删除评论by Id
  deleteCommentById(id){
    return request({
      url: `${api_name}/deleteCommentById/${id}`,
      method: 'delete'
    })
  },


}
