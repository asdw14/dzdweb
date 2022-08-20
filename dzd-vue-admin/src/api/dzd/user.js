import request from '@/utils/request'
const api_name = '/admin/user'

export default{
    //用户列表分页查询
    getPageList(page,limit,searchObj){
        return request({
            url : `${api_name}/getPageList/${page}/${limit}`,
            method :'post',
            data : searchObj
        })
      },

}
