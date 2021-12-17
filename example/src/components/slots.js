import Vue from 'vue'

const mixin = {
  data() {
    return {
      resizeObserver: null
    }
  },
  mounted () {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.dispatchSizeChange()
      })
      this.resizeObserver.observe(this.$el)
    }
  },
  updated () {
    this.dispatchSizeChange()
  },
  beforeDestroy () {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  },
  methods: {
    dispatchSizeChange() {
      this.$emit('resize', this.uniqueKey, this.getCurrentSize())
    },
    getCurrentSize () {
      return this.$el ? this.$el.offsetHeight : 0
    }
  }
}

export const Items = Vue.component('virtual-draglist-items', {
  mixins: [mixin],
  props: {
    tag: {},
    index: {},
    source: {},
    uniqueKey: {},
    itemStyle: {},
    itemClass: {}
  },
  render (h) {
    const { tag, itemStyle, itemClass, source, index, uniqueKey } = this
    return h(tag, {
      key: uniqueKey,
      style: itemStyle,
      class: itemClass,
      attrs: {
        ['data-key']: uniqueKey
      },
      props: { source, index, uniqueKey }
    }, [this.$scopedSlots.item({ source, index, uniqueKey })])
  }
})

export const Slots =  Vue.component('virtual-draglist-Slots', {
  mixins: [mixin],
  props: {
    tag: {},
    slots: {},
    uniqueKey: {}
  },
  render (h) {
    const { tag, uniqueKey } = this
    return h(tag, {
      key: uniqueKey,
      attrs: {
        role: uniqueKey
      }
    }, this.slots)
  }
})