/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-20 15:10:55
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-24 18:17:07
 */
import { PaginationData } from '@/api/types'
import { computed, ref } from 'vue'

export default function usePagination () {
  // 分页器
  const currentPage = ref(1)
  const pageSize = ref(7)
  const articleTotal = ref(0)
  const paginationParameter = computed<PaginationData>(() => {
    return {
      limit: pageSize.value,
      offset: pageSize.value * (currentPage.value - 1)
    }
  })

  // 页码改变
  function changePage (newPage: number, newPageSize: number) {
    // console.log(newPage, newPageSize)
    currentPage.value = newPage
    pageSize.value = newPageSize
  }
  return {
    currentPage,
    pageSize,
    articleTotal,
    paginationParameter,
    changePage
  }
}
