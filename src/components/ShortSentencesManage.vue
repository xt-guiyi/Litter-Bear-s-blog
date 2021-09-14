<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-12-08 21:13:34
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-12-08 21:59:37
-->
<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <template #name="{text}">
        <a>{{ text }}</a>
      </template>
  </a-table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue'
import { getSentencesList } from '@/api/shortSentences'
import { PaginationData } from '@/api/types'
export default defineComponent({
  name: 'ShortSentencesManage',
  setup (props) {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        slots: { customRender: 'name' }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 80
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address 1',
        ellipsis: true
      },
      {
        title: 'Long Column Long Column Long Column',
        dataIndex: 'address',
        key: 'address 2',
        ellipsis: true
      },
      {
        title: 'Long Column Long Column',
        dataIndex: 'address',
        key: 'address 3',
        ellipsis: true
      },
      {
        title: 'Long Column',
        dataIndex: 'address',
        key: 'address 4',
        ellipsis: true
      }
    ]

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 2 Lake Park, London No. 2 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ]
    const sentencesLitst = ref([])
    const shortSentencesTotal = ref(0)
    // 分页器
    const currentPage = ref(1)
    const pageSize = ref(12)
    const paginationParameter = computed<PaginationData>(() => {
      return {
        limit: pageSize.value,
        offset: pageSize.value * (currentPage.value - 1)
      }
    })
    // 发送请求
    async function sendSentencesList (paginationParameter: ComputedRef<PaginationData>) {
      const { data } = await getSentencesList(paginationParameter.value)
      console.log(data)
      sentencesLitst.value = data.shortSentencesList
      shortSentencesTotal.value = data.total
    }
    sendSentencesList(paginationParameter)
    return {
      data,
      columns
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
