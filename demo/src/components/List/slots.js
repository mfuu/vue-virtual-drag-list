import Vue from 'vue'
import { observer, draggable } from './mixins'

export const Items = Vue.component('virtual-draglist-items', {
  mixins: [observer, draggable],
  props: ['tag', 'event', 'dragStyle', 'uniqueKey'],
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
  mixins: [observer, draggable],
  props: ['tag', 'event', 'uniqueKey'],
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
