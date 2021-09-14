<template>
  <div class="place-on-file-wrap">
    <base-panel>
      <header>
        <h1>文章归档</h1>
        <small>目前共发表{{ articleTotal }}篇文章,加油</small>
      </header>
      <div class="article-three-container">
        <ul class="timeline">
          <template v-for="(item, index) of articleList" :key="index">
            <li class="tl-header">
              <h2 :style="styleList[index]">{{ transformYearAndMonth(item.createdAt) }}</h2>
            </li>
            <div class="tl-body">
              <li class="tl-item">
                <div class="tl-wrap" :style="styleList[index]">
                  <span class="tl-date">{{ transformDate(item.createdAt) }}</span>
                  <h3 class="tl-content" :style="styleList[index]">
                    <span></span>
                    <a>{{ item.articleTitle }}</a>
                  </h3>
                </div>
              </li>
            </div>
          </template>
        </ul>
      </div>
    </base-panel>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { getArticleList } from '@/api/article'
import { transformYearAndMonth, transformDate } from '@/utils/commonUse'
export default defineComponent({
  name: 'PlaceOnFile',
  setup () {
    const articleList = ref([])
    const articleTotal = ref(0)
    const colorList = ['#F99FB2', '#55DCAB', '#AEE05B', '#8D7EEA', '#F75DB1', '#3a3f51', '#f05050', '#23b7e5']
    const styleList: Record<string, unknown>[] = []

    // 生成随机颜色
    function randomColor () {
      for (let index = 0; index < articleList.value.length; index++) {
        const index = Math.floor(Math.random() * colorList.length)
        const tagColors = {
          backgroundColor: colorList[index],
          borderColor: colorList[index]
        }
        console.log(tagColors)

        styleList.push(tagColors)
      }
    }
    // 发送请求
    (async function sendArticleList () {
      const { data } = await getArticleList({ all: true })
      articleList.value = (data.articleList as never[]).reverse()
      articleTotal.value = data.total
      randomColor()
    })()

    return {
      articleList,
      styleList,
      articleTotal,
      transformYearAndMonth,
      transformDate
    }
  }
})
</script>

<style lang="scss" scoped>
.place-on-file-wrap {
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 700;
    text-shadow: 0 0 3px #000;
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

  .article-three-container {
    padding: 20px;
    .timeline {
      .tl-header{
        display: block;
        width: 12em;
        margin: 0 2px 0 2px;
        text-align: center;
        h2 {
          height: 3rem;
          line-height: 3rem;
          padding: 0 1.5rem 0 1.5rem;
          border-radius: 5rem;
          color: #fff!important;

        }
      }

      .tl-body {
        .tl-item {
          display: block;
          .tl-wrap {
            display: block;
            padding: 15px 0 15px 20px;
            margin-left: 6em;
            border-color: #dee5e7;
            border-style: solid;
            border-width: 0 0 0 4px;
            background-color: white!important;
            &::before {
              position: relative;
              top: 15px;
              float: left;
              width: 10px;
              height: 10px;
              margin-left: -27px;
              background: #edf1f2;
              border-color: inherit;
              border-style: solid;
              border-width: 3px;
              border-radius: 50%;
              content: "";
              box-shadow: 0 0 0 4px #f0f3f4
            }

            .tl-date {
              position: relative;
              top: 10px;
              display: block;
              float: left;
              width: 4.5em;
              margin-left: -8em;
              text-align: right;
            }

            .tl-content {
              position: relative;
              display: inline-block;
              padding: 1rem 1.5rem 1rem 1.5rem;
              border-radius: 7px;
              box-shadow: 1px 1px 1px 3px rgba(0,0,0, 1);
              background-color: #23b7e5;
              font-size: 1.6rem;
              span {
                position: relative;
                &::after {
                  position: absolute;
                  left: -1.6rem;
                  top: -1.2rem;
                  content: '';
                  border-right: 1.2rem solid transparent;
                  border-top: 1.2rem solid transparent;
                  border-bottom: 1.2rem solid inherit;
                  transform: rotate(45deg);
                }
              }
              a{
                color: white;
              }
            }
          }
        }
      }
    }
  }
}

</style>
