<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-11 11:06:30
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-11 11:12:26
-->
<template>
  <div class="login" @click="login">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-denglu"></use>
    </svg>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'BaseLogin',
  emits: {
    'to-backstage': null
  },
  setup (props, context) {
    const login = () => {
      const isLogin = confirm('是否登录')
      context.emit('to-backstage', isLogin)
    }
    return {
      login
    }
  }
})

</script>

<style lang="scss" scoped>
.login {
    width: 4rem;
    height: 6rem;
    line-height: 6rem;
    font-size: 3rem;
    text-align: center;
    background-color: var(--bear-color-1);
    position: fixed;
    right: 0;
    top: 16rem;
    cursor: pointer;
  }
</style>
