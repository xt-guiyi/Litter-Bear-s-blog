<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-11 10:11:54
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-16 17:12:55
-->
<template>
  <main id="blog-main">
    <div class="main-title">
        <div class="title-center">
          <h1>小熊熊的秘密基地</h1>
          <span>每天都要赚好多好多钱</span>
        </div>
    </div>
    <div id="main-container">
      <div class="main-content">
        <section class="carefully-chosen" >
          <div class="sectionWrap" ref="sectionWrapRef">
            <router-view v-slot="{ Component }">
              <transition enter-active-class="animated bounceInUp">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </section>
        <aside class="asider-bar" >
          <div
            class="aside-wrap affix-initial"
            ref="asideWrapRef"
            :style="[isAffixBottom? affixTop : '']"
            :class="[isAffixMove? 'affix-move' : '', isAffixBottom? 'affix-bottom' : '']"
          >
            <!-- 个人介绍 -->
            <base-panel height="25rem" margin="0 0 2rem 0" padding="none;">
                <div class="personal-container">
                  <div class="personal-bg"></div>
                  <div class="avatar-container" >
                    <a href="#">
                      <img src="https://www.datealive.top/wp-content/uploads/2020/04/44b08f627e804f25953fdf1c4f0230d7400x400.jpeg" alt="点击登录">
                    </a>
                  </div>
                  <div class="short-sentences">
                    <span>一生一代一双人，争教两处销魂|</span>
                  </div>
                </div>
            </base-panel>
            <!-- 访客介绍 -->
            <base-panel height="25rem" margin="0 0 2rem 0">
              <div class="visitors-info-container">
                <div class="title">
                  欢迎来此，您是第<span>1</span>位访问的网友
                </div>
                <base-one-px/>
              </div>
            </base-panel>
            <!-- 文章分类 -->
            <base-panel height="50rem" margin="0 0 2rem 0">
              <div class="visitors-info-container">
                <table-change :titleSouce="titleInfoOne">
                  <table-pane :activeKey="1">
                    <div class="info-content">
                      1111
                    </div>
                  </table-pane>
                </table-change>
              </div>
            </base-panel>
            <!-- 云标签 -->
            <base-panel height="25rem" margin="0 0 2rem 0">
              <div class="clould-tag-container">
                <div class="title">
                  云标签
                </div>
                <base-one-px/>
              </div>
            </base-panel>
            <!-- 最近评论 -->
            <base-panel height="40rem" margin="0 0 2rem 0">
              <div class="commont-container">
                <div class="title">
                  最近评论
                </div>
                <base-one-px/>
              </div>
            </base-panel>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import TableChange from '@/components/table/TableChange.vue'
