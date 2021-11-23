<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-08 20:58:57
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-08 21:23:21
-->
<template>
<div id="table-container">
  <div class="table-main" @click="tableChange">
    <div class="table-items" v-for="( item, index ) of titleSouce" :class="[ index === currentItem - 1? 'active-table' : '' ]" :key="index" :data-key="++index">
      <div class="table-title">{{ item.title }}</div>
    </div>
  </div>
</div>
<slot></slot>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  ref
} from 'vue'
export default defineComponent({
  name: 'TableChange',
  props: {
    // 数据源
    titleSouce: {
      type: Array,
      required: true
    },
    // 默认项
    defaultItem: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    const currentItem = ref(props.defaultItem)
    const tableChange = function (e: Event) {
      const dom: any = e.target
      const keyValue = dom.parentNode?.dataset.key ? dom.parentNode.dataset.key : dom.dataset.key
      if (keyValue) {
        currentItem.value = parseInt(keyValue)
      }
    }
    provide('currentItem', currentItem)
    return {
      currentItem,
      tableChange
    }
  }
})
</script>

<style lang="scss" scoped>
#table-container {
  height: 3rem;
  font-size: 1.8rem;
  text-align: center;
  background-color: white;
  border-bottom: 1px solid silver;
  margin-bottom: 1rem;
}
.table-main {
  height: 100%;
  color: #919191;
  display: flex;
  .table-items {
    flex: 0 0 33.3%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
}
.active-table {
  color: #E8514A;
  &::after {
    content: "";
    background-color: skyblue;
    height: 2px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
