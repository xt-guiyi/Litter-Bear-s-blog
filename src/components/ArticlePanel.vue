<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-04 15:42:59
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-09 09:34:36
-->
<template>
  <div
    class="panel-container animated bounceInUp"
    :class="[isShow? 'panel-container-mouseover' : '']"
    @mouseover="panelMouseover"
    @mouseout="panelMouseout"
    ref="ArticlePanelRef"
  >
    <div class="panel-content" :class="[isShow? 'panel-content-mouseover' : '']">
      <div class="panel-text">
        <h2 class="title title-mouseover" >{{ articleName }}</h2>
        <div class="panel-bottom panel-bottom-mouseover" >
          <p class="article-descript">{{ articleContent }}</p>
          <div class="one-line"></div>
            <div class="article-info">
              <ul>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tianchongxing-"></use>
                  </svg>
                  {{ releaseTime }}
                </li>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                  </svg>
                  {{ commentNumber }}条评论
                </li>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yuedu"></use>
                  </svg>
                  {{ readNumber }}次阅读
                </li>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dianzan"></use>
                  </svg>
                  {{ likeNumber }}人点赞
                </li>
              </ul>
            </div>
        </div >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useDomHide from '@/composable/useDomHide'
export default defineComponent({
  name: 'ArticlePanel',
  props: {
    articleName: {
      type: String,
      default: '文章标题'
    },
    articleContent: {
      type: String,
      default: '文章内容'
    },
    releaseTime: {
      type: String,
      default: '发布时间'
    },
    commentNumber: {
      type: Number,
      default: 0
    },
    readNumber: {
      type: Number,
      default: 0
    },
    likeNumber: {
      type: Number,
      default: 0
    }
  },
  setup () {
    const isShow = ref(false)
    const isBounceInUp = ref(true)
    const ArticlePanelRef = ref<Element | null>(null)
    const panelMouseover = function () {
      isShow.value = true
      isBounceInUp.value = true
    }
    const panelMouseout = function () {
      isShow.value = false
    }
    useDomHide(ArticlePanelRef)
    return {
      isShow,
      isBounceInUp,
      panelMouseover,
      panelMouseout,
      ArticlePanelRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';

.panel-container {
  height: 30rem;
  width: 100%;
  // visibility: hidden;
  margin-bottom: 3rem;
  @include bis($url:'../assets/image/4.jpg', $size: cover, $position: 50% 50%);
  overflow: hidden;
  border-radius: 0.6rem;
  box-shadow: 1px 1px 1px 3px rgba(0,0,0, 1);
  transition: all 0.3s ease-in;
}

.panel-content {
  width: 100%;
  height: 100%;
  padding-top: 12.5rem;
  background-color:rgba(0,0,0, .1);
  transition: background-color 0.2s ease-in;
  .panel-text {
    width: 90%;
    height: 100%;
    color: white;
    margin: 0 auto;
    .title {
      width: 100%;
      height: 5rem;
      line-height: 5rem;
      font-size: 3.6rem;
      text-align: center;
      transition: all 0.2s ease-in;
    }
    .panel-bottom {
      height: calc(100% - 50px);
      transition: all 0.3s ease-in;
      opacity: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      transform: translate3d(0, -1rem, 0);
      .article-descript {
      font-size: 2rem;
      height: 4rem;
      line-height: 2rem;
      margin-bottom: 2.5rem;
      @include mulEllipsis;
      }
      .one-line {
        width: 100%;
        display: inline-block;
        border-bottom: 1px solid #dee5e7;
      }
      .article-info {
        margin: 1rem 0;
        ul {
          display: flex;
          font-size: 1.5rem;
        }
        li {
          flex: 0 0 auto;
          margin-right: 2rem;
          // text-align: center;
        }
      }
      }
    }
}

.panel-container-mouseover {
  box-shadow: 1px 3px 10px 5px rgb(255, 238, 0);
}

.panel-content-mouseover {
  background-color:rgba(0, 0, 0, .5);
}
.panel-content-mouseover .title-mouseover {
  color: yellow;
  transform: scaleX(1.1) translate3d(0, -1.5rem, 0);
}
.panel-content-mouseover .panel-bottom-mouseover {
  transform: none!important;
  opacity: 1!important;
}
</style>
