<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-18 14:44:45
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-19 10:48:33
-->
<template>
  <div ref="editorRef" class="wang-editor"></div>
  <!-- 发布句子 -->
  <div class="save-Sentences">
    <p @click="modalVisible = true">发布句子</p>
      <a-modal
        style="top: 20px;"
        :bodyStyle="{fontSize: '2.4rem', textAlign: 'center'}"
        v-model:visible="modalVisible"
        title="提示"
        ok-text="确认"
        cancel-text="取消"
        centered
        @ok="uploadShortSentences"
      >
        <p>是否发布？</p>
      </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { app } from '@/main'
import useWangEditor from '@/composable/useWangEditor'
import { submitSentences, SentencesData } from '@/api/shortSentences'
import { releaseShortSentencesConfig } from '@/config/wangEditor'

export default defineComponent({
  name: 'ReleaseShortSentences',
  components: {

  },
  setup () {
    // 编辑器菜单dom
    const editorRef = ref()
    // 发布确认对话框
    const modalVisible = ref(false)
    // 添加编辑器
    const { getWangEditorContent } = useWangEditor(releaseShortSentencesConfig, editorRef)

    // 发布句子
    async function uploadShortSentences () {
      const content = getWangEditorContent()
      const sentencesLData: SentencesData = {
        shortSentencesHtml: content.html.replace(/(&nbsp;)|(?<=>[^<]*?)\s/g, ''), // 消除标签内的空格以及&nbsp;
        shortSentencesText: content.text
      }
      console.log(sentencesLData.shortSentencesHtml)
      if (sentencesLData.shortSentencesHtml) {
        const { data } = await submitSentences(sentencesLData)
        console.log(data)
      } else {
        app.config.globalProperties.$message.info('内容未填写')
      }
      modalVisible.value = false
    }

    return {
      editorRef,
      modalVisible,
      uploadShortSentences
    }
  }
})
</script>

<style lang="scss" >

  .save-Sentences {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.6rem;
    color: white;
    text-align: center;
    background-color: var(--bear-color-3);
    border-radius: 4px;
    cursor: pointer;
  }

</style>
