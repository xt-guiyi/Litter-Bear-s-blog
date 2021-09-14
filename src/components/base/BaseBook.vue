<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2021-07-26 10:53:51
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-07-28 19:34:23
-->
<template >
  <div class="book-wrap">
      <a  class="book-img-herf" href="#">
        <div class="book-img">
            <img :src="image" :alt="title">
        </div>
        <aside class="title">{{title}}</aside>
      </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BaseBook',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    image: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scope>
  .book-wrap {
      width: 14rem;
      display: flex;
      flex-direction: column;
      align-content: center;
      cursor: pointer;
      margin: 0 auto;
      margin-bottom: 4rem;
      box-shadow: 0 1px 6px rgba(0 ,0 ,0, 0.35), 0 0 5px #f9f2e9 inset;
      border-radius: 0.2rem;
      .book-img-herf {
        width: inherit;
        display: block;
        color: black;

        .book-img {
          width: inherit;
          height: 14rem;
          overflow: hidden;
          img {
            width: inherit;
            height: 18rem;
            border: 1px solid rgb(226, 226, 226);
            transition: all .3s ease;
          }
        }

        .title {
          height: 4rem;
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          transition: all .3s ease;

        }

      }

      .book-img-herf:hover  img {
        transform: scale(1.08);

      }

      .book-img-herf:hover  .title {
        color: skyblue;
      }

  }

</style>
