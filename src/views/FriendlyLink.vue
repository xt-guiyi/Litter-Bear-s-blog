<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2021-07-28 16:53:13
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-07-28 19:09:22
-->
<template >
  <div class="friendly-link-wrap">
    <base-panel>
      <h5 class="title">小伙伴们</h5>
      <base-one-px/>
      <div class="links">
        <base-link v-for="(item, index) in 20" :key="index"/>
      </div>
      <base-one-px/>
      <div class="my-website">
        <h6>站点信息</h6>
        <p>站点名称：小星星滚呀滚</p>
        <p>站点描述：你开心，我随意。</p>
        <p>站点地址：https://xiaoyou66.com</p>
      </div>
    </base-panel>
  </div>
</template>

<style lang="scss">
  .title {
    font-size: 3rem;
    text-align: center;
    margin: 0 0 0 1rem;
  }

  .links {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }

  .my-website {
    margin-top: 1rem;
    h6 {
      font-size: 2.3rem;
      font-weight: bold;
      position: relative;
      text-indent: 2rem;
      height: 3rem;
      line-height: 3rem;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        height: inherit;
        width: 0.5rem;
        background: Gold;
      }
    }

    p {
      font-size: 2rem;
      text-indent: 2rem;
    }
  }
</style>
