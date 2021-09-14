<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2021-07-26 10:13:27
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-07-28 19:33:00
-->
<template >
  <div id="recommendedNovel-wrap">
    <base-panel>
      <header>
        <h1>我的书架</h1>
        <small>目前共收藏{{ 10 }}本, 已读完{{5}}本,加油</small>
      </header>
      <div class="ranking">
        <h5>心中最佳:</h5>
        <div class="ranking-list">
          <base-book v-for=" (item,index ) in 3" :key="index" title="龙与虎" image="https://privateimage-1306081565.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E4%B8%8E%E8%99%8E%20(10).jpg"/>
        </div>
      </div>
      <div class="ranking">
        <h5>已读完的书:</h5>
        <div class="ranking-list">
          <base-book v-for=" (item,index ) in 12" :key="index" title="龙与虎" image="https://privateimage-1306081565.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E4%B8%8E%E8%99%8E%20(10).jpg"/>
        </div>
      </div>
      <div class="ranking">
        <h5>正在读的书:</h5>
        <div class="ranking-list">
          <base-book v-for=" (item,index ) in 12" :key="index" title="龙与虎" image="https://privateimage-1306081565.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E4%B8%8E%E8%99%8E%20(10).jpg"/>
        </div>
      </div>
      <div class="ranking">
        <h5>待读列表:</h5>
        <div class="ranking-list">
          <base-book v-for=" (item,index ) in 12" :key="index" title="龙与虎" image="https://privateimage-1306081565.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E4%B8%8E%E8%99%8E%20(10).jpg"/>
        </div>
      </div>
    </base-panel>
  </div>
</template>

<style lang="scss">

header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 700;
    text-shadow: 0 0 3px #000;
    margin-bottom: 2rem;
    h1 {
      font-size: 3rem;
      text-align: center;
    }

    small{
      font-size: 2rem;
      text-align: center;
      letter-spacing: 2px;

    }
  }

.ranking {
  width:  100%;
  h5 {
    position: relative;
    font-size: 2.3rem;
    height: 3rem;
    line-height: 3rem;
    text-indent: 2rem;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        height: inherit;
        width: 0.5rem;
        background: Gold;
      }
  }

  .ranking-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 16rem);
  }
}
</style>