import TablePane from '@/components/table/TablePane.vue'
import { throttle } from '@/utils/commonUse'
export default defineComponent({
  name: 'BlogThemeOneMain',
  components: {
    TableChange,
    TablePane
  },
  setup () {
    const store = useStore()
    // 标题
    const titleInfoOne = reactive([
      { title: '最新文章' },
      { title: '热点文章' },
      { title: '随机文章' }
    ])
    const sectionWrapRef = ref<Element>()
    const asideWrapRef = ref<Element>()
    // 是否显示样式
    const isAffixMove = computed(() => store.state.blogThemeOneMain.isAffixMove)
    const isAffixBottom = computed(() => store.state.blogThemeOneMain.isAffixBottom)
    // 初始top值
    const initTop = ref<number>(0)
    // top偏差值
    const affixTop = reactive({
      top: ''
    })

    /**
     * 让aside停留在可视范围
     */
    let asideVisual = function () {
      requestAnimationFrame(() => {
        // 如果右边高度大于左边才进行计算
        if (sectionWrapRef.value!.clientHeight >= asideWrapRef.value!.clientHeight) {
        // console.log(sectionWrapRef.value.getBoundingClientRect().top)
        // 如果左边向上滚动
          if (sectionWrapRef.value!.getBoundingClientRect().height && sectionWrapRef.value!.getBoundingClientRect().top <= 75) {
          // 如果 左边向上滚动的距离 > 左边与右边的高度之差 - 元素距离顶部初始高度
          // 即左右两边元素底部相等
            if (
              -(sectionWrapRef.value!.getBoundingClientRect().top) >=
            sectionWrapRef.value!.getBoundingClientRect().height -
            asideWrapRef.value!.getBoundingClientRect().height - initTop.value
            ) {
            // console.log(true)
            // isAffixMove.value = false
            // isAffixBottom.value = true
              store.dispatch('updateBlogThemeOneMain', { isAffixBottom: true, isAffixMove: false })
              affixTop.top = `${(sectionWrapRef.value!.getBoundingClientRect().height -
            asideWrapRef.value!.getBoundingClientRect().height - initTop.value)}px`
            } else {
            // console.log(false)
            // isAffixMove.value = true
            // isAffixBottom.value = false
              store.dispatch('updateBlogThemeOneMain', { isAffixBottom: false, isAffixMove: true })
            }
          } else if (sectionWrapRef.value!.getBoundingClientRect().top >= 75) {
            store.dispatch('updateBlogThemeOneMain', { isAffixBottom: false, isAffixMove: false })
          // isAffixMove.value = false
          }
        }
      })
    }
    asideVisual = throttle(asideVisual, 50, 25)
    // 子路由更新重置值
    onBeforeRouteUpdate((to, from, next) => {
      // isAffixMove.value = false
      // isAffixBottom.value = false
      store.dispatch('updateBlogThemeOneMain', { isAffixBottom: false, isAffixMove: false })
      next()
    })
    onMounted(() => {
      // 更新top值
      initTop.value = sectionWrapRef.value!.getBoundingClientRect().top

      window.addEventListener('scroll', asideVisual)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', asideVisual)
    })

    return {
      titleInfoOne,
      sectionWrapRef,
      asideWrapRef,
      isAffixMove,
      isAffixBottom,
      affixTop
    }
  }
})
</script>

<style lang="scss" scoped>
#blog-main {
  margin-top: 6rem;
  .main-title {
    height: 20rem;

    .title-center {
      height: inherit;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      h1 {
        font-size: 4rem;
        color: inherit;
      }

      span {
        font-size: 2.5rem;
        margin-top: 1rem;
      }
    }
  }
}

#main-container {

}

.main-content {
  width: 60vw;
  margin: 0 auto;
  display: flex;

  .carefully-chosen {
    width: 42vw;

  }

  .asider-bar {
    width: 16vw;
    margin-left: 2vw;
    position: sticky;
    top: 40px;

    .personal-container {
      height: 100%;
      display: flex;
      flex-direction: column;

      .personal-bg {
        flex: 0 0 12.5rem;
        background:url(https://www.datealive.top/wp-content/uploads/2020/04/preview.jpg) no-repeat center center;
        -webkit-background-size:cover;
        background-size:cover;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      .avatar-container {
        flex: 2;

        a {
          display: block;
          width: 10rem;
          height: 10rem;
          margin: -5rem auto;
          transform: rotate(0deg);
          transition: all 0.3s ease-in;

          img {
            width: inherit;
            height: inherit;
            border: rgba(255,255,255,.4) 4px solid;
            border-radius: 50%;
          }
        }

        a:hover {
          transform: rotate(360deg);
          width: 11rem;
          height: 11rem;
        }

      }

      .short-sentences {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          font-size: 2rem;
          color: var(--bear-color-4);
          text-align: center;
        }
      }
    }

    .visitors-info-container,
    .clould-tag-container,
    .commont-container {
      margin: 1rem;
      .title {
        font-size: 1.5rem;
        text-align: center;
      }
    }

    .visitors-info-container {
        span {
          font-size: 1.6rem;
          color: var(--bear-color-5);
        }
    }
  }

  .aside-wrap{
    width: inherit;
  }

  .affix-initial{
    position: relative;
  }

  .affix-move {
    position: fixed;
    top: 7.5rem;
  }

  .affix-bottom {
    position: absolute;
  }
}

</style>
