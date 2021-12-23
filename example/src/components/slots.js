import Vue from 'vue'

const mixin = {
  data() {
    return {
      observer: null,
      mask: null
    }
  },
  mounted () {
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(() => {
        this.onSizeChange()
      })
      this.observer.observe(this.$el)
    }
  },
  updated () {
    this.onSizeChange()
  },
  beforeDestroy () {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  },
  methods: {
    onSizeChange() {
      this.$emit('resize', this.uniqueKey, this.getCurrentSize())
    },
    getCurrentSize () {
      return this.$el ? this.$el.offsetHeight : 0
    },
    mousedown(e) {
      // 仅设置了draggable=true的元素才可拖动
      const draggable = e.target.getAttribute('draggable')
      if (!draggable) return
      // 记录初始拖拽元素
      const { target, item } = this.getTarget(e)
      this.$parent.dragState.oldNode = target
      this.$parent.dragState.oldItem = item
      this.setMask('init', e.clientX, e.clientY)
      document.onmousemove = (evt) => {
        evt.preventDefault()
        this.setMask('move', evt.clientX, evt.clientY)
        const { target = null, item = null } = this.getTarget(evt)
        // 如果没找到目标节点，取消拖拽事件
        if (!target || !item) {
          document.body.style.cursor = 'not-allowed'
          return
        }
        document.body.style.cursor = 'grabbing'
        // 记录拖拽目标元素
        this.$parent.dragState.newNode = target
        this.$parent.dragState.newIitem = item
        const { oldNode, newNode, oldItem, newIitem } = this.$parent.dragState
        // 拖拽前后不一致，改变拖拽节点位置
        if (oldItem != newIitem) {
          if (newNode && newNode.animated) return
          const oldIndex = this.dataSource.indexOf(oldItem)
          const newIndex = this.dataSource.indexOf(newIitem)
          const oldRect = oldNode.getBoundingClientRect()
          const newRect = newNode.getBoundingClientRect()
          this.$parent.dragState.oldIndex = oldIndex
          this.$parent.dragState.newIndex = newIndex
          if (oldIndex < newIndex) {
            newNode.parentNode.insertBefore(oldNode, newNode.nextSibling)
          } else {
            newNode.parentNode.insertBefore(oldNode, newNode)
          }
          this.animate(oldRect, oldNode)
          this.animate(newRect, newNode)
        }
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        this.setMask('destory')
        // 当前拖拽位置不在允许的范围内时不需要对数组重新赋值
        if (document.body.style.cursor != 'not-allowed') {
          const { oldItem, oldIndex, newIndex } = this.$parent.dragState
          // 拖拽前后不一致，数组重新赋值
          if (oldIndex != newIndex) {
            let newArr = [...this.dataSource]
            newArr.splice(oldIndex, 1)
            newArr.splice(newIndex, 0, oldItem)
            this.$parent.list = newArr
            this.$parent.$emit('ondragend', newArr)
          }
        }
        document.body.style.cursor = 'auto'
      }
    },
    setMask(type, left, top) {
      if (type == 'init') {
        this.mask = document.createElement('div')
        for(let key in this.dragStyle) {
          this.setStyle(this.mask, key, this.dragStyle[key])
        }
        this.mask.style.position = 'absolute'
        this.mask.style.left = left + 'px'
        this.mask.style.top = top + 'px'
        this.mask.innerHTML = this.$el.innerHTML
        document.body.appendChild(this.mask)
      } else if (type == 'move') {
        this.mask.style.left = left + 'px'
        this.mask.style.top = top + 'px'
      } else {
        document.body.removeChild(this.mask)
      }
    },
    // 找到目标dom在数组中的位置
    getTarget(e) {
      let dataKey = e.target.getAttribute('data-key')
      let target = e.target
      if (!dataKey) {
        // 如果当前拖拽超出了item范围，则不允许拖拽，否则向上查找dataKey属性
        if (target.contains(this.$el)) return {}
        for(let node = e.target; (node = node.parentNode); ) {
          if (node) {
            target = node
            dataKey = node.getAttribute('data-key')
            if (node == document.documentElement || dataKey) break
          } else {
            break
          }
        }
      }
      const item = this.dataSource.find(item => this.$parent.uniqueId(item) == dataKey)
      return { target, item }
    },
    // 设置动画
    animate(rect, target) {
      const delay = 300
      if (delay) {
        var cRect = target.getBoundingClientRect()
        if (rect.nodeType === 1) rect = rect.getBoundingClientRect()
        this.setStyle(target, 'transition', 'none')
        this.setStyle(target, 'transform', `translate3d(${rect.left - cRect.left}px, ${rect.top - cRect.top}px, 0)`)
        target.offsetWidth // 触发重绘
        this.setStyle(target, 'transition', `all ${delay}ms`)
        this.setStyle(target, 'transform', 'translate3d(0, 0, 0)')
        clearTimeout(target.animated)
        target.animated = setTimeout(() => {
          this.setStyle(target, 'transition', '')
          this.setStyle(target, 'transform', '')
          target.animated = false
        }, delay)
      }
    },
    // 为dom添加样式
    setStyle(el, prop, val) {
      let style = el && el.style
      if (style) {
        if (val === void 0) {
          if (document.defaultView && document.defaultView.getComputedStyle) {
            val = document.defaultView.getComputedStyle(el, '')
          } else if (el.currentStyle) {
            val = el.currentStyle
          }
          return prop === void 0 ? val : val[prop]
        } else {
          if (!(prop in style)) prop = '-webkit-' + prop
          style[prop] = val + (typeof val === 'string' ? '' : 'px')
        }
      }
    }
  }
}

export const Items = Vue.component('virtual-draglist-items', {
  mixins: [mixin],
  props: {
    tag: {},
    index: {},
    source: {},
    dragStyle: {},
    uniqueKey: {},
    itemStyle: {},
    itemClass: {},
    dataSource: {}
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
        mousedown: this.mousedown
      }
    }, [this.$scopedSlots.item({ source, index, uniqueKey })])
  }
})

export const Slots =  Vue.component('virtual-draglist-slots', {
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