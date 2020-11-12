<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-11 10:32:26
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-12 13:54:54
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
          Content of Tab Pane 1
        </a-tab-pane>
        <a-tab-pane key="2" tab="发布文章" force-render>
          <wang-editor />
        </a-tab-pane>
        <a-tab-pane key="3" tab="发布小说">
          Content of Tab Pane 3
        </a-tab-pane>
      </a-tabs>
    </base-panel>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import WangEditor from '@/components/Wangeditor.vue'
export default defineComponent({
  name: 'Backstage',
  components: {
    WangEditor
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
