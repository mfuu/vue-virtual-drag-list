import { h, defineComponent } from 'vue'
import { Observer } from './hooks'
import { SlotsProps } from './props'

export const Items = defineComponent({
  name: 'virtual-draglist-items',
  props: SlotsProps,
  render() {
    const { tag, dataKey } = this
    return h(Observer, { props: SlotsProps },
      [
        h(tag, {
          key: dataKey,
          attrs: { 'data-key': dataKey },
        }, this.$slots.default)
      ]
    )
  }
})

export const Slots = defineComponent({
  name: 'virtual-draglist-slots',
  props: SlotsProps,
  render() {
    const { tag, dataKey } = this
    return h(Observer, { props: SlotsProps },
      [
        h(tag, {
          key: dataKey,
          attrs: { role: dataKey }
        }, this.$slots.default)
      ]
    )
  }
})
