<template>
  <div class="app-container">
<!--查询表单-->
<el-form :inline="true" class="demo-form-inline">

  <!-- 所属分类：级联下拉列表 -->
  <!-- 一级分类 -->
  <el-form-item label="文章类别">
    <el-select
      v-model="searchObj.subjectParentId"
      placeholder="请选择"
      @change="subjectLevelOneChanged">
      <el-option
        v-for="subject in subjectNestedList"
        :key="subject.id"
        :label="subject.title"
        :value="subject.id"/>
    </el-select>

    <!-- 二级分类 -->
    <el-select v-model="searchObj.subjectId" placeholder="请选择">
      <el-option
        v-for="subject in subSubjectList"
        :key="subject.id"
        :label="subject.title"
        :value="subject.id"/>
    </el-select>
  </el-form-item>

  <!-- 标题 -->
  <el-form-item>
    <el-input v-model="searchObj.title" placeholder="文章标题"/>
  </el-form-item>

  <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
  <el-button type="default" @click="resetData()">清空</el-button>
</el-form>

   <!-- 表格 -->
<el-table
  v-loading="listLoading"
  :data="list"
  element-loading-text="数据加载中"
  border
  fit
  highlight-current-row
  row-class-name="myClassList">

  <el-table-column
    label="序号"
    width="70"
    align="center">
    <template slot-scope="scope">
      {{ (page - 1) * limit + scope.$index + 1 }}
    </template>
  </el-table-column>
  <el-table-column label="发布人" align="center">
    <template slot-scope="scope">
          管理员
    </template>
  </el-table-column>
  <el-table-column label="文章标题" width="300" align="center">
    <template slot-scope="scope">
      <div class="info">
        <div class="title">
          <a href="">{{ scope.row.title }}</a>
          
        </div>
      </div>

    </template>
  </el-table-column>

  <el-table-column label="发布时间" align="center">
    <template slot-scope="scope">
      {{ scope.row.gmtModified.substr(0, 10) }}
    </template>
  </el-table-column>

    <el-table-column label="发布状态" align="center">
    <template slot-scope="scope">
      {{ scope.row.status == 'Normal' ? "已发布" : "未发布" }}
    </template>
  </el-table-column>

  <el-table-column label="价格" width="100" align="center" >
    <template slot-scope="scope">
      {{ Number(scope.row.price) === 0 ? '免费' :
      '$' + scope.row.price.toFixed(0) }}
    </template>
  </el-table-column>
  <el-table-column prop="buyCount" label="购买次数" width="100" align="center" >
    <template slot-scope="scope">
      {{ scope.row.buyCount }}次
    </template>
  </el-table-column>

    <el-table-column prop="buyCount" label="浏览次数" width="100" align="center" >
    <template slot-scope="scope">
      {{ scope.row.viewCount }}次
    </template>
  </el-table-column>

  <el-table-column label="操作" width="350" align="center">
    <template slot-scope="scope">
      <router-link :to="'/dzd/article/info/'+scope.row.id">
        <el-button type="text" size="mini" icon ="el-icon-edit">编辑文章信息</el-button>
      </router-link>
      <el-button type="text" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
      <el-button type="text" size="mini" icon="el-icon-s-tools" @click="statusById(scope.row.id)">
      {{scope.row.status == 'Draft' ? "上线文章" : "下线文章"}}  
      </el-button>
    </template>
  </el-table-column>
</el-table>

<!-- 分页 -->
<el-pagination
  :current-page="page"
  :page-size="limit"
  :total="total"
  style="padding: 30px 0; text-align: center;"
  layout="total, prev, pager, next, jumper"
  @current-change="getPageList"
/>
  </div>
</template>
<script>
import article from '@/api/dzd/article'
import subject from '@/api/dzd/subject'


  export default{
      data(){
          return{
            listLoading: false, // 是否显示loading信息
            list: null, // 数据列表
            total: 0, // 总记录数
            page: 1, // 页码
            limit: 10, // 每页记录数
            searchObj: {},// 查询条件、
            key :0,
            subjectNestedList: [], // 一级分类列表
            subSubjectList: [] // 二级分类列表,
          }
      },
      created(){
          this.fetchData()
      },
    methods:{
        fetchData(){
            //获取文章列表分页
            this.getPageList()
            // 初始化分类列表
          this.initSubjectList()
        },
    
        // 条件查询带分页
        getPageList(page=1){
          this.page = page
          this.listLoading = true
            article.getPageList(this.page, this.limit, this.searchObj).then(response=>{
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        },
      // 初始化分类列表
      initSubjectList(){
        subject.getNestedTreeList().then(response=>{
            this.subjectNestedList = response.data.items

        })
    },
        //获取二级列表
    subjectLevelOneChanged(value){
        for(var i = 0; i<this.subjectNestedList.length; i++){
            if(this.subjectNestedList[i].id == value){
                this.subSubjectList = this.subjectNestedList[i].children
            }
        }
    }, 

    statusById(id){
        article.statusById(id).then(response =>{
            this.$message({
                type: 'success',
                message: '修改成功!'
        })
        this.getPageList()
        }).catch((response) => {
            this.$message({
                type: 'error',
                message: response.message
            })
        })
    },

      //清空
      resetData(){
        this.searchObj = {}
        this.page = 1
        this.getPageList()
      },
      //删除课程by Id
      removeDataById(id,page){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          return article.removeById(id)
        }).then(() => {
          this.getPageList()
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
