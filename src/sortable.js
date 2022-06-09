import SortableDnd from 'sortable-dnd'
import { DragState } from './interface'

function Sortable(options, onDrag, onDrop) {
  this.options = options
  this.onDrag = onDrag
  this.onDrop = onDrop

  this.list = options.list
  this.cloneList = new Array()

  this.drag = null
  this.dragElement = null
  this.rangeIsChanged = false
  this.dragState = new DragState

  this.init()
}

Sortable.prototype = {
  constructor: Sortable,

  set(key, value) {
    if (key === 'list') {
      this.list = value
      // When the list data changes when dragging, need to execute onDrag function
      if (this.dragElement) this.dragStart(this.dragElement)
    } else {
      this.options[key] = value
      this.drag.set(key, value)
    }
    
  },

  init() {
    const {
      disabled,
      dragging,
      draggable,
      ghostClass,
      ghostStyle,
      chosenClass,
      animation,
      autoScroll,
      scrollStep,
      scrollThreshold,
      getDataKey
    } = this.options

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
        autoScroll,
        scrollStep,
        scrollThreshold,
        
        onDrag: (dragEl) => this.dragStart(dragEl),
        onChange: (_old_, _new_) => {
          const oldKey = this.dragState.from.key
          const newKey = _new_.node.getAttribute('data-key')

          const from = { item: null, index: -1 }
          const to = { item: null, index: -1 }

          this.cloneList.forEach((el, index) => {
            const key = getDataKey(el)
            if (key == oldKey) Object.assign(from, { item: el, index })
            if (key == newKey) Object.assign(to, { item: el, index })
          })

          this.cloneList.splice(from.index, 1)
          this.cloneList.splice(to.index, 0, from.item)
        },
        onDrop: (changed) => {
          if (this.rangeIsChanged && this.dragElement) this.dragElement.remove()

          const { from } = this.dragState
          this.cloneList.forEach((el, index) => {
            if (getDataKey(el) == from.key)
              this.dragState.to = {
                index,
                item: this.list[index],
                key: getDataKey(el)
              }
          })

          // drop 
          this.onDrop(this.cloneList, from, this.dragState.to, changed)

          this.list = [...this.cloneList]
          this.clear()
        }
      }
    )
  },

  dragStart(dragEl) {
    this.dragElement = dragEl
    this.cloneList = [...this.list]

    const key = dragEl.getAttribute('data-key')

    this.list.forEach((item, index) => {
      if (this.options.getDataKey(item) == key)
        Object.assign(this.dragState.from, { item, index, key })
    })

    this.rangeIsChanged = false

    // drag
    this.onDrag(this.dragState.from, dragEl)
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