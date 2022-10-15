<template>

  <div class="app-container">
    <div style="text-align: center;">
      <b style="font-size: 30px; margin: 0 auto">
        <font face="楷体">{{ articleInfo.title }}</font>
      </b>
    </div>
    <el-card
      class="box-card"
      style="
        border-radius: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: auto;
      "
    >
      <!-- 卡片头，包括头像评论点赞阅读数量 -->
      <el-row>
        <el-col :span="1">
          <div>
            <el-tag type="success" size="mini">原创</el-tag>
          </div>
        </el-col>

        <!-- 昵称 -->
        <el-col :span="2" :offset="1">
          <div>
            <div style="font-size: 16px; color: #999999">
              {{ articleInfo.nickname }}
            </div>
          </div>
        </el-col>
        <!-- 发布时间-->
        <el-col :span="7">
          <div style="font-size: 17px; color: #888888">
            <i
              class="el-icon-time"
              style="margin: 0 10px; font-size: 17px; color: #888888"
            >于{{
                articleInfo.gmtCreate != null
                  ? articleInfo.gmtCreate.substr(0, 16)
                  : "1970-11-11 11:11 "
              }}发布</i
            >
          </div>
        </el-col>
      </el-row>
      <el-row>
        <!-- 用户头像 -->
      </el-row>

      <el-row>
        <el-col :span="1" :offset="2">
          <el-avatar :src="articleInfo.avatar" size="small"></el-avatar>
        </el-col>
        <!-- 分类-->
        <!-- <el-col :span="6" :offset="1">
                  <div>
                      文章分类：
                  </div>
              </el-col> -->

        <!-- 浏览量-->
        <el-col :span="2.5" :offset="15">
          <div>
            <i
              class="el-icon-view"
              style="margin: 0 10px; font-size: 13px; color: #777777"
            >{{ articleInfo.viewCount }}浏览</i
            >
          </div>
        </el-col>
        <!-- 点赞 -->
        <el-col :span="2.5">
          <div>
            <i
              class="el-icon-thumb"
              style="margin: 0 10px; font-size: 13px; color: #777777"
            >{{ articleInfo.praiseCount }}点赞</i
            >
          </div>
        </el-col>
        <!-- 评论 -->
        <el-col :span="2.5">
          <div>
            <i
              class="el-icon-s-comment"
              style="margin: 0 10px; font-size: 13px; color: #777777"
            >{{ articleInfo.commentCount }}评论</i
            >
          </div>
        </el-col>
      </el-row>

      <!-- 换行线 -->
      <el-divider></el-divider>
      <br />
      <!-- 正文 -->
      <el-row>
        <el-col >
          <!--          style="
                        letter-spacing: 3.5px;
                        font-size: 17px;
                        line-height: 2.3em;
                        color: #404040;
                      "-->
          <mavon-editor
            v-html="articleInfo.description"
          ></mavon-editor>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6" :offset="18">
          <div style="font-size: 18px; color: #00abf2">
            <b
            >更新于：{{
                articleInfo.gmtCreate != null
                  ? articleInfo.gmtCreate.substr(0, 16)
                  : "1970-11-11 11:11 "
              }}</b
            >
          </div>
        </el-col>
      </el-row>
    </el-card>

    <br />
    <el-row>
      <div style="font-size: 22px">
        文章分类：<el-tag
        type="success"
        effect="plain"
        style="font-size: 19px; border-radius: 30px"
      >原创</el-tag
      >
      </div>

    </el-row>

    <br />
  </div>
</template>

<script>
import article from '@/api/dzd/article'

export default {
  data() {
    return {
      articleInfo: {}, //帖子详细信息

    };
  },
  created() {
    //获取文章详情
    this.getArticleInfo();
  },
  methods: {
    //获取文章详情
    getArticleInfo() {
      if (this.$route.params && this.$route.params.id) {
        this.id = this.$route.params.id
        article.getArticleInfoById(this.id).then((response) => {
          this.articleInfo = response.data.item;
        });
      }

    },
  },

}
</script>

<style scoped>

</style>
