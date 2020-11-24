import { createApp } from 'vue'

export default function cleanSpace (app: ReturnType<typeof createApp>) {
  app.directive('domPosition', {
    mounted (el, binding) {
      console.log(el)
      console.log(binding)
    }
  })
}
