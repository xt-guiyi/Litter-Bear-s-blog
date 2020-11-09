// 节流
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
