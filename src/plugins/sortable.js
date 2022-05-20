import SortableDnd from 'sortable-dnd'

/**
 * sortable
 */
const Sortable = {
  data() {
    return {
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
      let tempList = []
      let dragIndex = -1
      let dragElement = null
      let flag = false
      this._destroySortable()
      this.drag = new SortableDnd(
        this.$refs.wrapper,
        {
          disabled: this.disabled,
          ghostStyle: this.dragStyle,
          draggable: this.draggable,
          dragging: this.dragging,
          chosenClass: this.chosenClass,
          animation: this.animation,
          onDrag: (dragEl) => {
            dragElement = dragEl
            tempList = [...this.list]

            const key = dragEl.getAttribute('data-key')
            dragIndex = this.list.findIndex(el => this._getUniqueKey(el) === key)

            this.dragState.from.index = dragIndex
            this.dragState.from.key = key
          },
          onChange: (_old_, _new_) => {
            if (!flag) {
              flag = true
              this.list.splice(dragIndex, 1)
            }
            const oldKey = this.dragState.from.key
            const newKey = _new_.node.getAttribute('data-key')

            this.dragState.to.key = newKey

            tempList.forEach((el, index) => {
              const key = this._getUniqueKey(el)
              if (key === oldKey) Object.assign(this.dragState.from, { item: el, index })
              if (key === newKey) Object.assign(this.dragState.to, { item: el, index })
            })

            const { from, to } = this.dragState
            tempList.splice(from.index, 1)
            tempList.splice(to.index, 0, from.item)
          },
          onDrop: (changed) => {
            this.dragState.to.index = tempList.findIndex(el =>
              this._getUniqueKey(el) === this.dragState.from.key
            )

            const { from, to } = this.dragState
            if (flag && dragElement) dragElement.remove()

            this.handleDragEnd(tempList, from, to, changed)

            this.list = tempList
            this.uniqueKeys = this.list.map(item => this._getUniqueKey(item))

            dragElement = null
            flag = false
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