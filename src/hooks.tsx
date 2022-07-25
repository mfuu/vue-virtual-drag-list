import { defineComponent, onMounted, onUpdated, onBeforeUnmount, ref, h, inject } from 'vue'
import { SlotsProps } from './props'

export const Observer = defineComponent({
  props: SlotsProps,
  emits: ['onSizeChange'],
  setup(props, { emit, slots }) {
    const virtualList = inject('virtualList');

    const vm = ref<HTMLElement>(null);
    let observer: ResizeObserver;

    const getCurrentSize = () => {
      const sizeKey = props.isHorizontal ? 'offsetWidth' : 'offsetHeight'
      return this.$el ? this.$el[sizeKey] : 0
    }
    const onSizeChange = () => {
      virtualList[props.event](props.dataKey, getCurrentSize())
    }

    onMounted(() => {
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(() => {
          onSizeChange()
        })
        this.$el && observer.observe(this.$el)
      }
    })

    onUpdated(() => { onSizeChange() })

    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
    })
  }
})