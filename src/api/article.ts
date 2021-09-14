/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-06 19:03:06
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-26 09:56:07
 */
import axios from './axios'
import { PaginationData } from './types'

/**
 * 获取文章列表
 * @description 无
 */
export function getArticleList (data: PaginationData) {
  return axios.get('api/articles', { params: data })
}

export interface ArticleData {
  articleTitle: string;
  articleContent: string;
  articleText: string;
  tags: string[];
  bgImg: string;
  isTop: boolean;
}
/**
 * 发布文章
 * @param data 文章数据
 */
export function submitArticle (data: ArticleData) {
  return axios.post('api/articles', data)
}

export interface ArticleCommentPaginationData {
  articleId: string;
  limit?: number;
  offset?: number;
}

/**
 * 获得文章评论
 * @param data 文章评论数据
 */
export function getArticleComment (data: ArticleCommentPaginationData) {
  return axios.get('api/articles/comment', { params: data })
}

export interface ArticleComment {
  nickname: string;
  byNickname?: string;
  parentId?: string;
  email: string;
  website?: string;
  commentContent: string;
  articleId: string;
}
/**
 * 发表文章评论
 * @param data 文章评论数据
 */
export function submitArticleComment (data: ArticleComment) {
  return axios.post('api/articles/comment', data)
}
