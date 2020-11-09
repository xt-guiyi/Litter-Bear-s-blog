/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-04 11:46:02
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-04 13:53:47
 */
import { createApp } from 'vue'

// 全局注册布局
export function registerLayout (app: ReturnType<typeof createApp >) {
  const files = require.context('.', false, /\.vue$/)
  files.keys().forEach(filesItem => {
    app.component(files(filesItem).default.name, files(filesItem).default)
  })
}
