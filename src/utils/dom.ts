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
