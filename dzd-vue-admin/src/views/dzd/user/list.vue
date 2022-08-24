<template>
  <div class="app-container">
<!--查询表单-->
<el-form :inline="true" class="demo-form-inline">

<!-- 日期 -->
  <el-form-item  size="mini"  >
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
          />
      </el-form-item>

  <!-- 标题 -->
  <el-form-item size="mini">
    <el-input v-model="searchObj.title" placeholder="文章标题"/>
  </el-form-item>

    <!-- 根据用户id或昵称搜索 -->
  <el-form-item size="mini">
    <el-input v-model="searchObj.id" placeholder="根据用户id或昵称搜索"/>
  </el-form-item>

  <template size="mini">
    <el-radio v-model="searchObj.isDisabled" label="1" size="mini">已封禁</el-radio>
  <el-radio v-model="searchObj.isDisabled" label="0" size="mini" >未封禁</el-radio>
  </template> 
  <el-button type="primary" icon="el-icon-search" @click="getPageList()" size="mini">查询</el-button>
  <el-button type="default" @click="resetData()" size="mini">清空</el-button>
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

  <el-table-column label="用户昵称" align="center">
    <!-- 用户头像 -->
    <template slot-scope="scope">
      <div class="demo-type">
        <div> 
          <el-avatar :src="scope.row.avatar"></el-avatar>
        </div>
      </div>

        <!-- 用户昵称 -->
         <el-link type="primary">{{scope.row.nickname}}</el-link>
    </template>

  </el-table-column>


  <el-table-column label="用户ID" width="200" align="center">
    <template slot-scope="scope">
      <div class="info">
        <div class="id">
          <a href="">{{ scope.row.id }}</a>
        </div>
      </div>
    </template>
  </el-table-column>

<el-table-column prop="mobile" label="绑定手机号" width="200" align="center" >
    <template slot-scope="scope">
      {{ scope.row.mobile }}
    </template>
  </el-table-column>

  <el-table-column prop="credit" label="用户积分" width="100" align="center" >
    <template slot-scope="scope">
      {{ scope.row.credit }} $
    </template>
  </el-table-column>
  
    <el-table-column prop="datasize" label="用户空间" width="100" align="center" >
    <template slot-scope="scope">
      {{ scope.row.surplus/1024 }}/
      {{ scope.row.datasize/1024 }}G
    </template>
  </el-table-column>

  <el-table-column label="性别" width="60" align="center" >
    <template slot-scope="scope">
      {{ scope.row.sex }}
    </template>
  </el-table-column>

  <el-table-column label="年龄" width="60" align="center" >
    <template slot-scope="scope">
      {{ scope.row.age }}
    </template>
  </el-table-column>    

  <el-table-column label="注册时间" align="center">
    <template slot-scope="scope">
      {{ scope.row.gmtModified.substr(0, 10) }}
    </template>
  </el-table-column>


  <el-table-column label="操作" width="350" align="center">
    <template slot-scope="scope">

<!-- 修改文章浏览量、点赞量 -->
        <el-button type="text" size="mini" icon ="el-icon-edit">暗箱操作</el-button>

      <el-button type="text" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
      <el-button type="text" size="mini" icon="el-icon-s-tools" @click="lockById(scope.row.id)">
      {{scope.row.isLock == 0 ? "封禁" : "解封"}}  
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
<!-- 回到顶部 -->
    <el-backtop></el-backtop>
  </div>

</template>

<script>
import user from '@/api/dzd/user'

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
          }
      },
      created(){
          this.fetchData()
      },
    methods:{
        fetchData(){
          if (this.$route.params && this.$route.params.userId) {
            this.searchObj.id = this.$route.params.userId;
          }
            //获取用户列表分页
            this.getPageList()
        },
    
        // 条件查询带分页
        getPageList(page=1){
          this.page = page
          this.listLoading = true
            user.getPageList(this.page, this.limit, this.searchObj).then(response=>{
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        },

//根据id修改封禁状态，封禁改为未封禁，未封禁改为封禁                 
    lockById(id){
        user.lockById(id).then(response =>{
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
          return user.removeById(id)
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
