<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="请选择">
          <el-option label="用户登录数统计" value="login_num"/>
          <el-option label="用户注册数统计" value="register_num"/>
          <el-option label="帖子浏览数统计" value="article_view_num"/>
          <el-option label="资源下载数统计" value="source_down_num"/>

          <el-option label="每日新增资源数统计" value="source_num"/>
          <el-option label="每日新增帖子数统计" value="article_num"/>
          <el-option label="每日新增评论数统计" value="comment_num"/>

        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询</el-button>
    </el-form>

    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%" />
    </div>

    <div>
      <div id="main" style="height:500px;width:100%" />
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import daily from '@/api/statistics/sta';
import user from '@/api/dzd/user';

export default {
  data() {
    return {
      searchObj: {
        type: '',
        begin: '',
        end: ''
      },
      btnDisabled: false,
      chart: null,
      title: '',
      xData: [],
      yData: [],
      sex:{
        sum : 0,
        woman :0,
        man: 0,
      }
    }
  },

  created() {
    setTimeout(() => {
      this.sexSts()
    }, 200)
  },

  methods: {
    showChart() {
      this.initChartData()
    },

    // 准备图表数据
    initChartData() {
        daily.showChart(this.searchObj).then(response => {
             // 数据
            this.yData = response.data.dataList
            // 横轴时间
            this.xData = response.data.dateList
             // 当前统计类别
            switch (this.searchObj.type) {

                case 'register_num':
                    this.title = '用户注册数统计'
                    break
                case 'login_num':
                    this.title = '用户登录数统计'
                    break
                case 'article_view_num':
                    this.title = '帖子浏览数统计'
                    break
                case 'source_down_num':
                    this.title = '资源下载数统计'
                    break
                case 'source_num':
                  this.title = '每日新增资源数统计'
                  break
                case 'article_num':
                  this.title = '每日新增帖子数统计'
                  break
                case 'comment_num':
                  this.title = '每日新增评论数统计'
                  break
                }
            this.setChart()
        })
    },

    //性别比例
    sexSts() {

      user.getSexSta().then(response => {
        this.sum = response.data.sum
        this.woman = response.data.woman
        this.man = response.data.man
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
          series: [
            {
              type: 'pie',
              stillShowZeroSum: false,
              data: [
                {
                  value: this.woman,
                  name: '女性用户'
                },
                {
                  value: this.man,
                  name: '男性用户'
                },
                {
                  value: this.sum,
                  name: '未知性别'
                }
              ]
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

    },

    // 设置图标参数
    setChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('chart'))
      // console.log(this.chart)

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
            type: 'category',
            data: this.xData//-------绑定数据
        },
        // y轴是数据轴（连续数据）
        yAxis: {
            type: 'value'
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [{
            // 系列中的数据内容数组
            data: this.yData,//-------绑定数据
            // 折线图
            type: 'line',
          smooth: true
        }],
        title: {
            text: this.title
        },
        tooltip: {
            trigger: 'axis'
        },

        dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [
                0
            ],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: '#d3dee5'

            },
            textStyle: {
                color: '#fff'
            },
            borderColor: '#90979c'
            },
            {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
            }]
      }

      this.chart.setOption(option)
    }
  }
}
</script>
