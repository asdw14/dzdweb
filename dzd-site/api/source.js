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

  //主页分页查询获取公开资源
  getPublicQueryPageList(page,limit,searchObj) {
    return request({
      url: `${api_name}/getPublicQueryPageList/${page}/${limit}`,
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

  //新建文件夹
  createDirectory(directoryVo) {
    return request({
      url: `${api_name}/createDirectory`,
      method: 'post',
      data : directoryVo
    })
  },

  //上传公共资源
  uploadPublicSource(file,sourceName,price){
    return request({
      url: `${api_name}/uploadSource`,
      method: 'post',
      params : file
    })
  },

  //根据文件夹id获取个人资源
  getMemberSourceByDirectoryId(id,searchObj) {
    return request({
      url: `${api_name}/getMemberSourceByDirectoryId/${id}`,
      method: 'post',
      data : searchObj
    })
  },

  //删除个人资源，文件或文件夹
  deleteSource(id,searchObj) {
    return request({
      url: `${api_name}/deleteSource/${id}`,
      method: 'delete',
    })
  },

  //下载文件增加下载次数
  downSource(id){
    return request({
      url: `${api_name}/getOssUrl/${id}`,
      method: 'post',
    })
  }


}
