/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2021-11-23 21:20:43
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-11-23 21:23:40
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import createStore from './store'
import { createWebHistory } from 'vue-router'
import createRouter from './router'

import { registerLayout } from '@/layout/index'
import { registerBase } from '@/components/base/index'
import { loadAllPlugins } from '@/plugins/index'
import { loadAllDirection } from '@/directive/index'
import '@/assets/scss/global.scss'
// import '../mocks/index'
export const app = createSSRApp(App)
const router = createRouter(createWebHistory())
const store = createStore()

// 注册全局组件
registerLayout(app)
registerBase(app)
// 注册插件
loadAllPlugins(app)
// 注册指令
loadAllDirection(app)
app.use(store).use(router)

router.isReady().then(() => {
  app.mount('#app')
})
// 挂载
// app.use(store).use(router).mount('#app')
