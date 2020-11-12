<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-04 10:36:17
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-12 11:18:54
-->
<template>
  <header id="blog-header">
    <nav class="header-nav">
      <ul class="wrap">
        <li class="nav-1">
          <router-link :to="{ name:'Home'}" >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-ai-home"></use>
            </svg>
            首页
          </router-link>
        </li>
        <li class="nav-2">
          <router-link :to="{ name: 'ShortSentences'}" >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bi"></use>
            </svg>
            随言
          </router-link>
        </li>
        <li class="nav-3">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wenzhang-copy"></use>
          </svg>
          文章
        </li>
        <li class="nav-4">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tubiao1shuxiaoshuo"></use>
          </svg>
          小说
        </li>
        <li class="nav-5">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guidang"></use>
          </svg>
          归档
        </li>
        <li class="nav-6">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-relevance"></use>
          </svg>
          友链
        </li>
        <li class="nav-7">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanyuwomen"></use>
          </svg>
          关于我
        </li>
      </ul>
    </nav>
  </header>
  <slot name="blogThemeOneMain"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlogThemeOne'

})
</script>

<style lang="scss" scoped>
#blog-header {
  width: 100%;
  height: 6rem;
  line-height: 6rem;
  font-size: 2rem;
  color: white;
  background-color: rgba(40,42,44,.6);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
}

.header-nav {
  width: 60vw;
  height: inherit;
  margin: 0 auto;

  .wrap {
    height: inherit;
    display: flex;

    li {
      flex: auto;
      cursor: pointer;
    }
  }
}

.router-link-active {
  color: var(--bear-color-0);
}
</style>
