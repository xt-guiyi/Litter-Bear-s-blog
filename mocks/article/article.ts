/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-06 18:20:29
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-10 11:12:30
 */
import Mock from 'mockjs'
import { articleListData, sentencesListDate } from './data'
Mock.mock(
  'api/articleList',
  'get',
  articleListData
)

Mock.mock(
  'api/sentencesList',
  'get',
  sentencesListDate
)
