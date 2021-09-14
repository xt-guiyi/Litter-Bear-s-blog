<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2021-07-28 17:01:21
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-07-28 18:49:34
-->
<template >
  <a class="link" href="#">
    <img class="avatar" :src="linkInfo.img" alt="">
    <p class="nickname">{{linkInfo.nickname}}</p>
    <p class="description">{{linkInfo.descriptiton}}</p>
  </a>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BaseLink',
  props: {
    linkInfo: {
      type: Object,
      default: () => {
        return {
          img: 'https://privateimage-1306081565.cos.ap-shanghai.myqcloud.com/loading.svg',
          nickname: '',
          descriptiton: ''
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .link {
    display: grid;
    color: black;
    height: 8rem;
    grid-template-columns: repeat(1,60px auto);
    grid-template-rows: repeat(2,40px);
    justify-items: center;
    align-items: center;
    text-shadow: 0 1px 2px rgba(0, 0 ,0 ,0.15);
    transition: all .1s ease-in;
  }

  .link:hover {
    background: rgba(135,206,235,0.3);
  }

  .avatar {
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-row-end: 3;
    padding-left: 1rem;
  }

  .nickname {
    font-size: 2rem;
    grid-column-start: 2;
    grid-row-start: 1;
    justify-self: flex-start;
    align-self: flex-end;
    padding-left: 2rem;
  }

  .description {
    font-size: 1.8rem;
    grid-column-start: 2;
    grid-row-start: 2;
    justify-self: flex-start;
    padding-left: 2rem;
    align-self: flex-start;

  }
</style>
