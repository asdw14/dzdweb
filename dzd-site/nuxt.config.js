module.exports = {
  /*
  ** Headers of the page
  */
  plugins: [
    { src: '~/plugins/nuxt-swiper-plugin.js', ssr: true }
    ,{ src: '~/plugins/vueMarkdown'}
    ,{src:'~/plugins/swiper',ssr:false}

  ],

  css: [
    'swiper/dist/css/swiper.css',
  ],
  server:{
    port:3000
    ,host: '0.0.0.0'
  },

  head: {
    title: '弟中弟共享云 - 私有云盘|共享资源|分享文章|不限速不权限你！',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '弟中弟共享云 - 私有云盘，共享资源，分享文章，不限速不权限你！' },
      { hid: 'description', name: 'description', content: '弟中弟共享云 - 私有云盘|共享资源|分享文章|不限速不权限你！' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
},
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

