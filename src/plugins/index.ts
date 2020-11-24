/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-11 14:12:33
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-11 14:14:04
 */
import { createApp } from 'vue'

/**
 * @description 加载所有 Plugins
 * @param app 整个应用的实例
 */
export function loadAllPlugins (app: ReturnType<typeof createApp>) {
  const files = require.context('.', true, /\.ts$/)
  files.keys().forEach(key => {
    if (key !== './index.ts') files(key).default(app)
  })
}
