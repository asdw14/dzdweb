<template>

  <section class="container" style="width: 85%">

    <div class="wrapper">
      <div class="input-data">
          <input type="text" required v-model="articleInfo.title">
          <div class="underline"></div>
          <label><b>帖子标题：</b></label>
        </div>
      </div>
    <!-- 所属分类：级联下拉列表 -->
    <!-- 一级分类 -->
<!--    <el-form-item label="文章类别: " style="border-radius: 30px; ">-->
<!--      <el-select-->
<!--        v-model="searchObj.subjectParentId"-->
<!--        placeholder="选择分类大类"-->
<!--        @change="subjectLevelOneChanged">-->
<!--        <el-option-->
<!--          v-for="subject in subjectNestedList"-->
<!--          :key="subject.id"-->
<!--          :label="subject.title"-->
<!--          :value="subject.id"/>-->
<!--      </el-select>-->
<!--    </el-form-item>-->

<!--      &lt;!&ndash; 二级分类 &ndash;&gt;-->
<!--      <el-select v-model="searchObj.subjectId" placeholder="选择分类小类" style="width: 150px;" size="small">-->
<!--        <el-option-->
<!--          v-for="subject in subSubjectList"-->
<!--          :key="subject.id"-->
<!--          :label="subject.title"-->
<!--          :value="subject.id"/>-->
<!--      </el-select>-->


    <mavon-editor
      ref="md"
      placeholder="请输入文档内容..."
      :boxShadow="true"
      toolbarsBackground="#3FACEA"
      :scrollStyle="true"
      style="z-index:1;border: 1px solid #d9d9d9;height:50vh"
      v-model="articleInfo.content"
      :toolbars="toolbars"
      @imgAdd="uploadContentImg"
      @imgDel="delConentImg"
    />
    <br>

    <el-row>
      <el-col :span="3" :offset="2">
        <el-button type="primary" round @click='saveData' icon="el-icon-upload">保存帖子</el-button>
      </el-col>
      <el-col :span="3" >
        <el-button type="success" round @click='pushData' icon="el-icon-check">发布帖子</el-button>
      </el-col>
    </el-row>

    <br>
    <br>
    <br>

  </section>
</template>

<script>

import source from '@/api/source';
import subject from '@/api/subject';
import article from '@/api/article'

