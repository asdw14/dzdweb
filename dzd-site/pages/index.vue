<template>
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption"     >
      <div class="swiper-wrapper">
        <div
          v-for="banner in bannerList"
          :key="banner.id"
          class="swiper-slide"
          style="background: #040b1b"
        >
          <a target="_blank" :href="banner.linkUrl">
            <img :src="banner.imageUrl" :alt="banner.title" style="height: 100%"/>
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </div>
    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">

      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333" style="font-size: 35px;">热门资源</span>
            </h2>
          </header>
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
        <section class="tac pt20">
          <a href="/source" title="全部资源" class="comm-btn c-btn-2"
            >全部资源</a
          >
        </section>
      </div>
      <el-backtop></el-backtop>
    </div>
  </div>
</template>

<script>
import banner from "@/api/banner";
import index from "@/api/index";
import source from "@/api/source";
import cookie from "js-cookie";
export default {
  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {},// 查询条件、
      bannerList: {},
      sourceList: [],

    };
  },
  created() {
    this.getPublicPageList();
    this.initDataBanner();
    // this.initDataObj();

  },
  methods: {
    //首页显示公开资源
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
    //显示banner
    initDataBanner() {
      banner.getList().then((response) => {
        this.bannerList = response.data.data.bannerList;
      });
    },

  },
};
</script>
