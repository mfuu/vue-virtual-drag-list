import utils from './utils'

export const observer = {
  inject: ['virtual'],
  data () {
    return {
      observer: null
    }
  },
  mounted () {
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(() => {
        this.onSizeChange()
      })
      this.$el && this.observer.observe(this.$el)
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
    onSizeChange () {
      this.virtual[this.event](this.uniqueKey, this.getCurrentSize())
    },
    getCurrentSize () {
      return this.$el ? this.$el.offsetHeight : 0
    }
  }
}

export const draggable = {
  data () {
    return {
      mask: null,
      switched: false
    }
  },
  methods: {
    mousedown (e, vm) {
      // 每次拖拽将状态重置
      this.switched = false
      // 仅设置了draggable=true的元素才可拖动
      const draggable = e.target.getAttribute('draggable')
      if (!draggable) return
      // 记录初始拖拽元素
      const { target, item } = utils.getSwitchTarget(e, vm, this.virtual)
      this.virtual.setDragState({ oldNode: target, oldItem: item })
      this.setMask('init', e.clientX, e.clientY)
      document.onmousemove = (evt) => {
        evt.preventDefault()
        this.setMask('move', evt.clientX, evt.clientY)
        const { target = null, item = null } = utils.getSwitchTarget(evt, null, this.virtual)
        // 如果没找到目标节点，取消拖拽事件
        if (!target || !item) {
          document.body.style.cursor = 'not-allowed'
          return
        }
        document.body.style.cursor = 'grabbing'
        // 记录拖拽目标元素
        this.virtual.setDragState({ newNode: target, newItem: item })
        const { oldNode, newNode, oldItem, newItem } = this.virtual.dragState
        // 拖拽前后不一致，改变拖拽节点位置
        if (oldItem != newItem) {
          if (newNode && newNode.animated) return
          this.switched = true
          const oldIndex = this.virtual.list.indexOf(oldItem)
          const newIndex = this.virtual.list.indexOf(newItem)
          const oldRect = oldNode.getBoundingClientRect()
          const newRect = newNode.getBoundingClientRect()
          // 记录前后位置
          this.virtual.setDragState({ oldIndex, newIndex })
          if (oldIndex < newIndex) {
            newNode.parentNode.insertBefore(oldNode, newNode.nextSibling)
          } else {
            newNode.parentNode.insertBefore(oldNode, newNode)
          }
          utils.setAnimate(oldRect, oldNode)
          utils.setAnimate(newRect, newNode)
        }
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        this.setMask('destory')
        // 当前拖拽位置不在允许的范围内时不需要对数组重新赋值
        if (this.switched) {
          const { oldItem, oldIndex, newIndex } = this.virtual.dragState
          // 拖拽前后不一致，数组重新赋值
          if (oldIndex != newIndex) {
            const newArr = [...this.virtual.list]
            newArr.splice(oldIndex, 1)
            newArr.splice(newIndex, 0, oldItem)
            this.virtual.setList(newArr)
            this.virtual.handleDragEnd(newArr)
          }
          this.switched = false
        }
        document.body.style.cursor = ''
      }
    },
    setMask (type, left, top) {
      if (type == 'init') {
        this.mask = document.createElement('div')
        for (const key in this.dragStyle) {
          utils.setStyle(this.mask, key, this.dragStyle[key])
        }
        this.mask.style.position = 'fixed'
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
    }
  }
}