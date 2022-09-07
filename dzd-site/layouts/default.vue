<template>
  <div class="in-wrap">
    <no-ssr>
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="弟中弟共享云">
            <img src="~/assets/img/logo.png" width="100%" alt="弟中弟共享云">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <nuxt-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </nuxt-link>
            <nuxt-link to="/source" tag="li" active-class="current">
              <a>资源</a>
            </nuxt-link>
            <nuxt-link to="/article" tag="li" active-class="current">
              <a>交流求助</a>
            </nuxt-link>
            <nuxt-link to="/netdisk" tag="li" active-class="current">
              <a>云空间</a>
            </nuxt-link>
            <nuxt-link to="/userInfo" tag="li" active-class="current">
              <a>个人主页</a>
            </nuxt-link>
          </ul>
 <!-- / nav -->
<ul class="h-r-login">
    <li v-if="!loginInfo.id" id="no-login">
        <a href="/login" title="登录">
            <em class="icon18 login-icon">&nbsp;</em>
            <span class="vam ml5">登录</span>
        </a>
        |
        <a href="/register" title="注册">
            <span class="vam ml5">注册</span>
        </a>
    </li>
    <li v-if="loginInfo.id" id="is-login-one" class="mr10">
        <a id="headerMsgCountId" href="#" title="消息">
            <em class="icon18 news-icon">&nbsp;</em>
        </a>
        <q class="red-point" style="display: none">&nbsp;</q>
    </li>
    <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
        <a href="/userInfo" title>
            <img
                 :src="loginInfo.avatar"
                 width="30"
                 height="30"
                 class="vam picImg"
                 alt
                 >
            <span id="userName">{{ loginInfo.nickname }}</span>
        </a>
        <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
    </li>
    <!-- /未登录显示第1 li；登录后显示第2，3 li -->
</ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入你想找的资源" name="queryCourse.courseName" value>
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    </no-ssr>
    <!-- /公共头引入 -->
  <no-ssr>

    <nuxt/>
</no-ssr>
    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.dizhongdi.com/" title="弟中弟" target="_blank">弟中弟</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：132-7947-4937(陕西)</span>
                <span>Email：2755063993@qq.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2022版权均归弟中弟所有 京ICP备944025127号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"


import cookie from 'js-cookie'
import userApi from '@/api/login'

export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }
    }
  },

  created() {
    // console.log(this.$route.query.token)
    this.token = this.$route.query.token
    if (this.token) {
      this.wxLogin()
    }
    this.showInfo()
  },

  methods: {
    showInfo() {
      //debugger
      var jsonStr = cookie.get("dzd_ucenter");
      // console.log(jsonStr)
      // alert(jsonStr)
      if (jsonStr) {
        this.loginInfo.id=123156
        this.loginInfo = JSON.parse(jsonStr);
      }
    },

    logout() {
      //debugger
      cookie.set('dzd_ucenter', "", {domain: '192.168.169.1'})
      cookie.set('dzd_token', "", {domain: '192.168.169.1'})

      //跳转页面
      window.location.href = "/"
    },
    wxLogin() {
      if (this.token == '') return
      //把token存在cookie中、也可以放在localStorage中
      cookie.set('dzd_token', this.token, {domain: '192.168.169.1'})
      cookie.set('dzd_ucenter', '', {domain: '192.168.169.1'})
      //登录成功根据token获取用户信息
      userApi.getLoginInfo().then(response => {
        this.loginInfo = response.data.data.item
        //将用户信息记录cookie
        cookie.set('dzd_ucenter', JSON.stringify(response.data.data.item), {domain: '192.168.169.1'})
      })
    }
  }
}
</script>
