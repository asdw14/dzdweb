import request from '@/utils/request'
const api_name = '/api/dzd/article'
export default {

  //获取帖子列表
  getArticleList(page,limit,searchObj) {
    return request({
      url: `${api_name}/getPageList/${page}/${limit}`,
      method: 'post',
      data : searchObj
    })
  },

  //获取帖子详情
  getArticleInfo(id) {
    return request({
      url: `${api_name}/getArticleInfo/${id}`,
      method: 'post',
    })
  },

}