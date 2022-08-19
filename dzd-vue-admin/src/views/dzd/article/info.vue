<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新文章</h2>
<el-form label-width="120px">

  <el-form-item label="课程标题">
    <el-input v-model="articleInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目。"/>
  </el-form-item>

<!-- 所属分类：级联下拉列表 -->
<!-- 一级分类 -->
<el-form-item label="文章类别" >
  <el-select
    v-model="articleInfo.subjectParentId"
    placeholder="请选择"  @change="subjectLevelOneChanged">
    <el-option
      v-for="subject in subjectNestedList"
      :key="subject.id"
      :label="subject.title"
      :value="subject.id"/>
  </el-select>
  <!-- 二级分类 -->
    <el-select v-model="articleInfo.subjectId" placeholder="请选择" >
    <el-option
        v-for="subject in subSubjectList"
        :key="subject.value"
        :label="subject.title"
        :value="subject.id"/>
    </el-select>
</el-form-item>


  <el-form-item label="所需积分">
    <el-input-number :min="0" v-model="articleInfo.price" controls-position="right" placeholder="请填写资源所需积分，默认免费"/>
  </el-form-item>

<!-- 课程简介-->
<el-form-item label="文章正文" >
    <tinymce :height="300" v-model="articleInfo.description"/>
</el-form-item>
  
      <el-form-item v-if="this.$route.params && this.$route.params.id">
        <el-button :disabled="saveBtnDisabled" type="primary" @click="updateData">修改文章</el-button>
      </el-form-item>
    <el-form-item v-else>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveData">保存草稿</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="pushData">发布文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import article from '@/api/dzd/article'
import subject from '@/api/dzd/subject'
const defaultForm = {
  title: '',
  subjectId: '',
  subjectParentId: '',
  description: '',
  memberId : 1,
  price: 0,
}

export default {
    components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false ,// 保存按钮是否禁用,
      articleInfo: defaultForm,
      subjectNestedList: [],//一级分类列表
      subSubjectList: [{
          id:'',
          title:''
      }]//二级分类列表
    }
  },

    watch: {
        $route(to, from) {
        console.log('watch $route')
        this.init()
        }
    },

  created() {
    console.log('info created')
    this.init()
  },

  methods: {
    init(){
      //初始化分类列表
          this.initSubjectList()  
        if (this.$route.params && this.$route.params.id) {
        console.log(this.$route.params.id)

          const id = this.$route.params.id
          // 根据id获取文章基本信息
          this.fetchArticleInfoById()
        } else {
            this.articleInfo = { ...defaultForm }
            tinyMCE.activeEditor.setContent('') 
            //初始化分类列表
            this.initSubjectList()
        }
    },

// 根据id获取文章基本信息
    fetchArticleInfoById(){
        article.getArticleInfoById(this.$route.params.id).then(response => {
            this.articleInfo = response.data.item
        }).catch((response) => {
            this.$message({
            type: 'error',
            message: response.message
            })
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
                this.articleInfo.subjectId = ""
            }
        }
    },

    // 保存
    saveData(){
      this.saveBtnDisabled = true
        this.articleInfo.status = "Draft"
        article.saveOrPush(this.articleInfo).then(response =>{
            this.$message({
                type: 'success',
                message: '保存成功!'
        })
            this.$router.push({ path: '/dzd/article/list' })
        }).catch((response) => {
            this.$message({
                type: 'error',
                message: response.message
            })
        })
      this.saveBtnDisabled = false

    },

    // 发布
    pushData(){
      this.saveBtnDisabled = true
      this.articleInfo.status = "Normal"
        article.saveOrPush(this.articleInfo).then(response =>{
            this.$message({
                type: 'success',
                message: '保存成功!'
        })
            this.$router.push({ path: '/dzd/article/list' })
        }).catch((response) => {
            this.$message({
                type: 'error',
                message: response.message
            })
        })
      this.saveBtnDisabled = false

    },
    
    updateData() {
      article.updateArticleInfo(this.$route.params.id,this.articleInfo).then(response =>{
            this.$message({
                type: 'success',
                message: '修改成功!'
        })
            this.$router.push({ path: '/dzd/article/list' })
        }).catch((response) => {
            this.$message({
                type: 'error',
                message: response.message
            })
        })
      this.saveBtnDisabled = false

    },

  }
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>