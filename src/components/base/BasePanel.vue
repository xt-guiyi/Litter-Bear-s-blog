<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-08 18:40:50
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-08 20:25:42
-->
<template>
  <div class="base-panel-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BasePanel',
  props: {
    height: {
      type: String
    },
    margin: {
      type: String,
      default: '0 0 0 0'
    },
    padding: {
      type: String,
      default: '2rem 2rem'
    }
  }

})
</script>

<style lang="scss" scoped  vars="{ height, margin, padding }">
.base-panel-container {
  height: var(--height);
  margin: var(--margin);
  background-color: white;
  padding: var(--padding);
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  border-radius: 10px;
}
</style>
