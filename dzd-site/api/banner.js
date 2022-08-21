import request from '@/utils/request'
const api_name = '/api/event/banner'
export default {
  getList() {
    return request({
      url: `${api_name}/getAllBanner`,
      method: 'get'
    })
  }
}