<template>
  <div>
    <section class="container">
      <el-button type="primary" size="medium" round="true" @click="onshowUpload(true)"

      ><i class="el-icon-upload el-icon--left" ></i>上传</el-button>

      <!--  上传文件  -->

      <el-dialog title="上传后请等待进度条消失，对应文件右边变为绿色的 √ 后再关闭窗口进行其他操作，否则会上传失败" :visible.sync="showUpload"
                 :destroy-on-close = true
                 width="40%"
                 v-loading="loading"
                 element-loading-text="拼命上传中"
                 element-loading-spinner="el-icon-loading"
      >

        请输入资源描述：
        <input v-model="sourceName"
               style="border-radius: 20px;  width: 40%;
            height: 28px;  border-color: #3580DE;
            padding-left: 10px;" type="text"
               required="required"
        />
        <el-divider></el-divider>
        下载所需积分：
        <el-radio v-model="price" label="1" checked >免费</el-radio>
        <el-radio v-model="price" label="2" disabled>付费</el-radio>
        <el-divider></el-divider>
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="url+sourceName+'/'+price"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-progress="onprogress"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          :headers="headers"
          limit="1"
          :on-error="onerror"
          name="file"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">文件大小不能超过500MB</div>
        </el-upload>

<!--        <el-upload-->
<!--          style="text-align: center"-->
<!--          class="upload-demo"-->
<!--          drag-->
<!--          :action="url+currentDirectoryId"-->
<!--          multiple-->
<!--          :headers="headers"-->
<!--          :before-upload="beforeUpload"-->
<!--          limit="10"-->
<!--          name="files"-->
<!--        >-->
<!--          <i class="el-icon-upload"></i>-->
<!--          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--          <div class="el-upload__tip" slot="tip">只能上传不超过1G大小的文件</div>-->
<!--        </el-upload>-->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onshowUpload(false)">关 闭</el-button>
        </div>
      </el-dialog>


        <!--   查找文本框   -->
      <input v-model="searchObj.sourceName"
             style="border-radius: 20px;  width: 150px;
            height: 28px;  border-color: #3399ff;
            padding-left: 10px; margin-left: 66%" type="text"
             placeholder="请输入想搜索的个人资源"

      />
      <!--   查找按钮   -->
      <el-button icon="el-icon-search" circle type="success" size="small" @click="getPublicPageList(1)"></el-button>


      <el-table :data="sourceList" style="width: 100%"
                :default-sort = "{prop: 'downCount', order: 'descending'}"
      >
        <el-table-column label="上传用户"  fixed="left" width="120">
            <template slot-scope="scope">
           <!-- 用户头像 -->
            <div>
                <el-avatar :src="scope.row.avatar" :size="small"></el-avatar>
            </div>
           <!-- 用户昵称 -->
            <div v-if="scope.row.nickname.length < 7">
              <el-link type="primary">{{ scope.row.nickname }}</el-link>
            </div>
              <div v-if="scope.row.nickname.length > 6">
                <el-link type="primary">{{scope.row.nickname.substr(0, 7) }}</el-link>

              </div>
          </template>
        </el-table-column>

        <el-table-column  width="45" fixed="left">
          <!-- 根据文件类型显示对应图标 -->
          <!-- 压缩包 -->
          <template slot-scope="scope">
            <!-- 为文件夹 -->
            <div v-if="scope.row.isDirectory == 1">
              <img src="~/assets/icon/文件夹.png" width="100%" alt="文件夹">
            </div>

            <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) === 'zip' ||

               scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) =='rar'|| scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 )=='7z' "
            >
              <img src="~/assets/icon/压缩包 (1).png" alt="压缩包" width="100%">
            </div >



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

        <el-table-column prop="downCount" label="下载次数" sortable width="100">
        </el-table-column>

        <el-table-column label="上传时间" sortable prop="gmtCreate" width="150" >
          <template slot-scope="scope">
            {{ scope.row.gmtCreate.substr(0, 16) }}
          </template>
        </el-table-column>

