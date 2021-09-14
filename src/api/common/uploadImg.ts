/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-14 17:20:07
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-14 17:25:51
 */
import axios from '../axios'

/**
 * 上传图片
 * @description 无
 */
export function getArticleList (data: FormData) {
  return axios.post('api/upload/images', data)
}
