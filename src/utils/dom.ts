/*
 *封装添加和删除动画
 */
export const animateCSS = (element: Element, animationName: string) => {
  // console.log(node)
  element.classList.add('animated', animationName)
  // 动画结束后删除动画类
  function handleAnimationEnd () {
    element.classList.remove('animated', animationName)
    console.log(333)
    element.removeEventListener('animationend', handleAnimationEnd)
  }

  element.addEventListener('animationend', handleAnimationEnd)
}

/**
 * 添加class
 * @param el dom节点
 * @param className 类名数组
 */
export const addClass = (el: Element, ...className: string[]) => {
  el.classList.add(...className)
}

/**
 * 移除class
 * @param el dom节点
 * @param className 类名数组
 */
export const removeClass = (el: Element, ...className: string[]) => {
  el.classList.remove(...className)
}

/**
 * 获取dom节点在屏幕位置
 * @param el dom节点
 */
export const boxPosition = (el: Element): DOMRect => {
  return el.getBoundingClientRect()
}

/**
 * 设置dom属性
 * @param el dom节点
 * @param attrName 属性名
 * @param attrValue 属性值
 */
export const setAttribute = (el: Element, attrName: string, attrValue: string) => {
  el.setAttribute(attrName, attrValue)
}

/**
 * 在当前节点后面插入一个节点
 * @param currentEl 当前节点
 * @param insertEl 插入节点
 */
export const insertNode = (currentEl: Element, insertEl: Element): void => {
  currentEl.after(insertEl)
}
