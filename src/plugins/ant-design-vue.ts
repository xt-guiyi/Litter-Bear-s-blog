/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-11 14:12:33
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-12-08 21:28:19
 */
import { Form, message, Tabs, Tag, Tooltip, Input, Modal, Upload, Pagination, notification, Table } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import { createApp } from 'vue'
/**
 * @description 手动注册 antd-vue 组件,达到按需加载目的
 * @param {ReturnType<typeof createApp>} app 整个应用的实例
 * @returns void
 */

message.config({
  maxCount: 2
})

export default function loadComponent (app: ReturnType<typeof createApp>) {
  app.config.globalProperties.$message = message
  app.config.globalProperties.$notification = notification
  app
    .use(Form)
    .use(Tabs)
    .use(Tag)
    .use(Tooltip)
    .use(Input)
    .use(Modal)
    .use(Upload)
    .use(Pagination)
    .use(Table)
}