<!--        <el-table-column width="50" >-->
<!--          <el-tag type="success" size="small">免费</el-tag>-->
<!--        </el-table-column>-->

        <el-table-column label="类型"  width="70" prop="isDirectory" >
          <!-- 压缩包 -->
          <template slot-scope="scope" fixed="right">
            <!-- 为文件夹 -->
            <div v-if="scope.row.isDirectory == 1">
              <el-tag type="success" effect="plain" size="mini">
                文件夹
              </el-tag>
            </div>

            <div v-else-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) === 'zip' ||

               scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) =='rar'|| scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 )=='7z' "
            >
              <el-tag type="success" effect="plain" size="mini">
                压缩包
              </el-tag>
            </div >

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

        <el-table-column  label="大小"  width="130" fixed="right" sortable prop="fileSize">
          <template slot-scope="scope">
            {{ scope.row.fileSize  == 0 ? 0.01 : scope.row.fileSize}}/MB
          </template>
        </el-table-column>


        <el-table-column fixed="right" width="50">

          <template slot-scope="scope">
            <div v-if="scope.row.isDirectory == 0">
              <a download="" @click="downSource(scope.row.id)">
                <el-button size="mini" type="success" icon="el-icon-download" circle></el-button>
              </a >
            </div>
<!--            <div v-else>-->
<!--              <el-link type="primary" @click="getMemberSourceByDirectory(scope.row.id)">打开</el-link>-->
<!--            </div>-->
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
    @current-change="getPublicPageList"
  />
    </section>
  </div>

</template>
<script>
import source from "@/api/source";
import cookie from "js-cookie";
export default {

  data () {
    return {
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 15, // 每页记录数
      searchObj: {
        sourceName: '',

      },// 查询条件、
      sourceList: [],
      data: {
        sourceName:'',

      },
      showUpload :false,  //显示上传文件窗口
      sourceName:'',
      price : 0,
      url: 'http://localhost:8888/api/oss/source/uploadSource/',
      fileList:[],
      loading:false,

    }
  },

  computed: {
    headers() {
      return {
        "token": cookie.get("dzd_token")
      }
    }
  },



  // asyncData() {
  //   var a = {}
  //   source.getPublicPageList(1, 10,a).then((response) => {
  //               const data = response.data.data
  //               // this.total = response.data.data.total
  //               return { sourceList: data.items}
  //           });
  // },

  //加载完渲染时
  created () {
      this.getPublicPageList()
  },

  methods: {
    //显示公开资源
    getPublicPageList(page=1) {
        this.page = page
        source.getPublicPageList(this.page, this.limit, this.searchObj).then((response) => {
                this.sourceList = response.data.data.items
                this.total = response.data.data.total
            });
    },


    //下载文件
    downSource(id){
      //登录后才可
      if (this.isLongin()!=false){
        source.downSource(id)
      }
    },

    //判断是否已登录
    isLongin() {
      //debugger
      var user = cookie.get("dzd_ucenter");
      if (user == null || user == "") {
        this.$message({
          showClose: true,
          message: "您还未登录哦，请先登录再进行下载^_^",
          type: "error",
        });

        // 3秒后执行跳转至登录页
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
      return true;
    },


//上传前对文件大小进行校验
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 500;
      if (!isLt2M) {
        this.$message.error('上传文件大小大小不能超过 500MB!');
        return isLt2M;
      }
    },

    submitUpload() {
      if (this.sourceName.length<1){
        this.$message({
          type: 'warning',
          message: "资源名称必须填写！"
        })
      }else{
        this.$refs.upload.submit();
        this.loading = true

      }
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(file) {
      console.log(file);
    },

    uploadSuccess(response, file, fileList){
      this.sourceName = ''
      this.loading = false
      this.$message({
        type: 'success',
        message: "上传成功^_^"
      })
    },

    //显示上传文件组件
    onshowUpload(b){
      this.showUpload = b
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    onerror(err, file, fileList){
      this.loading = false
      this.$message({
        type: 'warning',
        message: "上传失败，请重试！"
      })
    },
    onprogress(event, file, fileList){

    }
  }
}
</script>
<style scoped>
  .active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色 */
    color: #aab2bd;
    /* placeholder字体大小 */
    font-size: 12px;
  }
</style>
