/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-23 14:22:23
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-23 15:11:55
 */
import axios from '../axios'

/**
 * 获得qq图像
 */
export interface QParameter {
  nk: string; // qq邮箱号
  s: string; // 分辨率
}
export function getQQImage (data: QParameter) {
  return axios.get('api/qq/avatar', {
    params: data
  })
}
