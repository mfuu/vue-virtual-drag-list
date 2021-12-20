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
    },
    getTarget(e) {
      const parent = this.$parent
      let dataKey = e.target.getAttribute('data-key')
      // 向上查询，找到dataKey属性
      if (!dataKey)
        for(let node = e.target; (node = node.parentNode); ) {
          if (node) {
            dataKey = node.getAttribute('data-key')
            if (node == document.documentElement || dataKey) break
          } else {
            break
          }
        }
      const target = parent.list.find(item => parent.uniqueId(item) == dataKey)
      return target
    },
    dragstart(e) {
      this.$parent.dragState.from = this.getTarget(e)
    },
    dragenter(e) {
      this.$parent.dragState.to = this.getTarget(e)
    },
    dragover(e) {
      e.preventDefault()
    },
    dragend(e) {
      const parent = this.$parent
      const { from, to } = parent.dragState
      // 拖拽前后不一致，重新赋值
      if (from != to) {
        const dIndex = parent.list.indexOf(from)
        const tIndex = parent.list.indexOf(to)
        let newArr = [...parent.list]
        newArr.splice(dIndex, 1)
        newArr.splice(tIndex, 0, from)
        parent.list = [...newArr]
      }
      parent.dragState = { from: null, to: null }
      parent.$emit('ondragend', parent.list, e)
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
      props: { source, index, uniqueKey },
      on: {
        dragstart: this.dragstart,
        dragenter: this.dragenter,
        dragover: this.dragover,
        dragend: this.dragend
      }
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