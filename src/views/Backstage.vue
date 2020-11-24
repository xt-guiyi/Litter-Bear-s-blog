<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-11 10:32:26
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-19 11:21:08
-->
<template>
  <div class="backstage-content">
    <base-panel  style="opacity: 0.8; height: 80rem;">
      <h2>网站管理中心</h2>
      <a-tabs
        size="large"
        tabPosition="left"
        :tabBarStyle="tabBarStyle"
      >
        <a-tab-pane key="1" tab="发布随言">
          <release-short-sentences />
        </a-tab-pane>
        <a-tab-pane key="2" tab="发布文章" force-render>
          <release-article />
        </a-tab-pane>
        <a-tab-pane key="3" tab="发布小说">
          发布小说
        </a-tab-pane>
        <a-tab-pane key="4" tab="内容管理">
          <a-tabs type="card" @change="callback">
            <a-tab-pane key="1" tab="随言管理">
              随言管理
            </a-tab-pane>
            <a-tab-pane key="2" tab="文章管理">
              文章管理
            </a-tab-pane>
            <a-tab-pane key="3" tab="小说管理">
              小说管理
            </a-tab-pane>
          </a-tabs>
        </a-tab-pane>
      </a-tabs>
    </base-panel>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import ReleaseArticle from './ReleaseArticle.vue'
import ReleaseShortSentences from './ReleaseShortSentences.vue'
export default defineComponent({
  name: 'Backstage',
  components: {
    ReleaseArticle,
    ReleaseShortSentences
  },
  setup () {
    const tabBarStyle = reactive({

    })
    return {
      tabBarStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.backstage-content {
  width: 80vw;
  margin: 12rem  auto 0rem;

  h2 {
    font-size: 3rem;
    text-align: center;
  }
}
</style>
