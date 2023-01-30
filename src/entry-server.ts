/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2021-11-23 21:20:54
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-11-23 21:34:57
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory } from 'vue-router'
import createRouter from './router'
import createStore from './store'

import { registerLayout } from '@/layout/index'
import { registerBase } from '@/components/base/index'
import { loadAllPlugins } from '@/plugins/index'
import { loadAllDirection } from '@/directive/index'
import '@/assets/scss/global.scss'
export default function createApp () {
  const app = createSSRApp(App)
  const router = createRouter(createMemoryHistory())
  const store = createStore()

  // 注册全局组件
  registerLayout(app)
  registerBase(app)
  // 注册插件
  loadAllPlugins(app)
  // 注册指令
  loadAllDirection(app)
  app.use(store).use(router)
  return {
    app,
    router,
    store
  }
}
