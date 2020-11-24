/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-18 13:54:37
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-18 14:29:31
 */
import WangEditor from 'wangeditor'
import { onBeforeUnmount, onMounted, reactive, Ref } from 'vue'
import xss from 'xss'

type WangEditorContentType = {
  html: string;
  text: string;
}

/**
 *使用编辑器
 * @param editorToolbarRef 只有这一个参数时则是编辑器domRef,有两个参数则是编辑器菜单domRef
 * @param editorContentRef 编辑器内容domRef
 */
export default function useWangEditor (config: Record<string, any>, editorToolbarRef: Ref<string>, editorContentRef?: Ref<string>) {
  //  文章内容
  const content = reactive<WangEditorContentType>({
    html: '',
    text: ''
  })

  let instance: WangEditor
  onMounted(() => {
    // 挂载
    instance = new WangEditor(editorToolbarRef.value, editorContentRef?.value)
    Object.assign(instance.config, config, {
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

  function getWangEditorContent () {
    content.html = instance.txt.html() as string
    content.text = instance.txt.text() as string
    // xss过滤，虽然是个人博客，但万一自己手贱写了呢
    content.html = xss(content.html)
    // 去除空格
    content.text = content.text.replace(/&nbsp;|\s+/g, '')
    console.log(content.text)
    return content
  }

  return {
    // editorRef,
    // editorContentRef,
    content,
    getWangEditorContent
  }
}
