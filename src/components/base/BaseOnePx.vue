<script lang=ts>
import { defineComponent, h } from 'vue'
export default defineComponent({
  name: 'BaseOnePx',
  setup () {
    return () => h('div', { class: 'one-line' })
  }
})
</script>
