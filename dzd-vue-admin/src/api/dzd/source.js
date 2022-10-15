import request from '@/utils/request'

const api_name = '/admin/oss/source'

export default {
    //上传文件
    upload(sourceInfo){
        return request({
            url : `${api_name}/upload`,
            method: 'post',
            data : sourceInfo
        })

    },

  //主页分页获取公开资源
  getPublicPageList(page,limit,searchObj) {
    return request({
      url: `${api_name}/getPublicPageList/${page}/${limit}`,
      method: 'post',
      data : searchObj
    })
  },
    // 获取资源基本信息
    getSourceInfoById(id){
        return request({
            url : `${api_name}/sourceInfo/${id}`,
            method: 'get',
        })

    },

    //修改资源信息，如名称，下载量之类
    updateSourceInfo(id,sourceInfo){
        return request({
            url : `${api_name}/update/${id}`,
            method: 'put',
            data : sourceInfo
        })

    },

    //根据id修改封禁状态，封禁改为未封禁，未封禁改为封禁
    banById(id){
        return request({
            url: `${api_name}/banById/${id}`,
            method: 'put'
          })
      },

    //删除资源by Id
    removeById(id){
        return request({
            url: `${api_name}/removeById/${id}`,
            method: 'delete'
          })
      },

  //暗箱操作
  operation(operationVo){
    return request({
      url: `${api_name}/operation`,
      method: 'put',
      data : operationVo
    })
  },

}
