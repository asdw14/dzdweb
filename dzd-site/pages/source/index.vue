<template>
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
