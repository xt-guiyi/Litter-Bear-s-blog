<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-08 18:40:50
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-12 13:51:57
-->
<template>
  <div
    class="base-panel-container"
    :class="[ isEnlarge? 'enlarge' : '' ]"
    @mouseover="mouseoverWatch"
    @mouseout="mouseoutWatch"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
export default defineComponent({
  name: 'BasePanel',
  props: {
    height: {
      type: String
    },
    minHeight: {
      type: String,
      default: '15rem'
    },
    margin: {
      type: String,
      default: '0 0 0 0'
    },
    padding: {
      type: String,
      default: '2rem 2rem'
    },
    mouseoverEnlarge: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { mouseoverEnlarge } = toRefs(props)
    const isEnlarge = ref(false)
    const mouseoverWatch = function () {
      if (mouseoverEnlarge.value) isEnlarge.value = true
    }
    const mouseoutWatch = function () {
      if (mouseoverEnlarge.value) isEnlarge.value = false
    }

    return {
      isEnlarge,
      mouseoverWatch,
      mouseoutWatch
    }
  }
})
</script>

<style lang="scss"  >
.base-panel-container {
  height: v-bind(height);
  min-height: v-bind(minHeight);
  margin: v-bind(margin);
  background-color: white;
  padding: v-bind(padding);
  box-shadow: 0 2px 4px rgba(0,0,0,.1),
              0 0 0 1px #CDC9C9;
  border-radius: 10px;
  transition: all .2s ease-in-out;
}

.enlarge {
  // transform: scale3d(1, 1, 1);
  transform:translate3d(0, 0, 2rem) ;
  box-shadow: 0 0 0 2px #CDC9C9,
              inset 0 -2rem 2rem rgba(0,0,0,0.2),
              0 0.25rem 1.2rem 0rem #eeff00;
}
</style>
