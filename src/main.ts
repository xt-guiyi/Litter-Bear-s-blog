/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-06 18:50:27
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerLayout } from '@/layout/index'
import { registerBase } from '@/components/base/index'
import '@/assets/scss/global.scss'
import '../mocks/index'
const app = createApp(App)
// 注册全局组件
registerLayout(app)
registerBase(app)
app.use(store).use(router).mount('#app')
