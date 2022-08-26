<template>
    <section class="container">
      <br />
      <div style="text-align: center;" >
        <b style="font-size: 30px; margin:0 auto" ><font face="楷体">{{articleInfo.title}}</font></b>
       </div>
    <el-card class="box-card" style="border-radius: 30px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); width: 90%; margin: auto;">
      <!-- 卡片头，包括头像评论点赞阅读数量 -->
        <el-row >
            <el-col :span="1" >
                <div>
                  <el-tag type="success" size="mini">原创</el-tag>
                </div>
            </el-col>

            <!-- 昵称 -->
            <el-col :span="2" :offset="1">
                <div >
                   <div style="font-size:16px; color: #999999;">{{articleInfo.nickname}}</div>
                </div>
            </el-col>
            <!-- 发布时间-->
            <el-col :span="7" >
                <div style="font-size:17px; color: #888888;">
                     <i class="el-icon-time"  style="margin: 0 10px; font-size: 17px; color: #888888">于{{articleInfo.gmtCreate!=null? articleInfo.gmtCreate.substr(0, 16): "1970-11-11 11:11 "}}发布</i>
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
                        <i class="el-icon-view"  style="margin: 0 10px; font-size: 13px; color:  #777777">{{articleInfo.viewCount}}浏览</i>
                    </div>
                </el-col>
                    <!-- 点赞 -->
                <el-col :span="2.5" >
                    <div>
                        <i class="el-icon-thumb"  style="margin: 0 10px; font-size: 13px; color:  #777777" >{{articleInfo.praiseCount}}点赞</i>
                    </div>
                </el-col>
                <!-- 评论 -->
                <el-col :span="2.5" >
                    <div>
                        <i class="el-icon-s-comment"  style="margin: 0 10px; font-size: 13px; color: #777777" >{{articleInfo.commentCount}}评论</i>
                    </div>
                </el-col>

             </el-row>

      <!-- 换行线 -->
       <el-divider></el-divider>
        <br />
        <!-- 正文 -->
      <el-row>
        <el-col :span="20" :offset="2" >
          <div style="letter-spacing: 3.5px;font-size: 17px; line-height:2.3em; color: #404040" v-html="articleInfo.description">

      </div>
        </el-col>
      </el-row>

      <el-row>

        <el-col :span="6" :offset="18" >
            <div style="font-size: 18px; color: #00ABF2;"><b>更新于：{{articleInfo.gmtCreate!=null? articleInfo.gmtCreate.substr(0, 16): "1970-11-11 11:11 "}}</b></div>
         </el-col>
       </el-row>
    </el-card>

<br>
    <el-row>
        <div style="font-size: 22px;">
          文章分类：<el-tag type="success" effect="plain" style="font-size: 19px; border-radius: 30px;">原创</el-tag>
        </div>
        <el-col :span="2" :offset="22" >
           <div style="font-size: 18px;">
             <el-button icon="el-icon-caret-top" size="small" circle></el-button>
             <b>赞同</b>
            </div>
         </el-col>
   </el-row>

    <br />
    <!-- 我的评论 -->
    <el-row>
            <!-- 用户头像 -->
      <el-col :span="1" >
        <div>
          <el-avatar style="font-size:100px"></el-avatar>
        </div>
         </el-col>
         <!-- 评论输入框 -->
          <el-col :span="20" offset="1">
         <div>
          <el-input
          style="font-size: 18px;"
                type="textarea"
                placeholder="请输入你的评论....."
                v-model="textarea"
                maxlength="300"
                show-word-limit
               :autosize="{ minRows: 5, maxRows: 40}"
              >
            </el-input>
         </div>
         </el-col>
       <el-col :span="1" style=" padding:100px 12px; ">
              <el-button type="success" plain size="small">评论</el-button>
       </el-col >
     </el-row>

      &emsp;&emsp;&emsp;<div style="font-size: 25px;"><b>共{{articleInfo.commentCount}}条评论</b></div>
      <!-- 换行线 -->
       <el-divider></el-divider>

<!-- 评论列表 -->

      <el-card shadow="hover" v-for="comment in articleInfo.comments" :key="comment.id" style="border-radius: 13px; width: 80%; margin: auto; margin-bottom:15px; min-height: 150px;">
        <el-row :gutter="20">
          <el-col :span="2" offset="1">
            <div>
              <el-avatar style="font-size:100px" :src="comment.avatar"></el-avatar>
             </div>
            </el-col>
            <!-- 评论 -->
          <el-col :span="18" >
            <div style="font-size: 18px;"><b>{{comment.nickname}}</b></div>
            <div style="letter-spacing: 3px;font-size: 15px; line-height:1.5em; color: #666666">{{comment.content}}</div></el-col>
        </el-row>

        <el-row :gutter="20">
      <!-- 点赞回复 -->
          <el-col :span="6" offset="18">
            <div>
              <el-button  style="font-size: 15px; color:#00A8E9" size="mini" icon="el-icon-caret-top">
                {{comment.praiseCount}}
                </el-button>
                <el-button  style="font-size: 15px; color:forestgreen" size="mini" icon="el-icon-chat-round">
                  回复
                  </el-button>
             </div>
            </el-col>
        </el-row>
        <br />
        <!-- 回复下的回复 -->
          <el-card shadow="hover" v-for="commentChildren in comment.children" :key="commentChildren.id" style="border-radius: 13px; width: 90%; margin: auto;">
            <el-row :gutter="20">
              <el-col :span="2" offset="1">
                <div>
                  <el-avatar style="font-size:100px" :src="comment.avatar"></el-avatar>
                 </div>
                </el-col>
                <!-- 评论 -->
              <el-col :span="18" >
                <div style="font-size: 18px;"><b>用户名</b></div>
                <div style="letter-spacing: 3px;font-size: 17px; line-height:1.5em; color: #666666">
                    {{commentChildren.content}}
                  </div>
                 </el-col>
            </el-row>

            <el-row :gutter="20">
          <!-- 点赞回复 -->
              <el-col :span="6" offset="18">
                <div>
                  <el-button  style="font-size: 15px; color:#00A8E9" size="mini" icon="el-icon-caret-top">
                    {{commentChildren.praiseCount}}
                    </el-button>
                    <el-button  style="font-size: 15px; color:forestgreen" size="mini" icon="el-icon-chat-round">
                      回复
                      </el-button>
                 </div>
                </el-col>
            </el-row>


          </el-card>
            {{comment.children.length>2 ? "加载更多" : ""}}
      </el-card>

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
                }"
                >
                UP
                </div>
            </el-backtop>
    </section>

</template>

<script>
  import article from '@/api/article'
  export default {
      data () {
        return {
          textarea: '', //输入评论的信息
          articleInfo:{}  //帖子详细信息
        }
      },

      asyncData({ params, error }) {
        return {id: params.id}

      },
      //加载完渲染时
      created() {
        //获取文章详情
        this.getArticleInfo()
      },

      methods: {
        //获取文章详情
        getArticleInfo(){
          article.getArticleInfo(this.id).then((response) => {
            console.log(this.id)
                this.articleInfo = response.data.data.item
            });
        }

     },


    }
</script>
<style scoped>

/* 使两个卡片中间有明显间隙 */
    .el-card{
            margin-bottom:10px;
        }
/* 使卡片每行中间有明显间隙 */

    /* .el-row{
        margin:15px;
    } */

    .strong{
        font-family:"楷体";
    }


</style>
