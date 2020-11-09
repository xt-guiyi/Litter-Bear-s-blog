/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-06 18:20:29
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-06 19:07:43
 */
import Mock from 'mockjs'
import { articleListData } from './data'
Mock.mock(
  'api/articleList',
  'get',
  articleListData
  // () => {
  //   return {
  //     status: 200,
  //     message: 'success',
  //     data: articleListData
  //   }
  // }
)
