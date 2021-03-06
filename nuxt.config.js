import axios from 'axios'
require('dotenv').config()
const bodyParser = require('body-parser')

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: true,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&display=swap"}
    ]
  },
  /*
  ** Global CSS
  */
  css: [ '~assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/date.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  loading: { color: '#bada55', height: '4px', duration: 1000 },
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },
  env: {
    apiKey: process.env.API_KEY
  }
  // publicRuntimeConfig: {
  //   apiKey: process.env.API_KEY
  // },
  // privateRuntimeConfig: {
  //   test: process.env.TEST
  // }
  // router: {
  //   middleware: 'log'
  // }
}
