import { onMounted, Ref } from 'vue'
import { boxPosition, addClass, removeClass } from '@/utils/dom'

/**
 * 隐藏屏幕外的dom节点
 * @param domRef domRef
 */
export default function useDomHide (domRef: Ref<Element | null>) {
  onMounted(() => {
    // 这600ms用来等待动画完成,然后执行代码
    setTimeout(() => {
      if (domRef.value !== null) {
        // 不在可视区域内则隐藏
        if (
          boxPosition(domRef.value).y >= window.innerHeight ||
            boxPosition(domRef.value).bottom <= 0
        ) {
          addClass(domRef.value, 'hide')
          removeClass(domRef.value, 'animated', 'bounceInUp')
        }
      }
    }, 600)
  })
}
