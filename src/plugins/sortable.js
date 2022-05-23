import SortableDnd from 'sortable-dnd'

/**
 * sortable
 */
const Sortable = {
  data() {
    return {
      rangeIsChanged: false,
      dragKey: null,
      dragState: {
        from: {
          key: null, // 拖拽起始节点唯一值
          item: null, // 拖拽起始节点数据
          index: null, // 拖拽起始节点索引
        },
        to: {
          key: null, // 拖拽结束节点唯一值
          item: null, // 拖拽结束节点数据
          index: null // 拖拽结束节点索引
        }
      }
    }
  },
  methods: {
    _initSortable() {
      let cloneList = []
      let dragElement = null
      this._destroySortable()
      this.drag = new SortableDnd(
        this.$refs.wrapper,
        {
          disabled: this.disabled,
          draggable: this.draggable,
          dragging: this.dragging,
          ghostClass: this.ghostClass,
          ghostStyle: this.ghostStyle,
          chosenClass: this.chosenClass,
          animation: this.animation,
          onDrag: (dragEl) => {
            dragElement = dragEl
            cloneList = [...this.list]

            this.dragKey = dragEl.getAttribute('data-key')

            this.list.forEach((item, index) => {
              const key = this._getUniqueKey(item)
              if (this.dragKey == key) Object.assign(this.dragState.from, { item, index, key })
            })

            this.rangeIsChanged = false
          },
          onChange: (_old_, _new_) => {
            const oldKey = this.dragState.from.key
            const newKey = _new_.node.getAttribute('data-key')

            this.dragState.to.key = newKey

            const from = { item: null, index: -1 }
            const to = { item: null, index: -1 }

            cloneList.forEach((el, index) => {
              const key = this._getUniqueKey(el)
              if (key == oldKey) Object.assign(from, { item: el, index })
              if (key == newKey) Object.assign(to, { item: el, index })
            })

            cloneList.splice(from.index, 1)
            cloneList.splice(to.index, 0, from.item)
          },
          onDrop: (changed) => {
            const index = cloneList.findIndex(el =>
              this._getUniqueKey(el) == this.dragState.from.key
            )
            const item = this.list[index]

            this.dragState.to = { index, item, key: this._getUniqueKey(item) }

            if (this.rangeIsChanged && dragElement) dragElement.remove()

            const { from, to } = this.dragState
            this.handleDragEnd(cloneList, from, to, changed)

            this.list = [...cloneList]
            this.setUniqueKeys()

            this.rangeIsChanged = false
            dragElement = null
          }
        }
      )
    },
    _destroySortable() {
      this.drag && this.drag.destroy()
      this.drag = null
    }
  }
}

export default Sortable