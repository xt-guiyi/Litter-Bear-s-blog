<template>
  <div>
    <div class="hd-space-between">
      <div style="margin-right:2rem">
      <!-- 标签列表 -->
        <template v-for="(tag, index) in tags" :key="index">
          <a-tooltip v-if="tag.length > 20" :title="tag">
            <a-tag :key="tag" :closable="true" @close="handleClose(tag)" >
              {{ `${tag.slice(0, 20)}...` }}
            </a-tag>
          </a-tooltip>
          <a-tag v-else :closable="true" @close="handleClose(tag)" class="tag-style">
            {{ tag }}
          </a-tag>
        </template>
        <a-input
          v-if="inputVisible"
          ref="inputRef"
          type="text"
          size="small"
          :style="{ width: '78px', height: '2.3rem',  }"
          v-model:value="inputValue"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;" class="tag-style">
          <plus-outlined /> 添加新标签
        </a-tag>
      </div>
      <div class="save-article">
        <p @click="modalVisible = true">发布文章</p>
          <a-modal
            style="top: 20px;"
            :bodyStyle="{fontSize: '2.4rem', textAlign: 'center'}"
            v-model:visible="modalVisible"
            title="提示"
            ok-text="确认"
            cancel-text="取消"
            centered
            @ok="uploadArticle"
          >
            <p>是否发布？</p>
          </a-modal>
      </div>
    </div>
    <div ref="editorRef"></div>
    <div class="title-container">
      <input v-model="content.title" type="text" placeholder="无标题文章" class="title-input"/>
    </div>
    <div ref="editorContentRef" style="height: 50rem;"></div>
  </div>
</template>

<script lang="ts">
import WangEditor from 'wangeditor'
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { WangEditorConfig } from '@/config/wangEditor'
import useAddTag from '@/composable/useAddTag'

type WangEditorContentType = {
  title: string;
  html: string;
  text?: string;
}
export default defineComponent({
  name: 'WangEditor',
  components: {
    PlusOutlined
  },
  setup () {
    // 编辑器菜单dom
    const editorRef = ref()
    // 编辑器内容dom
    const editorContentRef = ref()
    //  文章内容
    const content = reactive<WangEditorContentType>({
      title: '',
      html: ''
    })
    // 发布确认对话框
    const modalVisible = ref(false)

    // wangEditor实例
    let instance: WangEditor
    onMounted(() => {
      // 挂载
      instance = new WangEditor(editorRef.value, editorContentRef.value)
      Object.assign(instance.config, WangEditorConfig, {
        onchange () {
          console.log('change')
        }
      })
      instance.create()
    })

    onBeforeUnmount(() => {
      // 取消挂载
      instance.destroy()
    })

    // 发布文章
    const uploadArticle = () => {
      content.html = instance.txt.html() as string
      console.log(content)
      modalVisible.value = false
    }

    const { tags, inputRef, inputVisible, inputValue, handleClose, showInput, handleInputConfirm } = useAddTag()
    return {
      editorRef,
      editorContentRef,
      inputRef,
      content,
      modalVisible,
      tags,
      inputVisible,
      inputValue,
      handleClose,
      showInput,
      handleInputConfirm,
      uploadArticle

    }
  }
})
</script>

<style lang="scss" scoped>
.hd-space-between {
  position: relative;
  padding: 0 20px;
  height: 60px;
  border-bottom: 1px solid #e0e1e5;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  .tag-style {
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .save-article {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.6rem;
    color: white;
    flex: 0 0 100px;
    text-align: center;
    background-color: var(--bear-color-3);
    border-radius: 4px;
    cursor: pointer;
  }
}

.title-container {
  height: 5.6rem;
  border-bottom: 1px solid #dee5e7;
}

.title-input {
  height: 5.6rem;
  outline: none;
  border: none;
  width: 100%;
  background-color: inherit;
  color: rgb(51, 51, 51);
  font-size: 2.4rem;
}
</style>
