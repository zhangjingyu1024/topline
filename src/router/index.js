import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // name属性作用:编程式导航可以使用
  { path: '/login', name: 'login', component: () => import ('@/views/login/') },
  { path: '/home', name: 'home', component: () => import ('@/views/home/') }
]

const router = new VueRouter({
  routes
})
// 配置全局前置路由守卫
router.beforeEach((to, from, next) => {
// 获取用户登陆信息
  let userinfo = window.sessionStorage.getItem('userinfo')
  // 登录状态有userinfo,非登录状态没有
  if (!userinfo && to.path !== '/login') {
    return next('/login')
  }
  // 放行
  next()
})

export default router
