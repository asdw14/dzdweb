<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 标题 -->
      <el-form-item size="mini">
        <el-input v-model="searchObj.sourceName" placeholder="资源名称"/>
      </el-form-item>
      <template size="mini">
        <el-radio v-model="searchObj.isCharge" label="true" size="mini">免费</el-radio>
        <el-radio v-model="searchObj.isCharge" label="false" size="mini">收费
        </el-radio>
      </template>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getPublicPageList()"
        size="mini">查询
      </el-button
      >
      <el-button type="default" @click="resetData()" size="mini">清空
      </el-button
      >
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="sourceList"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      row-class-name="myClassList"
      :default-sort="{prop: 'downCount', order: 'descending'}"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="上传用户" width="150">
        <template slot-scope="scope">
          <!-- 点击头像跳转到用户管理 -->
          <div @click="goUserInfo(scope.row.memberId)">

            <!-- 用户头像 -->
            <div>
              <el-avatar :src="scope.row.avatar" :size="small"></el-avatar>
            </div>

            <!-- 用户昵称 -->
            <div>
              <el-link type="primary">{{ scope.row.nickname }}</el-link>
            </div>

          </div>

        </template>
      </el-table-column>

      <el-table-column prop="sourceName" label="资源名称">
      </el-table-column>

      <el-table-column prop="downCount" label="下载数量" sortable>
      </el-table-column>

      <el-table-column prop="buyCount" label="购买数量" sortable>
      </el-table-column>

      <el-table-column label="文件大小">
        <template slot-scope="scope"> {{ scope.row.fileSize }}/MB</template>
      </el-table-column>
      <el-table-column label="所需积分" sortable>
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>

      <el-table-column label="上传日期" sortable width="150">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate.substr(0, 10) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="350" align="center">
        <template slot-scope="scope">
          <el-link :href="scope.row.sourceOssUrl" type="primary"><i class="el-icon-download  el-icon--left"/>下载审核</el-link>

          <el-button type="text" size="mini" icon="el-icon-edit" @click="showOperation(scope.row.id)">暗箱操作
          </el-button>

          <el-dialog :visible.sync="dialogFormVisible" title="修改数据">
            资源描述：<el-input v-model="operationVo.sourceName" placeholder="请输入内容" style="width: 40%"></el-input><br><br>
            下载价格：<el-input-number v-model="operationVo.price" :min="0" :max="50"></el-input-number><br><br>
            购买次数：<el-input-number v-model="operationVo.buyCount" :min="0" ></el-input-number><br><br>
            下载次数：<el-input-number v-model="operationVo.downCount" :min="0" ></el-input-number><br><br>

            <div slot="footer" class="dialog-footer">
              <el-button @click="closeOperation">取 消</el-button>
              <el-button type="primary" @click="operation">修 改</el-button>
            </div>
          </el-dialog>

          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
          >删除
          </el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-s-tools"
            @click="banById(scope.row.id)"
          >
            {{ scope.row.isBan == 0 ? "封禁" : "解封" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getPublicPageList"
    />
  </div>
</template>
<script>
import source from "@/api/dzd/source";

export default {
  data() {
    return {
      listLoading: false, // 是否显示loading信息
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件、
      key: 0,
      sourceList: [],
      dialogFormVisible: false,
      operationVo: {
        sourceName:'',

      }

    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // 获取文章列表分页
      this.getPublicPageList()
    },

    // 条件查询带分页
    getPublicPageList(page = 1) {
      this.page = page
      this.listLoading = true
      source.getPublicPageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.sourceList = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        });
    },

    // 暗箱操作修改数据
    operation(){
      if (this.operationVo.id != null){
        source.operation(this.operationVo).then( (response) =>{
          this.dialogFormVisible = false
          //刷新页面
          this.getPublicPageList(this.page)

          this.$message({
            type: 'success',
            message: response.message,
          });
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: response.message,
          });
        })
      }
    },

    //显示修改数据页面
    showOperation(id) {
      source.getSourceInfoById(id).then((response) => {
        this.operationVo.id = id
        this.operationVo.sourceName = response.data.item.sourceName
        this.operationVo.price = response.data.item.price
        this.operationVo.buyCount = response.data.item.buyCount
        this.operationVo.downCount = response.data.item.downCount

      });
      this.dialogFormVisible = true
    },

    closeOperation(){
      this.operationVo.id = null
      this.operationVo.sourceName = null
      this.operationVo.price = null
      this.operationVo.buyCount = null
      this.operationVo.downCount = null
      this.dialogFormVisible = false

    },

    banById(id) {
      this.$confirm("此操作将封禁/解封改资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return source.banById(id);
        })
        .then(() => {
          this.getPublicPageList();
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch((response) => {
          // 失败
          if (response === 'cancel') {
            this.$message({
              type: "info",
              message: "已取消更改",
            });
          } else {
            this.$message({
              type: "error",
              message: "修改失败",
            });
          }
        });
    },

    // 跳转到用户
    goUserInfo(id) {
      this.$router.push(`/dzd/user/list/${id}`)

    },

    //清空
    resetData() {
      this.searchObj = {};
      this.page = 1;
      this.getPageList();
    },

    //删除资源by Id
    removeById(id, page) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return source.removeById(id);
        })
        .then(() => {
          this.getPublicPageList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((response) => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },
  },
};
</script>
