import Vue from 'vue'
import { observer } from './observer'
import { SlotItemProps } from './props'

export const Items = Vue.component('virtual-draglist-items', {
  mixins: [observer],
  props: SlotItemProps,
  render (h) {
    const { tag, uniqueKey } = this
    return h(tag, {
      key: uniqueKey,
      attrs: {
        'data-key': uniqueKey
      },
    }, this.$slots.default)
  }
})

export const Slots = Vue.component('virtual-draglist-slots', {
  mixins: [observer],
  props: SlotItemProps,
  render (h) {
    const { tag, uniqueKey } = this
    return h(tag, {
      key: uniqueKey,
      attrs: {
        role: uniqueKey
      }
    }, this.$slots.default)
  }
})