export default {
  name: "write",
  components: {},
  data() {
    return {
      //文章对象
      articleInfo:{
        //md内容
        content: "",
        //文章标题
        title:"",
        //html内容
        html:"",
      },
      searchObj: {}, // 查询表单对象
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      url:"",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },

  created() {
    //获取分类
    // this.initSubjectList()
  },

  methods: {
    // 上传图片方法
    async  uploadContentImg(pos, $file) {
      let $vm = this.$refs.md
      const formData = new FormData()
      // 压缩图片
      if($file.type.indexOf("image") === 0) {
        let reader = new FileReader(), img = new Image();
        reader.readAsDataURL($file)
        reader.onload = function (e) {
          img.src = e.target.result
        }
        img.onload = function () {
          // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');

          // 图片原始尺寸
          let originWidth = this.width
          let originHeight = this.height

          // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
          let maxWidth = 1600, maxHeight = 1600
          // 目标尺寸
          let targetWidth = originWidth, targetHeight = originHeight
          // 图片尺寸超过800x800的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
          }
          // canvas对图片进行缩放
          canvas.width = targetWidth
          canvas.height = targetHeight
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight)
          // 图片压缩
          context.drawImage(img, 0, 0, targetWidth, targetHeight)
          /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

          //压缩后的图片转base64 url
          /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
           * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
          let newUrl = canvas.toDataURL('image/jpeg', 0.6);//base64 格式

          // base64 转 blob 再转 file
          let arr = newUrl.split(","),
            mime = arr[0].match(/:(.*?);/)[1], // 去掉url的头，并转化为byte
            bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          // 转blob
          let filename = Date.parse(new Date()) + ".jpeg"
          // 转file
          let file = new File([u8arr], filename, {type: mime})

          // 将图片上传到服务器
          formData.append('file', file)
          // fd.append('file', file)
          source.uploadContentImg(formData).then((response) => {//上传图片接口
            let url = response.data.data.url
            // this.$refs.md.$img2Url(pos, url) //图片索引替换为url
            $vm.$img2Url(pos, url) //图片索引替换为url
          })
        }
      }
    },

    // 保存
    saveData(){
      if (this.articleInfo.title == "" ){
        this.$message({
          type: 'error',
          message: '请先输入标题再保存!'
        })
        return
      }
      if (this.$refs.md.d_value == "" || this.$refs.md.d_value == null ){
        this.$message({
          type: 'error',
          message: '您必须要输入正文才能保存 !'
        })
        return
      }
      this.articleInfo.status = "Draft"
      this.articleInfo.html = this.$refs.md.d_render;  //html
      this.articleInfo.markdown = this.$refs.md.d_value; //md
      article.saveOrPush(this.articleInfo).then((response) =>{
        this.$message({
          type: 'success',
          message: '保存成功 ^_^ '
        })
        this.$router.push({ path: '/article' })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
      this.saveBtnDisabled = false

    },

    // 发布
    pushData(){
      if (this.articleInfo.title == "" ||this.articleInfo.title ==null ){
        this.$message({
          type: 'error',
          message: '请先输入标题再发布!'
        })
        return
      }
      if (this.$refs.md.d_value == "" || this.$refs.md.d_value == null ){
        this.$message({
          type: 'error',
          message: '您必须要输入正文才能发布 !'
        })
        return
      }
      this.articleInfo.description = this.$refs.md.d_render;  //html
      this.articleInfo.markdown = this.$refs.md.d_value; //md
      this.articleInfo.status = "Normal"
      article.saveOrPush(this.articleInfo).then(response =>{
        this.$message({
          type: 'success',
          message: '发布成功 ^_^ '
        })
        this.$router.push({ path: '/article' })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
      this.saveBtnDisabled = false

    },

    //删除图片
    delConentImg(urlAndFileArr) {
      const fileUrl = urlAndFileArr[0]
      const file = urlAndFileArr[1]
      this.$deleteImg(fileUrl)//删除图片接口
    },

    // 初始化分类列表
    initSubjectList(){
      subject.getNestedTreeList().then((response) =>      {
        this.subjectNestedList = response.data.data.items

      })
    },
    //获取二级列表
    subjectLevelOneChanged(value){
      for(var i = 0; i<this.subjectNestedList.length; i++){
        if(this.subjectNestedList[i].id == value){
          this.subSubjectList = this.subjectNestedList[i].children
        }
      }
    },
  }
};
</script>
<style>
.wrapper{
  width: 70%;
  background-color: #fff;
  /* 内边距（上下左右） */
  padding: 40px;
  /* 盒子阴影 */
  /*box-shadow: 0px 0px 10px rgba(0,0,0,0.1);*/
  /* 圆角 */
  border-radius: 8px;
}
.wrapper .input-data{
  /* 相对定位 */
  position:relative;
  width: 100%;
  height: 40px;
}
.wrapper .input-data input{
  width: 100%;
  height: 100%;
  border:none;
  font-size: 17px;
  border-bottom: 2px solid #c0c0c0;
}
/* 输入框获得焦点时 */
.wrapper .input-data input:focus ~ label,
  /* 输入框的值为合法时 */
.wrapper .input-data input:valid ~ label{
  /* label上移，同时改变字号、字体颜色 */
  transform: translateY(-25px);
  font-size: 15px;
  color: #2c6fdb;
}
.wrapper .input-data label{
  /* 绝对定位 */
  position: absolute;
  bottom: 10px;
  left: 0px;
  color: #808080;
  /* 这个属性可以使点击label穿透到输入框 */
  pointer-events: none;
  /* 现在动画有点生硬，在这里需要给动画加个过渡 */
  transition: all 0.3s ease;
}
.wrapper .input-data .underline{
  position: absolute;
  bottom: 0px;
  height: 2px;
  width: 100%;
  background-color: #2c6fdb;
  /* 沿X轴缩小 */
  transform: scaleX(0);
  /* 这里同样给动画加个过渡 */
  transition: all 0.3s ease;
}
.wrapper .input-data input:focus ~ .underline,
.wrapper .input-data input:valid ~ .underline{
  /* 沿X轴放大 */
  transform: scaleX(1);
}
</style>
