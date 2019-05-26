import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import zpm from '../src/index'
// import locale from '../src/locale/lang/en-US';
import locale from '../src/locale/lang/zh-CN'

Vue.use(VueRouter)
Vue.use(zpm, {
  locale
})

// 开启debug模式
Vue.config.debug = true

// 路由配置
const router = new VueRouter({
  esModule: false,
  mode: 'history',
  routes: [
    {
      path: '/remote-component',
      component: (resolve) => require(['./routers/remote-component.vue'], resolve)
    }
  ]
})

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
