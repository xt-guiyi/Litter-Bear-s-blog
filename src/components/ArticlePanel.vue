<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-04 15:42:59
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-18 13:36:52
-->
<template>
  <div
    class="panel-container  animated bounceInUp"
    @mouseover="panelMouseover"
    @mouseout="panelMouseout"
    @click="toArticleDetail"
    ref="ArticlePanelRef"
  >
    <img src="../../public/top.png" class="panel-top" v-if="isTop">
    <div
      class="panel-bg"
      :class="[isShow? 'panel-bg-mouseover' : '']"
      :style="{ backgroundImage: 'url('+bgImg+')'}"
    >
    </div>
    <div class="panel-content" :class="[isShow? 'panel-content-mouseover' : '']">
      <div class="panel-text">
        <h2 class="title title-mouseover" >{{ articleTitle }}</h2>
        <div class="panel-bottom panel-bottom-mouseover" >
          <p class="article-descript">{{ articleText }}</p>
          <div class="one-line"></div>
            <div class="article-info">
              <ul>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tianchongxing-"></use>
                  </svg>
                  {{ new Date(releaseTime).toLocaleString() }}
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
import { useRouter } from 'vue-router'
import useDomHide from '@/composable/useDomHide'
export default defineComponent({
  name: 'ArticlePanel',
  props: {
    articleTitle: {
      type: String,
      default: '文章标题'
    },
    articleText: {
      type: String,
      default: '文章描述'
    },
    articleContent: {
      type: String,
      default: '文章内容'
    },
    releaseTime: {
      type: String,
      default: '发布时间'
    },
    updatedTime: {
      type: String,
      default: '更新时间'
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
    },
    bgImg: {
      type: String,
      default: 'https://blog.api.xiaoyou66.com/assets/images/background/img120.jpg'
    },
    isTop: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const isShow = ref(false)
    const isBounceInUp = ref(true)
    const ArticlePanelRef = ref<Element | null>(null)
    const router = useRouter()

    function panelMouseover () {
      isShow.value = true
      isBounceInUp.value = true
    }
    function panelMouseout () {
      isShow.value = false
    }

    function toArticleDetail () {
      // 存本地
      localStorage.setItem('article', JSON.stringify(props))
      // 进入文章详情页
      router.push({ name: 'ArticleDetailPanel' })
    }
    useDomHide(ArticlePanelRef)
    return {
      isShow,
      isBounceInUp,
      panelMouseover,
      panelMouseout,
      ArticlePanelRef,
      toArticleDetail
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';

.panel-container {
  height: 30rem;
  width: 100%;
  margin-bottom: 3rem;
  border-radius: 0.6rem;
  box-shadow: 1px 1px 3px 1px rgba(0,0,0,.2)!important;
  transition: all 0.3s;
  overflow: hidden;
}

.panel-top{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}

.panel-bg {
  height: inherit;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  transition: all 0.2s;
  position: relative;
  z-index: 10;
  overflow: hidden;
}

.panel-content {
  width: 100%;
  height: 100%;
  margin-top: -300px;
  padding-top: 12.5rem;
  background-color: rgba(0,0,0,.3)!important;
  border-radius: 5px;
  transition: all .3s;
  color: #fff!important;
  position: relative;
  z-index: 100;
  overflow: hidden;
  .panel-text {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    .title {
      width: 100%;
      height: 5rem;
      line-height: 5rem;
      font-size: 3.6rem;
      text-align: center;
      transition: all 0.3s;
      @include singleEllipsis;
    }
    .panel-bottom {
      height: calc(100% - 50px);
      transition: all 0.3s;
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
        @include singleEllipsis;
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

.panel-bg-mouseover {
  filter:blur(2px);
  transform: scale(1.05)
}

.panel-content-mouseover {
}
.panel-content-mouseover .title-mouseover {
  color: yellow;
  transform: scaleX(1.1) translate3d(0, -1.5rem, 0);
}
.panel-content-mouseover .panel-bottom-mouseover {
  transform: none!important;
  opacity: 1!important;
  z-index: -1;
}
</style>
