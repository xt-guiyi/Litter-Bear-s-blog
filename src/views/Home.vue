<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-04 11:42:33
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-23 09:48:17
-->
<template>
  <div class="article-list" ref="homeRef">
    <article-panel
      v-for="(item, index) of articleList"
      :ref="(el) => { panelRefs[index] = el}"
      :key="index"
      :articleTitle="item['articleTitle']"
      :articleText="item['articleText']"
      :articleContent="item['articleContent']"
      :releaseTime="item['createdAt']"
      :updatedTime="item['updatedAt']"
      :commentNumber="item['commentNumber']"
      :readNumber="item['readNumber']"
      :likeNumber="item['likeNumber']"
      :bgImg="item['bgImg']"
    />
    <div class="pagination-container hide">
      <a-pagination
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        :total="articleTotal"
        @change="changePage"
        show-less-items
      />
    </div>
</div>

</template>

<script lang="ts">
import { ComputedRef, defineComponent, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import ArticlePanel from '@/components/ArticlePanel.vue'
import useScrollEvent from '@/composable/useScrollEvent'
import { getArticleList } from '@/api/article'
import { PaginationData } from '@/api/types'
import usePagination from '@/composable/usePagination'

export default defineComponent({
  name: 'Home',
  components: {
    ArticlePanel
  },
  setup () {
    const store = useStore()
    // 精选文章列表
    const articleList = ref(['', '', '', '', '', '', ''])
    // 文章dom数组
    const homeRef = ref(null)
    const panelRefs = ref<Element[]>([])
    const { currentPage, pageSize, articleTotal, paginationParameter, changePage } = usePagination()
    // 发送请求
    async function sendArticleList (paginationParameter: ComputedRef<PaginationData>) {
      console.log(paginationParameter.value)

      const { data } = await getArticleList(paginationParameter.value)
      articleList.value = data.articleList
      articleTotal.value = data.total
    }
    // 响应式副作用
    watchEffect(() => {
      store.dispatch('updateBlogThemeOneMain', { isAffixBottom: false, isAffixMove: false })
      window.scroll(0, 0)
      sendArticleList(paginationParameter)
    })

    useScrollEvent(homeRef)
    return {
      homeRef,
      articleList,
      panelRefs,
      currentPage,
      pageSize,
      articleTotal,
      changePage
    }
  }

})
</script>

<style lang="scss" scoped>
.pagination-container{
  height: 10rem;
  line-height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;;
}
</style>
