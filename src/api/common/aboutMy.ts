import axios from '../axios'

/**
 * 关于我
 * @description 无
 */
export function getAboutMy () {
  return axios.get('api/aboutMy')
}
