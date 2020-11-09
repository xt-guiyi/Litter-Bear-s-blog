/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-07 19:46:30
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Home = () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'Home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
