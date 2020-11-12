/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-12 11:36:51
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const BlogThemeOneMain = () => import(/* webpackChunkName: "home" */ '@/views/BlogThemeOneMain.vue')
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
const ShortSentences = () => import(/* webpackChunkName: "ShortSentences" */ '@/views/ShortSentences.vue')
const Backstage = () => import(/* webpackChunkName: "Backstage" */ '@/views/Backstage.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  // 一级路由
  {
    path: '/blogThemeOneMain',
    name: 'BlogThemeOneMain',
    component: BlogThemeOneMain,
    meta: {
      enterAnimated: 'animated bounceInRight'

    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'shortSentences',
        name: 'ShortSentences',
        component: ShortSentences
      }
    ]
  },
  {
    path: '/backstage',
    name: 'Backstage',
    component: Backstage,
    meta: {
      enterAnimated: 'animated bounceInRight',
      leaveAnimated: 'animated bounceOutLeft'

    }

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
