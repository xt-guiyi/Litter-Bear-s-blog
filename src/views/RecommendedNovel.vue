<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2021-07-26 10:13:27
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-11-22 13:57:12
-->
<template >
  <div id="recommendedNovel-wrap">
    <base-panel>
      <header>
        <h1>我的书架</h1>
        <small>目前共收藏{{ novleToal }}本, 已读完{{novleData.finishedReading.length}}本,加油</small>
      </header>
      <div class="ranking" v-if="novleData.favorite.length > 0">
        <h5>心中最佳:</h5>
        <div class="ranking-list">
          <base-book v-for=" (item,index ) in novleData.favorite" :key="index" title="龙与虎" image="https://privateimage-1306081565.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E4%B8%8E%E8%99%8E%20(10).jpg"/>
        </div>
      </div>
      <div class="ranking" v-if="novleData.finishedReading.length > 0">
        <h5>已读完的书:</h5>
        <div class="ranking-list">
          <base-book v-for=" (item,index ) in novleData.finishedReading" :key="index" title="龙与虎" image="https://privateimage-1306081565.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E4%B8%8E%E8%99%8E%20(10).jpg"/>
        </div>
      </div>
      <div class="ranking" v-if="novleData.reading.length > 0">
        <h5>正在读的书:{{msg}}</h5>
        <div class="ranking-list">
          <base-book v-for=" (item,index ) in novleData.reading" :key="index" title="龙与虎" image="https://privateimage-1306081565.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E4%B8%8E%E8%99%8E%20(10).jpg"/>
        </div>
      </div>
      <div class="ranking" v-if="novleData.unread.length > 0">
        <h5>待读列表:</h5>
        <div class="ranking-list">
          <base-book v-for=" (item,index ) in novleData.unread" :key="index" title="龙与虎" image="https://privateimage-1306081565.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E4%B8%8E%E8%99%8E%20(10).jpg"/>
        </div>
      </div>
    </base-panel>
  </div>
</template>

<script  lang="ts" setup>
import { getNovelList } from '@/api/novel'
import { onMounted, ref } from 'vue'

// 获取小说数据
type ReadStatus = 'reading' | 'finishedReading' | 'unread'
interface NovelInfo {
  novelName: string;
  novelDescription: string;
  novelImage: string;
  readStatus: ReadStatus;
  novelAuthor: string;
  favorite?: boolean;
  id?: string;
}
interface CatageoryData<T> {
  reading: T[];
  finishedReading: T[];
  unread: T[];
  favorite: T[];
}

// 小说数据
export const novleData = ref<CatageoryData<NovelInfo>>({
  reading: [],
  finishedReading: [],
  unread: [],
  favorite: []
})
// 小说总数
export const novleToal = ref(0)

// 分类函数
const catageoryNovle = (novleData: NovelInfo[]) => {
  const catageoryData: CatageoryData<NovelInfo> = {
    reading: [],
    finishedReading: [],
    unread: [],
    favorite: []
  }

  novleData.forEach(item => {
    const r = item.readStatus
    const f = item.favorite
    f && catageoryData.favorite.push(item)
    catageoryData[r].push(item)
  })
  return catageoryData
}

// 请求数据
const getNovelData = async () => {
  const { data } = await getNovelList()
  if (data.status === 200) {
    novleToal.value = data.data.length
    novleData.value = catageoryNovle(data.data)
  }
  console.log(novleData.value)
}
onMounted(() => {
  getNovelData()
})
</script>

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
    margin-bottom: 2rem;
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
    grid-template-columns: repeat(auto-fill, 33.33%);
  }
}
</style>
