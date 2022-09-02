<template>
  <section class="container">
    <br />
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
      <el-col :span="2" :offset="22">
        <div style="font-size: 18px">
          <el-button icon="el-icon-caret-top" size="small" circle></el-button>
          <b>赞同</b>
        </div>
      </el-col>
    </el-row>

    <br />
    <!-- 我的评论 -->
    <el-row>
      <!-- 用户头像 -->
      <el-col :span="1">
        <div>
          <el-avatar
            style="font-size: 100px"
            :src="articleInfo.avatar"
          ></el-avatar>
        </div>
      </el-col>
      <!-- 评论输入框 -->
      <el-col :span="20" offset="1">
        <div>
          <el-input
            style="font-size: 18px"
            type="textarea"
            placeholder="请输入你的评论....."
            v-model="commentInfo.content"
            maxlength="300"
            show-word-limit
            :autosize="{ minRows: 5, maxRows: 40 }"
          >
          </el-input>
        </div>
      </el-col>
      <el-col :span="1" style="padding: 100px 12px">
        <el-button type="success" plain size="small" @click="commentPush()"
          >评论</el-button
        >
      </el-col>
    </el-row>

    &emsp;&emsp;&emsp;
    <div style="font-size: 25px">
      <b>共{{ articleInfo.commentCount }}条评论</b>
    </div>
    <!-- 换行线 -->
    <el-divider></el-divider>

    <!-- 评论列表 -->

    <el-card
      shadow="always"
      v-for="comment in articleInfo.comments"
      :key="comment.id"
      style="
        border-radius: 13px;
        width: 80%;
        margin: auto;
        margin-bottom: 5px;
        min-height: 150px;
      "
    >
      <el-row :gutter="20">
        <el-col :span="2" offset="1">
          <div>
            <el-avatar
              style="font-size: 100px"
              :src="comment.avatar"
            ></el-avatar>
          </div>
        </el-col>
        <!-- 评论 -->
        <el-col :span="18">
          <div style="font-size: 16px; color: #1989fa">
            <b>{{ comment.nickname }}</b>
          </div>
          <div
            style="
              letter-spacing: 3px;
              font-size: 15px;
              line-height: 1.5em;
              color: black;
            "
          >
            {{ comment.content }}
          </div>
        </el-col>
      </el-row>

<!--      回复时间-->
      <el-row :gutter="20">
        <el-col :span="5" offset="1" style="color: #777777; margin-top: 12px ">
          回复于：{{
            articleInfo.gmtCreate != null
              ? articleInfo.gmtCreate.substr(0, 16)
              : "1970-11-11 11:11 "
          }}</el-col>
        <!-- 点赞回复 -->
        <el-col :span="6" offset="12">
          <div>
            <el-button
              style="font-size: 15px; color: #00a8e9"
              size="mini"
              icon="el-icon-caret-top"
              @click="commentStar($event,comment.id)"
            >
              {{ comment.praiseCount}}
            </el-button>
            <el-button
              style="font-size: 15px; color: forestgreen"
              size="mini"
              icon="el-icon-chat-round"
              @click="showAlert(comment.id)"
              id="comm"
            >
              回复
            </el-button>

            <!-- bug待修复,隐藏不销毁数据 -->
            <el-dialog
              title="评论内容"
              v-if="dialogFormVisible"
              :visible.sync="dialogFormVisible"
              v-dialogDrag
              :destroy-on-close="true"
              :before-close="handleClose"
            >
              <el-form
                :model="commentInfo"
                destroy-on-close
                v-if="dialogFormVisible"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 7 }"
                  placeholder="请输入内容"
                  v-model="commentInfo.content"
                >
                </el-input>
                {{ commentInfo.parentId }}
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commentPush()"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
<!--      <br />-->
      <!-- 回复下的回复 -->
      <el-card
        shadow="hover"
        v-for="commentChildren in comment.children"
        :key="commentChildren.id"
        style="border-radius: 13px; width: 90%; margin: auto"
      >
        <el-row >
          <el-col :span="2" offset="1" >
            <div>
              <el-avatar
                size="small"
                :src="comment.avatar"
              ></el-avatar>
            </div>
          </el-col>
          <!-- 昵称 -->
          <el-col :span="18" style="margin-top: -5px;margin-left: -10px">
            <div style="font-size: 13px;color: #00baf2"><b>{{ comment.nickname }}</b>
              &nbsp;

              <b v-if="commentChildren.byNickname != '' && commentChildren.byNickname != null" style="margin-top: -5px;font-size: 13px;color: black">
                回复&nbsp;
                <el-link type="success" style="margin-top: -3px; font-size: 13px" v-if="commentChildren.byNickname != '' && commentChildren.byNickname != null">
                  @{{ commentChildren.byNickname }}
                </el-link>
              </b>
            </div>
            <div
              style="
                letter-spacing: 3px;
                font-size: 15px;
                line-height: 1.5em;
                color: #666666;
              "
            >
              {{ commentChildren.content }}
            </div>
          </el-col>

      <!--   被回复人昵称       -->
          <el-col :span="6" >

            </el-col>
        </el-row>

        <el-row >
          <!--        回复日期-->
          <el-col :span="6" offset="1" style="color: #777777; ">
            回复于：{{
              articleInfo.gmtCreate != null
                ? articleInfo.gmtCreate.substr(0, 16)
                : "1970-11-11 11:11 "
            }}</el-col>
          <!-- 点赞回复 -->
          <el-col :span="6" offset="18" style="margin-top: -25px">
            <div>
              <el-button
                style="font-size: 15px; color: #00a8e9"
                size="mini"
                icon="el-icon-caret-top"
                @click="commentStar($event,commentChildren.id)"
              >
                {{commentChildren.praiseCount }}
              </el-button>
              <el-button
                style="font-size: 15px; color: forestgreen"
                size="mini"
                icon="el-icon-chat-round"
                @click = "showAlert(comment.id,comment.memberId)"
              >
                回复
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-link v-if="comment.commentCount >=3 && comment.commentCount > comment.children.length " style="margin-left: 7px" @click="getCommentChildrenByParentId(comment.id,comment.commentCount)">
        共{{comment.commentCount}}条评论，点击查看
      </el-link>
      <el-link v-if="comment.children.length >=3 " style="margin-left: 7px" @click="putCommentChildren(comment.id)">
        收起
      </el-link>
    </el-card>

    <div style="text-align: center; margin-top: 10px; margin-bottom: 8px;">
      <el-link type="success" v-if="isShowMoreComment"><b>点击加载更多评论...</b></el-link>
      <el-link type="success" disabled v-else><b>所有评论已加载...</b></el-link>

    </div>


    <!-- 回到最顶 -->
    <el-backtop :bottom="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        UP
      </div>
    </el-backtop>
  </section>
