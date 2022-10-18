<template>
  <section class="container" style="width: 85%">

    <br>
    <el-tabs tab-position="left" style="height: 200px;height:100%">
      <el-tab-pane label="个人信息">


      </el-tab-pane>
      <el-tab-pane label="下载记录" @click="getDownLog" :select="getDownLog">

        <el-table :data="sourceList" style="width: 80%; margin-left: 10%" >

          <el-table-column width="45" fixed="left">
            <!-- 根据文件类型显示对应图标 -->
            <!-- 压缩包 -->
            <template slot-scope="scope">
              <!-- 为文件夹 -->
              <div v-if="scope.row.isDirectory == 1">
                <img src="~/assets/icon/文件夹.png" width="100%" alt="文件夹">
              </div>

              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) === 'zip' ||

               scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) =='rar'|| scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 )=='7z' ">
                <img src="~/assets/icon/压缩包 (1).png" alt="压缩包" width="100%">
              </div>



              <!-- 图片 -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'png' ||
               scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) =='jpg'||
                scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1)=='jpge' ">
                <img src="~/assets/icon/图片.png" width="100%" alt="图片">
              </div>

              <!-- txt -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'txt' ">
                <img src="~/assets/icon/txt.png" width="100%" alt="txt">
              </div>



              <!-- 音乐 -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'mp3' ||
             scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1)  =='flac' ">
                <img src="~/assets/icon/音乐.png" width="100%" alt="音乐">
              </div>

              <!-- 视频 -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'mp4' ||
            scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) =='avi'||
            scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) =='flv' ">
                <img src="~/assets/icon/视频.png" width="100%" alt="视频">
              </div>

              <!-- word -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'doc' ||
            scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) =='docx' ">
                <img src="~/assets/icon/word.png" width="100%" alt="word">
              </div>

              <!-- excel -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'xls' ||
             scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) == 'xlsx' ">
                <img src="~/assets/icon/excel.png" width="100%" alt="excel">
              </div>

              <!--  pdf   -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'pdf' ">
                <el-tag type="success" effect="plain" size="mini">
                  <img src="~/assets/icon/pdf.png" width="100%" alt="pdf">
                </el-tag>
              </div>

              <!--exe-->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'exe' ">
                <el-tag type="success" effect="plain" size="mini">
                  <img src="~/assets/icon/exe.png" width="100%" alt="exe">
                </el-tag>
              </div>

              <div v-else>
                <img src="~/assets/icon/文件.png" width="100%" alt="文件">
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="sourceName" fixed="left" label="文件描述">
            <template slot-scope="scope">

              <div v-if="scope.row.isDirectory == '0'">
                <el-link @click="uploadSource(scope.row.id)">
                  {{ scope.row.sourceName }}
                </el-link>
              </div>

              <div v-else>
                <el-link @click="uploadSource(scope.row.id)">
                  {{ scope.row.sourceName }}
                </el-link>
              </div>

            </template>
          </el-table-column>

          <el-table-column label="下载时间" sortable prop="gmtCreate" width="150">
            <template slot-scope="scope">
              {{ scope.row.gmtModified.substr(0, 16) }}
            </template>
          </el-table-column>

          <!--        <el-table-column width="50" >-->
          <!--          <el-tag type="success" size="small">免费</el-tag>-->
          <!--        </el-table-column>-->

          <el-table-column label="类型" width="70" prop="isDirectory">
            <!-- 压缩包 -->
            <template slot-scope="scope" fixed="right">
              <!-- 为文件夹 -->
              <div v-if="scope.row.isDirectory == 1">
                <el-tag type="success" effect="plain" size="mini">
                  文件夹
                </el-tag>
              </div>

              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) === 'zip' ||

               scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) =='rar'|| scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 )=='7z' ">
                <el-tag type="success" effect="plain" size="mini">
                  压缩包
                </el-tag>
              </div>

              <!-- 图片 -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'png' ||
               scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) =='jpg'||
                scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1)=='jpge' ">
                <el-tag type="success" effect="plain" size="mini">
                  图片
                </el-tag>
              </div>

              <!-- txt -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'txt' ">
                <el-tag type="success" effect="plain" size="mini">
                  文本
                </el-tag>
              </div>

              <!-- 音乐 -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'mp3' ||
             scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1)  =='flac' ">
                <el-tag type="success" effect="plain" size="mini">
                  音乐
                </el-tag>
              </div>

              <!-- 视频 -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'mp4' ||
            scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) =='avi'||
            scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) =='flv' ">
                <el-tag type="success" effect="plain" size="mini">
                  视频
                </el-tag>
              </div>

              <!--  pdf   -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'pdf' ">
                <el-tag type="success" effect="plain" size="mini">
                  pdf
                </el-tag>
              </div>

              <!--exe-->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'exe' ">
                <el-tag type="success" effect="plain" size="mini">
                  exe
                </el-tag>
              </div>


              <!-- word -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'doc' ||
            scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) =='docx' ">
                <el-tag type="success" effect="plain" size="mini">
                  Word文档
                </el-tag>
              </div>

              <!-- excel -->
              <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) === 'xls' ||
             scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.')+1) == 'xlsx' ">
                <el-tag type="success" effect="plain" size="mini">
                  Excel
                </el-tag>
              </div>

              <div v-else>
                <el-tag type="success" effect="plain" size="mini">
                  文件
                </el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="大小" width="130" fixed="right" sortable prop="fileSize">
            <template slot-scope="scope">
              {{ scope.row.fileSize  == 0 ? 0.01 : scope.row.fileSize}}/MB
            </template>
          </el-table-column>


          <el-table-column fixed="right" width="50">

            <template slot-scope="scope">
              <a :href="scope.row.sourceOssUrl" >
                <el-button size="mini" type="success" icon="el-icon-download" circle></el-button>
              </a>

            </template>
          </el-table-column>

        </el-table>


      </el-tab-pane>
      <el-tab-pane label="浏览记录" >
        <span style="font-size: 20px;margin-left: 5%;color: #1989fa">
          {{this.articleViewList.length }}条浏览记录
        </span>

        <el-card class="box-card"  shadow="always" v-for="article in articleViewList" :key="article.id" style="width: 80%;margin-left: 10%">
          <!-- 标题 -->
          <el-row >

            <!-- 帖子标题 -->
            <el-col :span="15" :offset="1">
              <router-link :to="'article/' + article.id ">
                <strong style="font-size:20px; ">{{article.title}}</strong>
              </router-link>
            </el-col>
            <!-- 发布时间-->
            <el-col :span="7" :offset="1">
              <div style="font-size:1px; color: #888888;">
                <i class="el-icon-time"  style="margin: 0 10px; font-size: 16px; color: #888888">{{article.gmtModified.substr(0, 16)}}</i>
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
          </el-row>

        </el-card>
        <br>
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

      </el-tab-pane>
      <el-tab-pane label="点赞记录">
        <span style="font-size: 20px;margin-left: 5%;color: #1989fa">
          {{this.articleStarList.length }}条点赞记录
        </span>

        <el-card class="box-card"  shadow="always" v-for="article in articleStarList" :key="article.id" style="width: 80%;margin-left: 10%">
          <!-- 标题 -->
          <el-row >

            <!-- 帖子标题 -->
            <el-col :span="15" :offset="1">
              <router-link :to="'article/' + article.id ">
                <strong style="font-size:20px; ">{{article.title}}</strong>
              </router-link>
            </el-col>
            <!-- 发布时间-->
            <el-col :span="7" :offset="1">
              <div style="font-size:1px; color: #888888;">
                <i class="el-icon-time"  style="margin: 0 10px; font-size: 16px; color: #888888">{{article.gmtModified.substr(0, 16)}}</i>
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
          </el-row>

        </el-card>
        <br>
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
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import user from "../../api/user";

