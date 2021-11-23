import axios from './axios'
/**
 * 获取最近评论
 */

export function getNewestComment (data: any) {
  return axios.get('api/comment/newest', { params: data })
}
