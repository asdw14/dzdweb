<template>
  <!-- <div> -->
    <section class="container" >
      <el-button type="primary" size="medium" round="true"><i class="el-icon-upload el-icon--left" ></i>上传</el-button>
      <el-button size="small" round="true" style="color: #3399ff;" @click="CreateDirectoryVisible = true">
        <i class="el-icon-folder-add el-icon--left" >

      </i>新建文件夹</el-button>
      <el-button type="danger" size="small" round="true"><i class="el-icon-delete el-icon--left" ></i>删除勾选</el-button>

    <!--  返回上一级目录-->
      <el-button v-if="this.currentDirectoryId != '0'" type="success" size="small" round="true"
      @click="getMemberSourceByDirectory(parentDirectoryId)"
                 style="float: right"
      >
        <i class="el-icon-back el-icon--left" ></i>返回上一级
      </el-button>


<!--   新建文件夹   -->
      <el-dialog title="新建文件夹名称" :visible.sync="CreateDirectoryVisible"
                 :destroy-on-close = true
                 width="45%">

<!--    文本框输入文件夹名限制35字    -->
        <el-input type="text" placeholder="请输入文件夹名称" v-model="directoryVo.sourceName"
                  maxlength="35" show-word-limit style="width: 70%">

        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelDirectory">取 消</el-button>
          <el-button type="primary" @click="createDirectory">确 定</el-button>
        </div>
      </el-dialog>

      <el-table :data="sourceList" style="width: 90%;margin: auto;"
                @select="(selection,row)=>{selectHandle(selection,row)}"
                :default-sort = "{prop: 'isDirectory', order: 'descending'}"
      >

        <el-table-column
          ref="tick"
          type="selection"
          width="45">
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
                <img src="~/assets/icon/压缩包 (1).png" alt="压缩包">
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

           <div v-else>
               <img src="~/assets/icon/文件.png" width="100%" alt="文件">
             </div>
            </template>
        </el-table-column>

        <el-table-column prop="sourceName" fixed="left" label="文件名">
          <template slot-scope="scope">

            <div v-if="scope.row.isDirectory == '0'">
              <el-link>
                {{ scope.row.sourceName }}
              </el-link>
            </div>

            <div v-else>
              <el-link @click="getMemberSourceByDirectory(scope.row.id)">
                {{ scope.row.sourceName }}
              </el-link>
            </div>



          </template>
        </el-table-column>

        <el-table-column prop="downCount" label="下载次数" >
        </el-table-column>

        <el-table-column label="上传时间" sortable prop="gmtCreate">
            <template slot-scope="scope">
              {{ scope.row.gmtCreate.substr(0, 16) }}
          </template>
        </el-table-column>

        <el-table-column label="类型"  width="80" prop="isDirectory" sortable>
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
            {{ scope.row.fileSize}}/MB
          </template>

        </el-table-column>


        <el-table-column fixed="right" width="50">

          <template slot-scope="scope">
            <div v-if="scope.row.isDirectory == 0">
              <a :href="scope.row.sourceOssUrl">
                <el-button size="mini" type="success" icon="el-icon-download" circle></el-button>
              </a>
            </div>
            <div v-else>
              <el-link type="primary" @click="getMemberSourceByDirectory(scope.row.id)">打开</el-link>
            </div>
          </template>

        </el-table-column>
        <el-table-column fixed="right" width="40">
          <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
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
  <!-- </div> -->

</template>
<script>
import source from "@/api/source";
import cookie from "js-cookie";
export default {

  data () {
    return {
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {},// 查询条件、
      sourceList: [],
      checkedList:[], //勾选列表
      CreateDirectoryVisible :false, //显示新建文件夹
      parentDirectoryId : '',   //当前所在文件夹的父id
      currentDirectoryId: '',   //当前所在的文件夹id
      directoryVo : {
        sourceName : '' ,    //文件夹名字
        parentId : '',      //父文件夹id
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
    //登录后才可
    if (this.isLongin()!=false){
      this.getMemberSourceByDirectory(0)
    }
  },

  methods: {
    //默认从顶层目录id 显示个人资源
    getMemberSourceByDirectory(id) {
        source.getMemberSourceByDirectoryId(id,this.searchObj).then((response) => {
          this.sourceList = response.data.data.items
          //更改上级id
          this.parentDirectoryId = response.data.data.parentId

          //当前文件所在文件夹id
          this.currentDirectoryId = id

          //文件创建默认在顶层目录
          this.directoryVo.parentId = id
        });
    },

    selectHandle(selection, row) {
      if (this.checkedList.includes(row.id)) {
        this.checkedList.splice(this.checkedList.indexOf(row.id), 1)
      } else {
        this.checkedList.push(row.id)
      }
    },

    //取消新建文件夹
    cancelDirectory(){
      //不显示弹窗
      this.CreateDirectoryVisible = false;
      //清空文本内容
      this.directoryVo.sourceName = ""

    },

    //新建文件夹
    createDirectory(){
      if (this.directoryVo.sourceName==''){
        this.$message({
          type: 'error',
          message: '文件夹名称不能为空'
        })
        return
      }

      //不显示弹窗
      this.CreateDirectoryVisible = false;

      source.createDirectory(this.directoryVo).then((response)=>{
        //清空文本内容
        this.directoryVo.sourceName = ""

        if (response.data.code==20000){
          this.$message({
            type: 'success',
            message: '新建文件夹成功 ^_^ '
          })
        }
        //重新显示数据
        this.getMemberSourceByDirectory(this.currentDirectoryId)

      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.code.message
        })
      })
    },


    //判断是否已登录
    isLongin() {
      //debugger
      var user = cookie.get("dzd_ucenter");
      if (user == null || user == "") {
        this.$message({
          showClose: true,
          message: "您还未登录哦，请先登录再查看个人空间资源^_^",
          type: "error",
        });

        // 3秒后执行跳转至登录页
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      return true;
    },
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

  img{
    width: 100%;
  }
</style>
