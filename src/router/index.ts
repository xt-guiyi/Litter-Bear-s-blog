/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-07-28 19:06:07
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const BlogThemeOneMain = () => import(/* webpackChunkName: "home" */ '@/views/BlogThemeOneMain.vue')
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
const ShortSentences = () => import(/* webpackChunkName: "ShortSentences" */ '@/views/ShortSentences.vue')
const Backstage = () => import(/* webpackChunkName: "Backstage" */ '@/views/Backstage.vue')
const ArticleDetailPanel = () => import(/* webpackChunkName: "ArticleDetailPanel" */ '@/views/ArticleDetailPanel.vue')
const Article = () => import(/* webpackChunkName: "Article" */ '@/views/Article.vue')
const PlaceOnFile = () => import(/* webpackChunkName: "PlaceOnFile" */ '@/views/PlaceOnFile.vue')
const RecommendedNovel = () => import(/* webpackChunkName: "RecommendedNovel" */ '@/views/RecommendedNovel.vue')
const FriendlyLink = () => import(/* webpackChunkName: "FriendlyLink" */ '@/views/FriendlyLink.vue')
const AboutMe = () => import(/* webpackChunkName: "AboutMe" */ '@/views/AboutMe.vue')
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
      },
      {
        path: 'article',
        name: 'Article',
        component: Article
      },
      {
        path: 'placeOnFile',
        name: 'PlaceOnFile',
        component: PlaceOnFile
      },
      {
        path: 'recommendedNovel',
        name: 'RecommendedNovel',
        component: RecommendedNovel
      },
      {
        path: 'friendlyLink',
        name: 'FriendlyLink',
        component: FriendlyLink
      },
      {
        path: 'aboutMe',
        name: 'AboutMe',
        component: AboutMe
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
