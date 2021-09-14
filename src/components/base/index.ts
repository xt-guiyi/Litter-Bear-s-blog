import { createApp } from 'vue'
const path = require('path')

// 全局注册布局
export function registerBase (app: ReturnType<typeof createApp >) {
  const files = require.context('.', false, /\.vue$/)
  files.keys().forEach(filesItem => {
    app.component(files(filesItem).default.name || path.basename(filesItem, '.vue'), files(filesItem).default)
  })
}
