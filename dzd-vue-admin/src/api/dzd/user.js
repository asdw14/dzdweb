import request from '@/utils/request'
const api_name = '/admin/user'

export default{
  // 用户列表分页查询
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/getPageList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  // 根据id获取用户基本信息
  getUserInfoById(id) {
    return request({
      url: `${api_name}/getUserInfoById/${id}`,
      method: 'get'
    })
  },

  getSexSta(){
    return request({
      url: `${api_name}/sexSts`,
      method: 'post'
    })
  }

}
