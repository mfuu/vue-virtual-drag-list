import SortableDnd from 'sortable-dnd'
import { DragState } from './states'

function Sortable(options, onDrag, onDrop) {
  this.options = options
  this.onDrag = onDrag
  this.onDrop = onDrop

  this.list = options.list
  this.getDataKey = options.getDataKey

  this.drag = null
  this.dragElement = null
  this.dragState = new DragState
  this.rangeIsChanged = false

  this.init()
}

Sortable.prototype = {
  constructor: Sortable,

  init() {
    const {
      disabled,
      dragging,
      draggable,
      ghostClass,
      ghostStyle,
      chosenClass,
      animation
    } = this.options

    let cloneList = new Array()
    this.drag = new SortableDnd(
      this.options.scrollEl,
      {
        disabled,
        dragging,
        draggable,
        ghostClass,
        ghostStyle,
        chosenClass,
        animation,
        
        onDrag: (dragEl) => {
          this.dragElement = dragEl
          cloneList = [...this.list]

          const key = dragEl.getAttribute('data-key')
          const index = this.list.findIndex(el => this.getDataKey(el) == key)
          const item = this.list[index]
          Object.assign(this.dragState.from, { item, index, key })

          this.rangeIsChanged = false

          // drag
          this.onDrag(this.dragState.from)
        },
        onChange: (_old_, _new_) => {
          const oldKey = this.dragState.from.key
          const newKey = _new_.node.getAttribute('data-key')

          const from = { item: null, index: -1 }
          const to = { item: null, index: -1 }

          cloneList.forEach((el, index) => {
            const key = this.getDataKey(el)
            if (key == oldKey) Object.assign(from, { item: el, index })
            if (key == newKey) Object.assign(to, { item: el, index })
          })

          cloneList.splice(from.index, 1)
          cloneList.splice(to.index, 0, from.item)
        },
        onDrop: (changed) => {
          if (this.rangeIsChanged && this.dragElement) this.dragElement.remove()

          const { from } = this.dragState
          const index = cloneList.findIndex(el => this.getDataKey(el) == from.key)
          const item = this.list[index]
          this.dragState.to = { index, item, key: this.getDataKey(item) }

          // drop 
          this.onDrop(cloneList, from, this.dragState.to, changed)

          this.list = [...cloneList]
          this.clear()
        }
      }
    )
  },

  clear() {
    this.dragElement = null
    this.rangeIsChanged = false
    this.dragState = new DragState
  },

  destroy() {
    this.drag && this.drag.destroy()
    this.drag = null
  }
}

export default Sortable