/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-16 17:14:08
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const BlogThemeOneMain = () => import(/* webpackChunkName: "home" */ '@/views/BlogThemeOneMain.vue')
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
const ShortSentences = () => import(/* webpackChunkName: "ShortSentences" */ '@/views/ShortSentences.vue')
const Backstage = () => import(/* webpackChunkName: "Backstage" */ '@/views/Backstage.vue')
const ArticleDetailPanel = () => import(/* webpackChunkName: "ArticleDetailPanel" */ '@/views/ArticleDetailPanel.vue')
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
      // enterAnimated: 'animated bounceInRight'

    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'ArticleDetailPanel',
        name: 'ArticleDetailPanel',
        component: ArticleDetailPanel
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
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0, left: 0 }
  }
})

export default router
