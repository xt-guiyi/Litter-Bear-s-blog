/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-06 19:03:06
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-10 11:15:18
 */
import axios from '../axios'

/**
 * 获取文章列表
 * @description 无
 */

export function getArticleList () {
  return axios.get('api/articleList')
}

/**
 * 获取句子列表
 * @description 无
 */

export function getSentencesList () {
  return axios.get('api/sentencesList')
}
