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
  },

  //上传图片用的，返回URL
  async uploadContentImg(file) {
    return request({
      url: `/api/oss/file/upload`,
      method: 'post',
      data : file
    })
  },



}
