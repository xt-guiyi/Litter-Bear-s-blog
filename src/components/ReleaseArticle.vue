<template>
  <div>
    <div class="hd-space-between">
      <!-- 图片上传 -->
      <div class="upload-image">
        <upload-image @on-change="getImgObj"></upload-image>
      </div>
      <div class="is-top">
        <label for="isTop">是否置顶</label><input v-model="isTop" type="checkbox" id="isTop">
      </div>
      <!-- 标签列表 -->
      <div class="tag-list">
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
      <!-- 发布文章 -->
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
    <div ref="editorToolbarRef"></div>
    <div class="title-container">
      <input v-model="ArticleTitle" type="text" placeholder="无标题文章" class="title-input"/>
    </div>
    <div ref="editorContentRef" style="height: 50rem;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
// import { app } from '@/main'
import { PlusOutlined } from '@ant-design/icons-vue'
import useAddTag from '@/composable/useAddTag'
import useWangEditor from '@/composable/useWangEditor'
import UploadImage from '@/components/UploadImage.vue'
import { submitArticle, ArticleData } from '@/api/article'
import { releaseArticleConfig } from '@/config/wangEditor'

export default defineComponent({
  name: 'ReleaseArticle',
  components: {
    PlusOutlined,
    UploadImage
  },
  setup () {
    // 编辑器菜单dom
    const editorToolbarRef = ref()
    // 编辑器内容dom
    const editorContentRef = ref()
    // 发布确认对话框
    const modalVisible = ref(false)
    // 文章标题
    const ArticleTitle = ref('')
    // 添加标签
    const { tags, inputRef, inputVisible, inputValue, handleClose, showInput, handleInputConfirm } = useAddTag()
    // 添加编辑器
    const { getWangEditorContent } = useWangEditor(releaseArticleConfig, editorToolbarRef, editorContentRef)
    // 文章是否置顶
    const isTop = ref(false)
    let imgUrl: string

    // 获取图片url
    function getImgObj (data: 'string') {
      imgUrl = data
    }

    // 发布文章
    async function uploadArticle () {
      const content = getWangEditorContent()
      // 消除空格以及空行
      ArticleTitle.value = ArticleTitle.value.replace(/&nbsp;|\s+/g, '')
      const articleData: ArticleData = {
        articleTitle: ArticleTitle.value,
        articleContent: content.html,
        articleText: content.text!,
        tags: tags.value,
        bgImg: imgUrl,
        isTop: isTop.value
      }
      if (articleData.articleTitle && articleData.articleContent && articleData.bgImg) {
        const { data } = await submitArticle(articleData)
        console.log(data)
      } else {
        // app.config.globalProperties.$message.info('内容未填写完整')
        const internalInstance = getCurrentInstance()
        if (internalInstance) internalInstance.appContext.config.globalProperties.$message.info('内容未填写')
      }
      modalVisible.value = false
    }

    return {
      editorToolbarRef,
      editorContentRef,
      inputRef,
      ArticleTitle,
      modalVisible,
      tags,
      inputVisible,
      inputValue,
      handleClose,
      showInput,
      handleInputConfirm,
      uploadArticle,
      getImgObj,
      isTop
    }
  }
})
</script>

<style lang="scss" >
.hd-space-between {
  position: relative;
  padding: 0 20px;
  height: 6rem;
  border-bottom: 1px solid #e0e1e5;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  position: relative;
  .upload-image{
    height: 3rem;
    line-height: 3rem;
    width: auto;
    font-size: 1.6rem;
    // position: absolute;
    // left: 2rem;
  }

  .is-top{
    flex: 2;
    height: 3rem;
    line-height: 3rem;
    font-size: 2rem;
    label {
      margin: 0 1rem 0 1rem;
      cursor: pointer;
    }
    input {
      width: 2rem;
      height: 2rem;
      vertical-align: text-bottom;
      cursor: pointer;
    }
  }
  .tag-list {
    flex: 4;
    margin-right: 1rem;
    display: flex;
    justify-content: flex-end;
    .tag-style {
    height: 2.5rem;
    line-height: 2.5rem;
  }
  }
  .save-article {
    height: 3rem;
    line-height: 3rem;
    flex: 1;
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
