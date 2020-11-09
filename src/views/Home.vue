<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-04 11:42:33
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-09 09:50:20
-->
<template>
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
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, onBeforeUpdate, reactive, ref } from 'vue'
import ArticlePanel from '@/components/ArticlePanel.vue'
import { getArticleList } from '@/api/article/article'
import { throttle } from '@/utils/commonUse'
export default defineComponent({
  name: 'Home',
  components: {
    ArticlePanel
  },
  setup () {
    // 精选文章列表
    const articleList = reactive([])
    // 文章dom数组
    const panelRefs = ref([])
    // 重置dom
    onBeforeUpdate(() => {
      panelRefs.value = []
    })
    // 发送请求
    const getAticleList = async () => {
      const { data } = await getArticleList()
      data.forEach((item: never) => {
        articleList.push(item)
      })
    }
    getAticleList()

    /**
     * 监听滚动事件，并添加动画
     */
    let handleScroll = function () {
      if (panelRefs.value !== null) {
        panelRefs.value.forEach((item: ComponentPublicInstance) => {
          if (
            item.$el.getBoundingClientRect().y < (window.innerHeight) * 0.95 &&
            item.$el.getBoundingClientRect().y > 0
          ) {
            item.$el.classList.add('bounceInUp')
          }
        })
      }
    }
    // 节流
    handleScroll = throttle(handleScroll, 500, 200)
    window.addEventListener('scroll', handleScroll)
    return {
      articleList,
      panelRefs
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
