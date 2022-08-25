import request from '@/utils/request'
const api_name = '/api/dzd/subject'
export default {

  //获取分类列表
  getNestedTreeList() {
    return request({
      url: `${api_name}/`,
      method: 'get',
    })
  }
}