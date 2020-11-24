import { ref } from 'vue'

function getBase64 (file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * 文件上传
 */
export default function useUploadFile () {
  const previewVisible = ref(false) // 是否显示预览图片
  const previewImage = ref('') // 预览图片
  const fileList = ref([]) // 文件列表

  function handleCancel () {
    previewVisible.value = false
  }

  async function handlePreview (file: any) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    previewImage.value = file.url || file.preview
    previewVisible.value = true
  }

  function handleChange ({ fileList: fileLi }: Record<any, any>) {
    fileList.value = fileLi
  }

  return {
    previewVisible,
    previewImage,
    fileList,
    handleCancel,
    handlePreview,
    handleChange
  }
}
