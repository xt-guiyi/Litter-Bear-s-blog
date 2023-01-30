/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-10 14:34:31
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-10 15:11:12
 */
const path = require('path')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 定制主题
  css: {
    extract: true,
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'pagination-item-size': '40px',
            'pagination-item-size-sm': '26px',
            'pagination-font-family': 'Arial',
            'pagination-font-weight-active': '700'
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

    // 我们需要禁用 cache loader，否则客户端构建版本会从服务端构建版本使用缓存过的组件
    config.module.rule('vue').uses.delete('cache-loader')
    config.module.rule('js').uses.delete('cache-loader')
    config.module.rule('ts').uses.delete('cache-loader')
    config.module.rule('tsx').uses.delete('cache-loader')
    console.log('process.env.SSR', process.env.SSR)
    if (!process.env.SSR) {
      // 将入口指向应用的客户端入口文件
      config
        .entry('app')
        .clear()
        .add('./src/entry-client.ts')
      config
        .plugin('manifest')
        .use(new WebpackManifestPlugin({ fileName: 'client-manifest.json' }))
      return
    }

    // 将入口指向应用的服务端入口文件
    config
      .entry('app')
      .clear()
      .add('./src/entry-server.ts')

    // 这允许 webpack 以适合于 Node 的方式处理动态导入，
    // 同时也告诉 `vue-loader` 在编译 Vue 组件的时候抛出面向服务端的代码。
    config.target('node')
    // 这会告诉服务端的包使用 Node 风格的导出
    config.output.libraryTarget('commonjs2')

    config
      .plugin('manifest')
      .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }))

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 将应用依赖变为外部扩展。
    // 这使得服务端构建更加快速并生成更小的包文件。
    // 不要将需要被 webpack 处理的依赖变为外部扩展
    // 也应该把修改 `global` 的依赖 (例如各种 polyfill) 整理成一个白名单
    config.externals(nodeExternals({ allowlist: /\.(less|scss|css|vue)$/ }))
    config.optimization.splitChunks(false).minimize(false)
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('progress')
    config.plugins.delete('friendly-errors')
    config.plugin('limit').use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
  }
}
