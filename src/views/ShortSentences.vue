<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-09 17:53:55
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-10 11:21:02
-->
<template>
  <div class="sentences-list">
    <base-panel
    margin="0 0 1rem 0"
    :mouseoverEnlarge="true"
    v-for="(item, index) of sentencesLitst"
    :key="index"
    >
      <div class="sentences-container">
        <div class="release-date">
          <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-rili"></use>
          </svg>
          {{ new Date(item.createdAt).toLocaleString() }}
        </div>
        <article class="content"  v-html="item.shortSentencesHtml">
        </article>
      </div>
    </base-panel>
    <div class="pagination-container">
      <a-pagination
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        :total="shortSentencesTotal"
        @change="changePage"
        show-less-items
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { getSentencesList } from '@/api/shortSentences'
import { PaginationData } from '@/api/types'
export default defineComponent({
  name: 'ShortSentences',
  setup () {
    const store = useStore()

    // 句子列表
    const sentencesLitst = ref([])
    // 分页器
    const currentPage = ref(1)
    const pageSize = ref(12)
    const shortSentencesTotal = ref(0)
    const paginationParameter = computed<PaginationData>(() => {
      return {
        limit: pageSize.value,
        offset: pageSize.value * (currentPage.value - 1)
      }
    })
    // 发送请求
    async function sendSentencesList (paginationParameter: ComputedRef<PaginationData>) {
      const { data } = await getSentencesList(paginationParameter.value)
      console.log(data)
      sentencesLitst.value = data.shortSentencesList
      shortSentencesTotal.value = data.total
    }

    watchEffect(() => {
      store.dispatch('updateBlogThemeOneMain', { isAffixBottom: false, isAffixMove: false })
      window.scroll(0, 0)
      sendSentencesList(paginationParameter)
    })

    function changePage (newPage: number, newPageSize: number) {
      console.log(newPage, newPageSize)
      currentPage.value = newPage
      pageSize.value = newPageSize
    }

    return {
      sentencesLitst,
      currentPage,
      pageSize,
      shortSentencesTotal,
      changePage

    }
  }
})
</script>

<style lang="scss" scoped>
.sentences-container {
  min-height: 11rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .release-date {
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }

  .content {
    width: 90%;
    height: auto;
    overflow-wrap: break-word;
    font-size: 2rem;
    text-align: center;
  }
}

.pagination-container{
  height: 10rem;
  line-height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;;
}
</style>
