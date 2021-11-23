import axios from './axios'
/**
 * 获取友链
 */

export function getFriendlyLink () {
  return axios.get('api/friendlyLink')
}
