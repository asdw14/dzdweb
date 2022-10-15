<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 帖子id -->
      <el-form-item>
        <el-input v-model="articleId" placeholder="输入帖子id"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getCommentByArticleId()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
      v-if="articleId!=null&&articleId!=''"
      :data="commentByArticle"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children'}">
      <el-table-column
        prop="nickname"
        label="评论人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容">
      </el-table-column>
      <el-table-column
        label="评论时间"
        width="160"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate.substr(0, 16) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeCommentById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 表格 -->
    <el-table
      v-else
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      row-class-name="myClassList"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="用户id" width="200" align="center">
        <template slot-scope="scope">
          <!-- 点击跳转到用户管理 -->
            <div>
              <router-link :to="'/dzd/user/list/' + scope.row.memberId" type="primary">{{ scope.row.memberId }}</router-link>
            </div>
        </template>
      </el-table-column>

      <el-table-column prop="content" label="评论内容">
      </el-table-column>

      <el-table-column
        label="评论时间"
        width="160"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate.substr(0, 16) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeCommentById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getAllPageList"
    />

  </div>
</template>
<script>
  import comment from '@/api/dzd/comment'
  import article from "../../../api/dzd/article";
  export default{
      data(){
          return{
            listLoading: false, // 是否显示loading信息
            list: null, // 数据列表
            total: 0, // 总记录数
            page: 1, // 页码
            limit: 30, // 每页记录数
            articleId: null,// 帖子id
            commentByArticle:[],
          }
      },
      created(){
        if (this.$route.params && this.$route.params.id){
          this.articleId = this.$route.params.id
          this.getCommentByArticleId()
        }else {
          this.getAllPageList(1)
        }
      },
    methods:{
        //根据文章id获取所有评论
        getCommentByArticleId(){
          comment.getAllByArticle(this.articleId).then((response) =>{
            this.commentByArticle = response.data.items
          })
        },

        // 条件查询带分页
      getAllPageList(page=1){
          this.page = page
          this.listLoading = true
            comment.getAllPageList(this.page, this.limit).then(response=>{
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        },

      //清空
      resetData(){
        this.searchObj = {}
        this.page = 1
        this.getList()
      },
      //删除by Id
      removeCommentById(id){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          return comment.deleteCommentById(id)
        }).then(() => {
          //刷新页面数据
          if (this.articleId != null && this.articleId != ''){
            this.getAllPageList(this.page)
          }else {
            this.getCommentByArticleId()
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch((response) => { // 失败
          if (response === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
	},
  }

}
</script>
