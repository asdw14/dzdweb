<template>
  <div class="app-container">
<!--查询表单-->
<el-form :inline="true" class="demo-form-inline">


  <!-- 所属分类：级联下拉列表 -->
  <!-- 一级分类 -->
  <el-form-item label="文章类别" size="mini">
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

    <!-- 根据用户id或文章id搜索 -->
  <el-form-item size="mini">
    <el-input v-model="searchObj.id" placeholder="根据用户id或文章id搜索"/>
  </el-form-item>

  <template size="mini">
    <el-radio v-model="searchObj.isLock" label="1" size="mini">已封禁</el-radio>
  <el-radio v-model="searchObj.isLock" label="0" size="mini" >未封禁</el-radio>
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

  <el-table-column label="发贴用户" align="center">
    <!-- 用户头像 -->
    <template slot-scope="scope">
      <router-link :to="'/dzd/user/list/' + scope.row.memberId">
      <div class="demo-type">
        <div>
          <el-avatar :src="scope.row.avatar"></el-avatar>
        </div>
      </div>

        <!-- 用户昵称 -->
         <el-link type="primary">{{scope.row.nickname}}</el-link>
      </router-link>
    </template>

  </el-table-column>


  <el-table-column label="文章标题" >
    <template slot-scope="scope">
      <div class="info">
        <div class="title">
          <a @click="showArticle(scope.row.id)">{{ scope.row.title }}</a>

        </div>
      </div>
    </template>
  </el-table-column>

  <el-table-column label="发布时间"  width="160" align="center">
    <template slot-scope="scope">
      {{ scope.row.gmtCreate.substr(0, 19) }}
    </template>
  </el-table-column>


  <el-table-column label="价格" width="100" align="center" >
    <template slot-scope="scope">
      {{ Number(scope.row.price) === 0 ? '免费' :
      '$' + scope.row.price.toFixed(2) }}
    </template>
  </el-table-column>
  <el-table-column prop="buyCount" label="购买次数" width="100" align="center" >
    <template slot-scope="scope">
      {{ scope.row.buyCount }}次
    </template>
  </el-table-column>

    <el-table-column prop="buyCount" label="点赞量" width="100" align="center" >
    <template slot-scope="scope">
      {{ scope.row.praiseCount }}次
    </template>
  </el-table-column>

    <el-table-column prop="buyCount" label="浏览量" width="100" align="center" >
    <template slot-scope="scope">
      {{ scope.row.viewCount }}次
    </template>
  </el-table-column>

  <el-table-column label="操作" width="350" align="center">
    <template slot-scope="scope">
      <el-link @click="showArticle(scope.row.id)" type="primary"><i class="el-icon-view  el-icon--left"/>查看</el-link>

<!-- 修改文章浏览量、点赞量、购买量、价格 -->
      <el-button type="text" size="mini" icon="el-icon-s-tools" @click="showOperation(scope.row.id)">暗箱操作
      </el-button>

      <el-dialog :visible.sync="dialogFormVisible" title="修改数据">
        下载价格：<el-input-number v-model="operationVo.price" :min="0" :max="50"></el-input-number><br><br>
        购买次数：<el-input-number v-model="operationVo.buyCount" :min="0" ></el-input-number><br><br>
        点赞次数：<el-input-number v-model="operationVo.praiseCount" :min="0" ></el-input-number><br><br>
        浏览次数：<el-input-number v-model="operationVo.viewCount" :min="0" ></el-input-number><br><br>


        <div slot="footer" class="dialog-footer">
          <el-button @click="closeOperation">取 消</el-button>
          <el-button type="primary" @click="operation">修 改</el-button>
        </div>
      </el-dialog>

      <router-link :to="'/dzd/comment/list/' + scope.row.id" type="primary">
        <el-button type="text" size="mini" icon="el-icon-s-tools">管理评论</el-button>
        </router-link>

      <el-button type="text" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
      <el-button type="text" size="mini" icon="el-icon-setting" @click="lockById(scope.row.id)">
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
<el-backtop></el-backtop>

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
            subSubjectList: [], // 二级分类列表,
            operationVo: {},  //暗箱操作对象vo
            dialogFormVisible :false,
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
            article.getUserPageList(this.page, this.limit, this.searchObj).then(response=>{
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


      // 暗箱操作修改数据
      operation(){
        if (this.operationVo.id != null){
          article.operation(this.operationVo).then( (response) =>{
            this.dialogFormVisible = false
            //刷新页面
            this.getPageList(this.page)

            this.$message({
              type: 'success',
              message: response.message,
            });
          }).catch((response) => {
            this.$message({
              type: 'error',
              message: response.message,
            });
          })
        }
      },

      //显示修改数据页面
      showOperation(id) {
        article.getArticleInfoById(id).then((response) => {
          this.operationVo.id = id
          //浏览量
          this.operationVo.viewCount = response.data.item.viewCount
          //价格
          this.operationVo.price = response.data.item.price
          //购买数量
          this.operationVo.buyCount = response.data.item.buyCount
          //点赞
          this.operationVo.praiseCount = response.data.item.praiseCount

        });
        this.dialogFormVisible = true
      },

      //关闭修改数据页面
      closeOperation(){
        this.operationVo.id = null
        //点赞
        this.operationVo.praiseCount = null
        //价格
        this.operationVo.price = null
        //购买数量
        this.operationVo.buyCount = null
        //浏览量
        this.operationVo.viewCount = null
        this.dialogFormVisible = false

      },


//根据id修改封禁状态，封禁改为未封禁，未封禁改为封禁
    lockById(id){
        article.lockById(id).then(response =>{
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

      //查看文章内容
      showArticle(id){
        this.$router.push(`/dzd/article/id/${id}`)
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
