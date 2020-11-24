<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-14 09:41:45
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-14 19:05:15
-->
<template>
  <div class="upload-container">
    <div class="upload-content">
      <label for="fileObj">
        <plus-outlined></plus-outlined>
        上传文件
      </label>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/gif" id="fileObj"
        @change="imageChange"
      >
    </div>
    <div class="image-info">
      <div class="text" @click="showMask">{{ imageName }}</div>
      <teleport  to="body">
        <div  class="preview-mask" v-show="isPreview">
          <div class="preview-center animated" :class="[isPreviewAnimated? 'flipInX ': 'flipOutX']">
            <img  ref="imgPreviewRef"  class="preview-image" alt="好看的图片">
            <svg class="icon x-position" aria-hidden="true" @click="cancelMask">
                <use xlink:href="#icon-cuowu"></use>
            </svg>
          </div>
        </div>
      </teleport>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { app } from '@/main'
import { getArticleList } from '@/api/common/uploadImg'
export default defineComponent({
  name: 'UploadImage',
  components: {
    PlusOutlined
  },
  emits: {
    'on-change': null
  },
  props: {
    // 排列方向
    direction: {
      type: String,
      default: 'row',
      validator: (value: string) => {
        return ['row', 'row-reverse', 'column-reverse', 'column'].includes(value)
      }
    }
  },
  setup (props, context) {
    const imageName = ref('未选择任何图片')
    const imgPreviewRef = ref<HTMLImageElement>()
    const isPreview = ref(false)
    const isPreviewAnimated = ref(false)

    function imageChange (e: Event) {
      if (e.target !== null) {
        const InputHtml = e.target
        // 获取图片
        const file = (InputHtml as HTMLInputElement).files![0]
        if (file.size >= 5000000) return app.config.globalProperties.$message.info('图片应小于5M')
        // 显示名字在页面上
        imageName.value = file.name
        // 读图片
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', async () => {
          // 转FormData
          const formData = new FormData()
          formData.append('ArticleBgImage', file, '')
          // 上传
          const { data } = await getArticleList(formData)
          // 赋值到预览图片
          imgPreviewRef.value!.src = data.url
          // 触发事件
          context.emit('on-change', data.url)
        })
      }
    }

    function showMask () {
      if (imgPreviewRef.value!.src) {
        console.log(imgPreviewRef.value!.src)
        isPreview.value = true
        isPreviewAnimated.value = true
      } else {
        app.config.globalProperties.$message.info('请选择图片')
      }
    }

    function cancelMask () {
      setTimeout(() => {
        isPreview.value = false
      }, 1000)
      isPreviewAnimated.value = false
    }
    return {
      imageName,
      imageChange,
      imgPreviewRef,
      isPreview,
      isPreviewAnimated,
      showMask,
      cancelMask
    }
  }
})
</script>

<style lang="scss" scoped vars="{ direction }">
.upload-container {
  display: flex;
  flex-direction: var(--direction);
  .upload-content {
    label {
      width: 10rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      display: block;
      background-color: rgb(200, 200, 200);
      cursor: pointer;
    }
    input[type="file"] {
      display: none;
    }
  }

  .image-info {
    margin-left: 1rem;
    font-size: 1.4rem;
    .text {
      cursor: pointer;
    }
  }

}

.preview-mask {
  // display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  .preview-center {
    width: 65rem;
    height: 30rem;
    position: absolute;
    left: calc( 50% - 32.5rem );
    top: calc( 50% - 15rem );
    background-color: white;
    .preview-image {
      width: inherit;
      height: inherit;
    // position: absolute;
    // left: calc( 50% - 32.5rem );
    // top: calc( 50% - 15rem );
    }

    .x-position {
      font-size: 2.5rem;
      cursor: pointer;
      position: absolute;
      left: calc( 50%  + 32.5rem );
      top: calc( 50% - 2.5rem - 15rem );
    }
  }
}
</style>
