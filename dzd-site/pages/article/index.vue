<template>
    <section class="container" style="width: 95%">
      <br />
<!--查询表单-->
<el-form :inline="true" class="demo-form-inline">
    &emsp;    &emsp;
<!--   所属分类：级联下拉列表-->
<!--   一级分类-->
  <el-form-item label="小圈子: " style="border-radius: 30px; margin-left: 10%">
    <el-select
      v-model="searchObj.subjectParentId"
      placeholder="选择进入圈子"
      @change="subjectLevelOneChanged"
      size="small">
      <el-option
        v-for="subject in subjectNestedList"
        :key="subject.id"
        :label="subject.title"
        :value="subject.id"/>
    </el-select>

<!--    &lt;!&ndash; 二级分类 &ndash;&gt;-->
<!--    <el-select v-model="searchObj.subjectId" placeholder="选择分类小类" style="width: 150px;" size="small">-->
<!--      <el-option-->
<!--        v-for="subject in subSubjectList"-->
<!--        :key="subject.id"-->
<!--        :label="subject.title"-->
<!--        :value="subject.id"/>-->
<!--    </el-select>-->
  </el-form-item>

    &emsp;
<!--    <el-radio v-model="searchObj.isFree" label="true" style="color: #303030;"><b>只看免费</b></el-radio>
 -->
<!--    <el-switch-->
<!--      v-model="searchObj.isFree"-->
<!--      inactive-text="只看免费">-->
<!--    </el-switch>-->
    &emsp;
<!--    <el-switch-->
<!--      v-model="searchObj.ishot"-->
<!--      inactive-text="根据热度排序">-->
<!--    </el-switch>-->

  <!-- 标题 -->
  <el-form-item style="border-radius: 30px; margin-left: 20%">
    <input v-model="searchObj.title"
           style="border-radius: 15px;  width: 130px;
            height: 28px;  border-color: #3399ff;
            padding-left: 10px; " type="text"
           placeholder="输入想搜索的帖子"

    />

  </el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="getArticleList()" style="border-radius: 30px" size="small">查询</el-button>

    <el-button type="default" @click="resetData()" style="border-radius: 30px" size="small">清空</el-button>

  <nuxt-link to="./write">
  <el-button type="success" size="medium" round="true" style="margin-right: 5%"><i class="el-icon-edit el-icon--left" ></i>我要发帖</el-button>
  </nuxt-link>

    </el-form>

<!-- 帖子列表 -->
        <el-card class="box-card"  shadow="always" v-for="article in Articlelist" :key="article.id" style="width: 70%">
            <!-- 标题 -->
            <el-row >

                <el-col :span="1" :offset="1">
                    <div v-if="article.memberId==1">
                    <el-tag type="success" size="small" >来自官方</el-tag>
                    </div>
                    <div v-else>
                    <el-tag type="warning" size="small">来自用户</el-tag>
                    </div>
                </el-col>

             <!-- 帖子标题 -->
                <el-col :span="18" :offset="1">
                    <router-link :to="'article/' + article.id ">
                    <strong style="font-size:20px; ">{{article.title}}</strong>
                    </router-link>
                    </el-col>

                <el-col :span="1" :offset="1">
                  <div v-if="article.price==0">
                    <el-tag type="success" size="small">免费</el-tag>
                  </div>
                  <div v-else>
                    <el-tag type="danger">付费{{article.price}}$</el-tag>

                  </div>
                </el-col>

            </el-row>


             <!-- 预览 -->
            <el-row>
                <el-col :span="21" :offset="1">
                    <p style="font-size:15px; color: #606266;" v-html="article.summary"></p>
                    </el-col>
            </el-row>


            <el-row>
                <!-- 用户头像 -->
                <el-col :span="1" :offset="1"><div >
                        <el-avatar :src="article.avatar" size="small" style=""></el-avatar>
                    </div>
                </el-col>
                <!-- 昵称 -->
                <el-col :span="4" >
                    <div style="margin: 0 auto">
                       <div style="font-size:16px; color: #999999;">&emsp;{{article.nickname}}</div>
                    </div>
                </el-col>

                <!-- 发布时间-->
            <el-col :span="7" :offset="8">
                <div style="font-size:1px; color: #888888;">
                     <i class="el-icon-time"  style="margin: 0 10px; font-size: 16px; color: #888888">于{{article.gmtCreate.substr(0, 16)}}发布</i>
                </div>
            </el-col>

            <!-- 浏览量-->
            <el-col :span="1" >
                <div>
                    <i class="el-icon-view"  style=" font-size: 15px; color: deepskyblue">{{article.viewCount}}</i>
                </div>
            </el-col>
                <!-- 点赞 -->
            <el-col :span="1" >
                <div>
                    <i class="el-icon-thumb"  style=" font-size: 15px; color: deepskyblue" >{{article.praiseCount}}</i>
                </div>
            </el-col>
            <!-- 评论 -->
            <el-col :span="1" >
                <div>
                    <i class="el-icon-s-comment"  style=" font-size: 15px; color: deepskyblue" >{{article.commentCount}}</i>
                </div>
            </el-col>
            </el-row>

        </el-card>
        <div style="text-align: center;">
          <el-button type="success" round @click="getNextPageList()" style=" margin: 10px 10px;">点击加载更多</el-button>
         </div>
        <!-- 回到最顶 -->
            <el-backtop :bottom="100">
                <div
                style="{
                    height: 100%;
                    width: 100%;
                    background-color: #f2f5f6;
                    box-shadow: 0 0 6px rgba(0,0,0, .12);
                    text-align: center;
                    line-height: 40px;
                    color: #1989fa;
                    border-radius: 12px;
                }"
                >
                UP
                </div>
            </el-backtop>
    </section>

</template>
<script>
import article from '@/api/article'
import subject from '@/api/subject'

export default {

    data () {
      return {
        page:1,
        limit:10,
        Articlelist:[], //帖子列表
        subjectNestedList: [], // 一级分类列表
        subSubjectList: [], // 二级分类列表
        searchObj: {}, // 查询表单对象
      }
    },

    //加载完渲染时
    created () {
      //获取课程列表
      this.getArticleList()

      //获取分类
      this.initSubjectList()
    },

    methods: {
      //查询帖子列表
        getArticleList(page=1) {
            this.page = page
            article.getArticleList(this.page, this.limit, this.searchObj).then((response) => {
                this.Articlelist = response.data.data.items
                this.total = response.data.data.total
            });
    },

    //加载更多列表 加10条
    getNextPageList(){
      this.limit = this.limit+10;
      this.getArticleList();
    },

     // 初始化分类列表
      initSubjectList(){
        subject.getNestedTreeList().then((response) =>      {
            this.subjectNestedList = response.data.data.items

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
//清空
    resetData(){
        this.searchObj = {}
        this.page = 1
        this.getArticleList()
    },

   }

}

</script>
<style scoped>

/* 使两个卡片中间有明显间隙 */
    .el-card{
            border-radius: 30px;
            width: 80%;
            margin: auto;
            margin-bottom: 5px;
        }
/* 使卡片每行中间有明显间隙 */

    .el-row{
        margin:15px;
    }

    .strong{
        font-family:"楷体";
    }

  input::-webkit-input-placeholder {
    /* placeholder颜色 */
    color: #aab2bd;
    /* placeholder字体大小 */
    font-size: 13px;
  }

</style>
