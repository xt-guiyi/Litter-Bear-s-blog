/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2021-11-22 13:10:53
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-11-22 13:36:46
 */
import axios from './axios'
/**
 * 获取小说列表
 */

export function getNovelList () {
  return axios.get('api/novels')
}
