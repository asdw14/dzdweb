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
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门资源</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="(course, index) in courseList" v-bind:key="index">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <!-- ~/assets/photo/course/01.jpg -->
                      <img
                        :src="course.cover"
                        class="img-responsive"
                        :alt="course.title"
                      />
                      <div class="cc-mask">
                        <a
                          :href="'/course/' + course.id"
                          title="开始学习"
                          class="comm-btn c-btn-1"
                          >开始学习</a
                        >
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        :title="course.title"
                        class="course-title fsize18 c-333"
                        >{{ course.title }}</a
                      >
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span
                        class="fr jgTag bg-green"
                        v-if="Number(course.price) === 0"
                      >
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fr jgTag bg-green" v-else>
                        <i class="c-fff fsize12 f-fA"> ￥{{ course.price }}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ course.buyCount }} 人学习</i>
                        |
                        <i class="c-999 f-fA">{{ course.viewCount }} 人浏览</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部课程" class="comm-btn c-btn-2">全部资源</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <div>
        <section class="container">
          <el-table :data="sourceList" style="width: 100%">
            <el-table-column label="上传用户" width="150" >
                <template slot-scope="scope">
               <!-- 用户头像 -->
                <div>
                    <el-avatar :src="scope.row.avatar" :size="small"></el-avatar>
                </div>
               <!-- 用户昵称 -->
                <div>
                  <el-link type="primary">{{scope.row.nickname}}</el-link>
                </div>
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
              <el-tag type="success">免费</el-tag>
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
      </div>
      <el-backtop></el-backtop>

      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="(teacher, index) in teacherList" v-bind:key="index">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/' + teacher.id" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar" />
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a
                        :href="'/teacher/' + teacher.id"
                        :title="teacher.name"
                        class="fsize18 c-666"
                        >{{ teacher.name }}</a
                      >
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{ teacher.intro }}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{ teacher.career }}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2"
                >全部讲师</a
              >
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import banner from "@/api/banner";
import index from "@/api/index";
import source from "@/api/source";
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
      teacherList: {},
      courseList: {},
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

    //显示banner
    initDataBanner() {
      banner.getList().then((response) => {
        this.bannerList = response.data.data.bannerList;
      });     
    },


    //首页显示课程和名师数据
    initDataObj() {
      index.getList().then((response) => {
        this.teacherList = response.data.data.teacherList;
        this.courseList = response.data.data.eduList;
      });
    },
  },
};
</script>