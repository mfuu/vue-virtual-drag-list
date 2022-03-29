import Vue from 'vue'
import { observer, draggable } from './mixins'
import { SlotItemProps } from './props'

export const Items = Vue.component('virtual-draglist-items', {
  mixins: [observer, draggable],
  props: SlotItemProps,
  render (h) {
    const { tag, uniqueKey } = this
    return h(tag, {
      key: uniqueKey,
      attrs: {
        'data-key': uniqueKey
      },
      on: {
        mousedown: (e) => this.mousedown(e, this)
      }
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
