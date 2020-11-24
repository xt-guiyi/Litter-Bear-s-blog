import axios from './axios'
import { PaginationData } from './types'

/**
 * 获取句子列表
 * @description 分页对象
 */

export function getSentencesList (data: PaginationData) {
  return axios.get('api/shortSentences', {
    params: data
  })
}

export interface SentencesData{
  shortSentencesHtml: string;
  shortSentencesText: string;
}
/**
 * 发布句子
 * @param data 句子数据
 */
export function submitSentences (data: SentencesData) {
  return axios.post('api/shortSentences', data)
}
