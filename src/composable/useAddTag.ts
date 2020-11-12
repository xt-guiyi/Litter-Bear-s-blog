/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-11 18:52:10
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-12 09:57:50
 */
import { nextTick, ref } from 'vue'

/**
 * 添加标签
 */
export default function useAddTag () {
// 标签列表
  const tags = ref([
    '生活',
    '前端'
  ])
  // 是否打开添加按钮输入框
  const inputVisible = ref(false)
  // 添加按钮输入框内容
  const inputValue = ref('')
  // 添加标签dom
  const inputRef = ref<HTMLInputElement>()

  // 关闭标签
  const handleClose = (removedTag: string) => {
    const newTags = tags.value.filter(tag => tag !== removedTag)
    tags.value = newTags
  }

  // 打开添加标签输入框
  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      if (inputRef.value !== undefined) {
        inputRef.value.focus()
      }
    })
  }

  // 保存到tags标签列表
  const handleInputConfirm = () => {
    if (inputValue.value && tags.value.indexOf(inputValue.value) === -1) {
      tags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
  }

  return {
    tags,
    inputVisible,
    inputValue,
    inputRef,
    handleClose,
    showInput,
    handleInputConfirm
  }
}
