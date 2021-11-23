<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2021-07-28 19:06:14
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-07-28 19:08:11
-->
<template >
  <div class="about-me-wrap">
    <base-panel minHeight="50rem">
      <h5>关于我</h5>
      <p class="about-my">{{aboutMy}}</p>
    </base-panel>
  </div>
</template>

<script setup ling="ts">
import { getAboutMy } from '@/api/common/aboutMy'
import { onMounted, ref } from 'vue'

export const aboutMy = ref('')
const getAboutMys = async () => {
  const { data } = await getAboutMy()
  if (data.status === 200) {
    aboutMy.value = data.data.aboutMy
  }
}

onMounted(() => {
  getAboutMys()
})
</script>

<style lang="scss" scoped>
  h5 {
    font-size: 3rem;
    text-align: center;
  }
  .about-my {
    font-size: 1.8rem;
    text-indent: 4rem;
    font-weight: bolder;
  }
</style>
