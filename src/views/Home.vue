<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-04 11:42:33
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-10 11:16:54
-->
<template>
  <div class="article-list" ref="articleRef">
    <article-panel
      v-for="(item, index) of articleList"
      :ref="(el) => { panelRefs[index] = el}"
      :key="index"
      :articleName="item['articleName']"
      :articleContent="item['articleContent']"
      :releaseTime="item['releaseTime']"
      :commentNumber="item['commentNumber']"
      :readNumber="item['readNumber']"
      :likeNumber="item['likeNumber']"
    />
  </div>

</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, reactive, ref } from 'vue'
import ArticlePanel from '@/components/ArticlePanel.vue'
import { getArticleList } from '@/api/article/article'
import useScrollEvent from '@/composable/useScrollEvent'

export default defineComponent({
  name: 'Home',
  components: {
    ArticlePanel
  },
  setup () {
    // 精选文章列表
    const articleList = reactive([])
    // 文章dom数组
    const articleRef = ref(null)
    const panelRefs = ref<Element[]>([])
    // 重置dom
    onBeforeUpdate(() => {
      panelRefs.value = []
    })
    // 发送请求
    const sendArticleList = async () => {
      const { data } = await getArticleList()
      data.forEach((item: never) => {
        articleList.push(item)
      })
    }
    sendArticleList()
    useScrollEvent(articleRef)
    return {
      articleRef,
      articleList,
      panelRefs
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
