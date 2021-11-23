import axios from '../axios'

/**
 * 关于站点信息
 * @description 无
 */
export function getWebsiteInfo () {
  return axios.get('api/websiteInfo')
}
