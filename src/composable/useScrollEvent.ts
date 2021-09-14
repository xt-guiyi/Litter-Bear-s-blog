/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-12 14:24:04
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-07-16 19:44:42
 */
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
      // const observer = new IntersectionObserver((entries) => {
      //   entries.forEach((entry) => {
      //     // console.log(entry)
      //     if (entry.isIntersecting && entry.target.className === 'pagination-container hide') {
      //       requestAnimationFrame(() => addClass(entry.target, 'show', 'animated', 'swing'))
      //     } else if (entry.isIntersecting && entry.target.className === 'panel-container hide') {
      //       // requestAnimationFrame(() => addClass(entry.target, 'show', 'animated', 'bounceInUp'))
      //       requestAnimationFrame(() => addClass(entry.target, 'show'))
      //     }
      //   })
      // })
      // Array.from(domRefChildren).forEach(item => {
      //   observer.observe(item)
      // })
        for (let i = 0; i < domRefChildren.length; i++) {
        // console.log(domRefChildren[i].className)
        // 如果当前元素不在可视区域上
          if (
            boxPosition(domRefChildren[i]).y < (window.innerHeight) * 0.95 &&
          boxPosition(domRefChildren[i]).y > 0
          ) {
            if (domRefChildren[i].className === 'pagination-container hide') {
              requestAnimationFrame(() => addClass(domRefChildren[i], 'show', 'animated', 'swing'))
            } else if (domRefChildren[i].className === 'panel-container hide') {
              requestAnimationFrame(() => addClass(domRefChildren[i], 'show', 'animated', 'fadeIn'))
            }
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
