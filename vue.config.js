/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-10 14:34:31
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-10 15:11:12
 */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 定制主题
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 'tabs-card-active-color': 'red',
            // 'tabs-hover-color': '#ffeb3b',
            // 'tabs-active-color': '#ffeb3b'
            // 分页器样式设置
            'pagination-item-size': '40px',
            'pagination-item-size-sm': '26px',
            'pagination-font-family': 'Arial',
            'pagination-font-weight-active': '700'
            // 'pagination-item-bg-active': ''
          },
          javascriptEnabled: true
        }
      }
    }
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('composable', resolve('src/composable'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))
      .set('assets', resolve('src/assets'))
  }

}
