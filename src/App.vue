<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-12 11:27:02
-->
<template>
  <div class="bg"></div>
  <base-login  @to-backstage="toBackstage" />
  <blog-theme-one>
    <template v-slot:blogThemeOneMain >
      <router-view v-slot="{ Component, route }">
        <transition :enter-active-class="route.meta.enterAnimated" :leave-active-class="route.meta.leaveAnimated" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </template>
  </blog-theme-one>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const router = useRouter()
    const toBackstage = (data: boolean) => {
      if (data) {
        router.push({ name: 'Backstage' })
      } else {
        router.push({ name: 'Home' })
      }
      console.log(data)
    }
    return {
      toBackstage
    }
  }
})
</script>
<style lang="scss">
#app {
  width: 100%;
  overflow: hidden;
  .bg {
    background-image: url('./assets/image/bg.jpg');
    background-size: cover;
    background-position: right bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: fixed;
    top: 0;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
