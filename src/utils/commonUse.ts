/**
 * 节流函数
 * @param func 回调函数
 * @param wait 多少毫秒触发一次
 * @param mustRun 最少多少毫秒就必须触发一次
 */
export const throttle = function (func: Function, wait: number, mustRun: number) {
  let timeout: number | undefined
  let startTime = Date.now()
  return function (this: void) {
    const endTime = Date.now()
    clearTimeout(timeout)
    if (endTime - startTime > mustRun) {
      // eslint-disable-next-line prefer-rest-params
      func.apply(this, arguments)
      startTime = Date.now()
    }
    timeout = setTimeout(() => {
      // eslint-disable-next-line prefer-rest-params
      func.apply(this, arguments)
    }, wait)
  }
}

export function transformTimes (time: string) {
  const dateTime = new Date(time) // 将传进来的字符串或者毫秒转为标准时间
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  // var second = dateTime.getSeconds()
  const beforeTime = dateTime.getTime() // 将传进来的时间转换为毫秒
  const now = new Date() // 获取本机当前的时间
  const currentTime = now.getTime() // 将本机的时间转换为毫秒
  // const milliseconds = 0
  let timeSpanStr
  const timeDate = currentTime - beforeTime

  if (timeDate <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
    timeSpanStr = '刚刚'
  } else if (1000 * 60 * 1 < timeDate && timeDate <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
    timeSpanStr = Math.round((timeDate / (1000 * 60))) + '分钟前'
  } else if (1000 * 60 * 60 * 1 < timeDate && timeDate <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
    timeSpanStr = Math.round(timeDate / (1000 * 60 * 60)) + '小时前'
  } else if (1000 * 60 * 60 * 24 < timeDate && timeDate <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
    timeSpanStr = Math.round(timeDate / (1000 * 60 * 60 * 24)) + '天前'
  } else if (timeDate > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
  }
  return timeSpanStr
}
