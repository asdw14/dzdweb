<template>
  <!-- <div> -->
    <section class="container" >
      <el-table :data="sourceList" style="width: 80%;margin: auto;">
        <el-table-column label="上传用户" width="150" >
           <!-- 根据文件类型显示对应图标 -->
           <!-- 压缩包 -->
            <template slot-scope="scope">

              <div v-if="scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) === 'zip' ||

               scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 ) =='rar'|| scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 )=='7z' ">
                <img src="~/assets/icon/压缩包.png" width="100%" alt="压缩包">
              </div >

            <!-- 为文件夹 -->
             <div v-else-if="scope.row.isDirectory == 1">
               <img src="~/assets/icon/文件夹.png" width="100%" alt="文件夹">
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

           <div v-else>
               <img src="~/assets/icon/文件.png" width="100%" alt="文件">
             </div>
            </template>
        </el-table-column>

        <el-table-column prop="originalName" label="后缀" width="180">
         <template slot-scope="scope"> {{scope.row.originalName.substring(scope.row.originalName.lastIndexOf('.') +1 )}}
        </template>
        </el-table-column>

        <el-table-column prop="sourceName" label="资源名称" width="180">
        </el-table-column>

        <el-table-column prop="downCount" label="下载数量"  width="80">
        </el-table-column>

        <el-table-column  label="文件大小"  width="80">
          <template slot-scope="scope">
              {{ scope.row.fileSize}}/MB
          </template>

        </el-table-column>

        <el-table-column fixed="right">
        </el-table-column>

        <el-table-column label="上传日期" sortable  width="150" fixed="right">
            <template slot-scope="scope">
              {{ scope.row.gmtCreate.substr(0, 10) }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" width="100">

          <template slot-scope="scope">
              <a :href="scope.row.sourceOssUrl">
            <el-button size="small" type="success" icon="el-icon-download" circle></el-button>
              </a>
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
  <!-- </div> -->

</template>
<script>
import source from "@/api/source";
export default {

  data () {
    return {
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {},// 查询条件、
      sourceList: [],

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
</style>