</template>

<script>
import article from "@/api/article";
import comment from "@/api/comment";
import cookie from "js-cookie";
export default {
  data() {
    return {
      commentInfo: {
        content: "",
        byMemberId: "", //回复给哪个用户
        parentId: "",
      }, //输入评论的信息
      articleInfo: {}, //帖子详细信息
      dialogFormVisible: false,
      dialogFormVisible2: false,
      isShowMoreComment : true, //是否显示展示更多评论

    };
  },

  asyncData({ params, error }) {

    return {
      id: params.id,
    };
  },
  //加载完渲染时
  created() {
    //获取文章详情
    this.getArticleInfo();
  },

  methods: {
    //获取文章详情
    getArticleInfo() {
      article.getArticleInfo(this.id).then((response) => {
        this.articleInfo = response.data.data.item;
      });
    },

    //显示评论弹窗
    showAlert(parentId,memberId){
      this.dialogFormVisible = true
      console.info(parentId)
      this.commentInfo.parentId = parentId
      this.commentInfo.byMemberId = memberId
    },

    //帖子评论通用
    commentPush() {
      //关闭弹窗
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;

      //判断评论是否为空
      if (this.commentInfo.content.length < 1) {
        this.$message({
          showClose: true,
          message: "评论不能为空！",
          type: "error",
        });
      }
      //需要先登录才能评论
      const flag = this.isLongin();
      if (flag == true) {
        if (this.commentInfo.parentId == "" || this.commentInfo.parentId == null) {
          this.commentInfo.articleId = this.commentInfo.parentId;
        }
        this.commentInfo.articleId = this.articleInfo.id
        comment
          .commentPush(this.commentInfo)
          .then((response) => {
            this.$message({
              type: "success",
              message: response.data.message,
            });
          })
          .catch((response) => {
            this.$message({
              type: "error",
              message: response.data.message,
            });
          });
        this.commentInfo.content = "";
        this.commentInfo.parentId = "";
        this.getArticleInfo();
      }
    },

    //显示子评论
    getCommentChildrenByParentId(parentId,count){
      comment.getCommentChildrenByParentId(parentId,count).then((response) => {

        console.info(this.articleInfo.comments.length)
        for (let i = 0; i < this.articleInfo.comments.length; i++) {
            if (this.articleInfo.comments[i].id == parentId){
              this.articleInfo.comments[i].children = response.data.data.items
            }
        }
      });
    },

    //收起子评论
    putCommentChildren(parentId){
      var newComments = [];
      for (let i = 0; i < this.articleInfo.comments.length; i++) {
        if (this.articleInfo.comments[i].id == parentId){
          for (let j = 0; j < 2 ; j++) {
            newComments[j] = this.articleInfo.comments[i].children[j]
          }
          this.articleInfo.comments[i].children = newComments
        }
      }
    },


    //评论点赞
    commentStar(e,id){
      comment.commentStar(id).then((response) => {
        if (response.data.code==20000){
          this.$message({
            type: 'success',
            message: response.data.message
          })
          console.info(e.target.innerText)
          //成功后给点赞量+1
          let falg = e.target.innerText
          e.target.innerText = ''
          e.target.innerText = Number(falg)+1
          // e.currentTarget.icon="el-icon-caret-top"

        }
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.data.message
        })
      });
    },

    //撤回点赞
    rollbackStar(id){
      comment.rollbackStar(id).then((response) => {
        if (response.data.code==20000){
          this.$message({
            type: 'success',
            message: response.data.message
          })
        }
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.data.message
        })
      });
    },

    //根据帖子id获取评论
    getCommentByArticleId() {
      comment.getCommentByArticleId(id).then((response) => {
        this.articleInfo.comments = response.data.data.items;
      });
    },

    //判断是否已登录
    isLongin() {
      //debugger
      var user = cookie.get("dzd_ucenter");
      if (user == null || user == "") {
        this.$message({
          showClose: true,
          message: "您还未进行登录，登录后可评论！3秒后自动跳转至登录页",
          type: "error",
        });

        // 3秒后执行跳转至登录页
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      return true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style scoped>
/* 使两个卡片中间有明显间隙 */
.el-card {
  margin-bottom: 10px;
}

/* 使卡片每行中间有明显间隙 */

/* .el-row{
        margin:15px;
    } */

.strong {
  font-family: "楷体";
}
</style>
