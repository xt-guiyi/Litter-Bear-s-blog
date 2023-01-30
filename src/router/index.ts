/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-07-28 19:06:07
 */
import { createRouter, createWebHistory, RouteRecordRaw, RouterHistory } from 'vue-router'
import BlogThemeOneMain from '@/views/BlogThemeOneMain.vue'
import Home from '@/views/Home.vue'
import ShortSentences from '@/views/ShortSentences.vue'
import Backstage from '@/views/Backstage.vue'
import ArticleDetailPanel from '@/views/ArticleDetailPanel.vue'
import Article from '@/views/Article.vue'
import PlaceOnFile from '@/views/PlaceOnFile.vue'
import RecommendedNovel from '@/views/RecommendedNovel.vue'
import FriendlyLink from '@/views/FriendlyLink.vue'
import AboutMe from '@/views/AboutMe.vue'
// const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
// const ShortSentences = () => import(/* webpackChunkName: "ShortSentences" */ '@/views/ShortSentences.vue')
// const Backstage = () => import(/* webpackChunkName: "Backstage" */ '@/views/Backstage.vue')
// const ArticleDetailPanel = () => import(/* webpackChunkName: "ArticleDetailPanel" */ '@/views/ArticleDetailPanel.vue')
// const Article = () => import(/* webpackChunkName: "Article" */ '@/views/Article.vue')
// const PlaceOnFile = () => import(/* webpackChunkName: "PlaceOnFile" */ '@/views/PlaceOnFile.vue')
// const RecommendedNovel = () => import(/* webpackChunkName: "RecommendedNovel" */ '@/views/RecommendedNovel.vue')
// const FriendlyLink = () => import(/* webpackChunkName: "FriendlyLink" */ '@/views/FriendlyLink.vue')
// const AboutMe = () => import(/* webpackChunkName: "AboutMe" */ '@/views/AboutMe.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { path: '/blogThemeOneMain/home' }
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

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
//   scrollBehavior (to, from, savedPosition) {
//     return { top: 0, left: 0 }
//   }
// })
// export default router
export default function (history: RouterHistory) {
  return createRouter({
    history,
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { top: 0, left: 0 }
    }
  })
}
