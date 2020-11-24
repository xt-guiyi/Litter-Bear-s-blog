/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-13 12:59:43
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerLayout } from '@/layout/index'
import { registerBase } from '@/components/base/index'
import { loadAllPlugins } from '@/plugins/index'
import { loadAllDirection } from '@/directive/index'
import '@/assets/scss/global.scss'
// import '../mocks/index'
export const app = createApp(App)
// 注册全局组件
registerLayout(app)
registerBase(app)
// 注册插件
loadAllPlugins(app)
// 注册指令
loadAllDirection(app)
// 挂载
app.use(store).use(router).mount('#app')
