import SortableDnd from 'sortable-dnd'

class State {
  constructor() {
    this.key = null
    this.item = null
    this.index = null
  }
}

/**
 * sortable
 */
const Sortable = {
  data() {
    return {
      rangeIsChanged: false,
      dragState: {
        from: new State,
        to: new State
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

            const key = dragEl.getAttribute('data-key')
            const index = this.list.findIndex(el => this._getDataKey(el) == key)
            const item = this.list[index]
            Object.assign(this.dragState.from, { item, index, key })

            this.rangeIsChanged = false
          },
          onChange: (_old_, _new_) => {
            const oldKey = this.dragState.from.key
            const newKey = _new_.node.getAttribute('data-key')

            const from = { item: null, index: -1 }
            const to = { item: null, index: -1 }

            cloneList.forEach((el, index) => {
              const key = this._getDataKey(el)
              if (key == oldKey) Object.assign(from, { item: el, index })
              if (key == newKey) Object.assign(to, { item: el, index })
            })

            cloneList.splice(from.index, 1)
            cloneList.splice(to.index, 0, from.item)
          },
          onDrop: (changed) => {
            if (this.rangeIsChanged && dragElement) dragElement.remove()

            const index = cloneList.findIndex(el => 
              this._getDataKey(el) == this.dragState.from.key  
            )
            const item = this.list[index]
            this.dragState.to = { index, item, key: this._getDataKey(item) }

            const { from, to } = this.dragState
            this.handleDragEnd(cloneList, from, to, changed)

            if (changed) {
              this.list = [...cloneList]
              this._setUniqueKeys()
              this.virtual.updateUniqueKeys(this.uniqueKeys)
            }

            this.rangeIsChanged = false
            this.dragState.from = new State
            this.dragState.to = new State
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