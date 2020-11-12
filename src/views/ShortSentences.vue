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
          {{ item.releaseTime }}
        </div>
        <article class="content">
          <p>
            {{ item.articleContent }}
          </p>
        </article>
      </div>
    </base-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getSentencesList } from '@/api/article/article'
export default defineComponent({
  name: 'ShortSentences',
  setup () {
    // 句子列表
    const sentencesLitst = reactive([])
    // 发送请求
    const sendSentencesList = async () => {
      const { data } = await getSentencesList()
      data.forEach((item: never) => {
        sentencesLitst.push(item)
      })
    }
    sendSentencesList()
    return {
      sentencesLitst
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
    font-size: 2rem;
    text-align: center;
  }
}
</style>
