import request from '@/utils/request'
const api_name = '/api/oss/source'
export default {

  //主页分页获取公开资源
  getPublicPageList(page,limit,searchObj) {
    return request({
      url: `${api_name}/getPublicPageList/${page}/${limit}`,
      method: 'post',
      data : searchObj
    })
  }
}