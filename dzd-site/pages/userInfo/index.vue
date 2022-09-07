<template>
  <section class="container" style="width: 85%">

    <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="个人信息">
        <div style="margin-left: 10%">
          <el-descriptions title="个人信息" direction="vertical" :column="4" border>
            <el-descriptions-item label="头像" size="mini">
              <el-avatar size="small"></el-avatar>
              更换
            </el-descriptions-item>
            <el-descriptions-item label="用户名">用户名</el-descriptions-item>
            <el-descriptions-item label="手机号">苏州市</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
          </el-descriptions>
        </div>

      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
export default {

}
</script>
