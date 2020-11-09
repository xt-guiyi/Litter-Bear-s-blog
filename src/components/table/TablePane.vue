<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-08 21:15:07
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-08 21:20:39
-->

<template>
<div v-if="show">
  <slot></slot>
</div>
</template>

<script lang='ts'>
import {
  defineComponent,
  inject,
  ref,
  Ref,
  watchEffect
} from 'vue'
export default defineComponent({
  name: 'TablePane',
  setup (props) {
    const show = ref(false)
    const selectionitem = inject<Ref<number>>('currentItem')
    watchEffect(() => {
      if (selectionitem?.value === props.activeKey) {
        show.value = true
      } else {
        show.value = false
      }
    })
    return {
      show
    }
  },
  props: {
    activeKey: {
      type: Number,
      default: 1
    }
  }
})
</script>
