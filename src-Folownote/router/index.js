import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 1. import xx from xx  模块化导入(完整导入)
  // 2. import(xxx)  函数调用(按需导入)
// 它们本质不是一回事 如下是import(xxx)函数调用 好处是按需导入
  // @符号代表src目录的绝对路径地址E:\vue-project-topline01\topline\src\
  // index.vue是默认索引文件,不用设置,代码更节省,更优雅
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/home', name: 'home', component: () => import('@/views/home') }
]

const router = new VueRouter({
  routes
})
// 配置全局路由守卫
router.beforeEach((to, from, next) => {
  let userinfo = window.sessionStorage.getItem('userinfo')
  // 非登录状态强制登录
  if (!userinfo && to.path !== '/login') {
    return next('/login')
  }
  next()
})
export default router
