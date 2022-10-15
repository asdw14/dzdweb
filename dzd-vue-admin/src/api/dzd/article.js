import request from '@/utils/request'

const api_name = '/admin/dzd/article'

export default {
    //添加文章信息
    saveOrPush(articleInfo){
        return request({
            url : `${api_name}/saveOrPush`,
            method: 'post',
            data : articleInfo
        })

    },

    // 获取文章基本信息
    getArticleInfoById(id){
        return request({
            url : `${api_name}/articleInfo/${id}`,
            method: 'get',
        })

    },

  //暗箱操作数据
  operation(operationVo){
    return request({
      url: `${api_name}/operation`,
      method: 'put',
      data : operationVo
    })
  },

    //修改文章信息
    updateArticleInfo(id,articleInfo){
        return request({
            url : `${api_name}/update/${id}`,
            method: 'put',
            data : articleInfo
        })

    },

      //根据id修改发布状态，发布改为未发布，未发布改为发布
      statusById(id){
        return request({
            url: `${api_name}/statusById/${id}`,
            method: 'put'
          })
      },

//根据id修改封禁状态，封禁改为未封禁，未封禁改为封禁
      lockById(id){
        return request({
            url: `${api_name}/lockById/${id}`,
            method: 'put'
          })
      },


    //文章列表分页查询
    getPageList(page,limit,searchObj){
        return request({
            url : `${api_name}/getPageList/${page}/${limit}`,
            method :'post',
            data : searchObj
        })
      },

    //用户文章列表分页查询
    getUserPageList(page,limit,searchObj){
        return request({
            url : `${api_name}/getUserPageList/${page}/${limit}`,
            method :'post',
            data : searchObj
        })
      },

    removeById(id){
        return request({
            url : `${api_name}/removeById/${id}`,
            method :'delete'
        })
      }
}