export default {
  data () {
    return {
      //下载记录
      sourceList:[],
      loginInfo:{},
      //浏览记录
      articleViewList :[],
      //点赞记录
      articleStarList:[],

    }
  },

  created() {
    this.getDownLog()
    this.getArticleView()
    this.getArticleStar()
  },

  methods:{

    //浏览记录
    getArticleView(){
      user.getArticleView().then((response) =>{
        this.articleViewList = response.data.data.items
        if (response.data.data.message != null && response.data.data.message != ''){
          this.$message({
            showClose: true,
            message: response.data.data.message,
            type: "success",
          });

        }
      })
    },

    //点赞记录
    getArticleStar(){
      user.getArticleStar().then((response) =>{
        this.articleStarList = response.data.data.items
        if (response.data.data.message != null && response.data.data.message != ''){
          this.$message({
            showClose: true,
            message: response.data.data.message,
            type: "success",
          });

        }
      })
    },


    //下载记录
    getDownLog(){
      user.getDownLog().then((response) =>{
        this.sourceList = response.data.data.items
        if (response.data.data.message!=null && response.data.data.message!=''){
          this.$message({
            showClose: true,
            message: response.data.data.message,
            type: "success",
          });

        }
      })
    }
  }

}
</script>

<style>
/* 使两个卡片中间有明显间隙 */
.el-card{
  border-radius: 10px;
  width: 80%;
  margin: auto;
  margin-bottom: 3px;
}

</style>
