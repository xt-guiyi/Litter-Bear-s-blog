import { onBeforeUnmount, Ref } from 'vue'
import { throttle } from '@/utils/commonUse'
import { addClass, boxPosition } from '@/utils/dom'

/**
 * 监听Window滚动事件，并添加动画
 */
export default function useScrollEvent (domRef: Ref<Element | null>) {
  let handleScroll = function () {
    if (domRef.value !== null) {
      // 获取当前节点下的子节点
      const domRefChildren = domRef.value.children
      if (domRefChildren !== undefined) {
        for (let i = 0; i < domRefChildren.length; i++) {
          // 如果当前元素不在可视区域上
          if (
            boxPosition(domRefChildren[i]).y < (window.innerHeight) * 0.95 &&
            boxPosition(domRefChildren[i]).y > 0
          ) {
            addClass(domRefChildren[i], 'show', 'animated', 'bounceInUp')
          }
        }
      }
    }
  }
  // 节流
  handleScroll = throttle(handleScroll, 400, 200)
  // 添加
  window.addEventListener('scroll', handleScroll)
  // 移除
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}
