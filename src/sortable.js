import SortableDnd from 'sortable-dnd';
import { DragState } from './interface';

let dragState = new DragState();
let dragEl = null;

function Sortable(options, onDrag, onDrop) {
  this.options = options;
  this.onDrag = onDrag;
  this.onDrop = onDrop;

  this.list = options.list;
  this.cloneList = [...this.list];

  this.drag = null;
  this.rangeIsChanged = false;

  this.init();
}

Sortable.prototype = {
  constructor: Sortable,

  set(key, value) {
    if (key === 'list') {
      this.list = value;
      // When the list data changes when dragging, need to execute onDrag function
      if (dragEl) this.dragStart(dragEl, false);
    } else {
      this.options[key] = value;
      this.drag.set(key, value);
    }
  },

  init() {
    const {
      group,
      handle,
      disabled,
      draggable,
      ghostClass,
      ghostStyle,
      chosenClass,
      animation,
      autoScroll,
      scrollStep,
      scrollThreshold,
    } = this.options;

    this.drag = new SortableDnd(this.options.scrollEl, {
      group,
      handle,
      disabled,
      draggable,
      ghostClass,
      ghostStyle,
      chosenClass,
      animation,
      autoScroll,
      scrollStep,
      scrollThreshold,
      onChange: ({ from, to }) => this.onChange(from, to),
      onDrag: ({ from }) => this.dragStart(from.node),
      onDrop: ({ changed }) => this.dragEnd(changed),
      onAdd: ({ from, to }) => this.onAdd(from, to),
      onRemove: ({ from, to }) => this.onRemove(from, to),
    });
  },

  dragStart(node, callback = true) {
    dragEl = node;
    this.cloneList = [...this.list];

    const key = dragEl.dataset.key;

    const index = this.getIndex(this.list, key);
    if (index > -1) {
      Object.assign(dragState.from, {
        list: [...this.list],
        item: this.list[index],
        index,
        key,
      });
    }

    if (callback) {
      this.rangeIsChanged = false;
      // on-drag callback
      this.onDrag(dragState.from, dragEl);
    } else {
      this.rangeIsChanged = true;
    }
  },

  onAdd(_from, _to) {
    const oldKey = _from.node.dataset.key;
    const newKey = _to.node.dataset.key;
    const newIndex = this.getIndex(this.cloneList, newKey);
    const oldIndex = this.getIndex(dragState.from.list, oldKey);

    const oldItem = dragState.from.list[oldIndex];

    this.cloneList.splice(newIndex, 0, oldItem);
  },

  onRemove(_from, _to) {
    const oldKey = _from.node.dataset.key;
    const oldIndex = this.getIndex(this.cloneList, oldKey);

    this.cloneList.splice(oldIndex, 1);
  },

  onChange(_from, _to) {
    const oldKey = dragState.from.key;
    const newKey = _to.node.dataset.key;

    const from = { item: null, index: -1 };
    const to = { item: null, index: -1 };

    this.cloneList.forEach((el, index) => {
      const key = this.options.getDataKey(el);
      if (key == oldKey) Object.assign(from, { item: el, index });
      if (key == newKey) Object.assign(to, { item: el, index });
    });

    this.cloneList.splice(from.index, 1);
    this.cloneList.splice(to.index, 0, from.item);
  },

  dragEnd(changed) {
    dragEl && dragEl.remove();
    const { getDataKey } = this.options;
    const { from } = dragState;
    this.cloneList.forEach((el, index) => {
      if (getDataKey(el) == from.key)
        dragState.to = {
          list: [...this.cloneList],
          item: this.cloneList[index],
          key: getDataKey(el),
          index,
        };
    });
    console.log(dragState);
    // on-drop callback
    this.onDrop(this.cloneList, from, dragState.to, changed);
    this.list = [...this.cloneList];
    this.clear();
  },

  getIndex(list, key) {
    return list.findIndex((item) => this.options.getDataKey(item) == key);
  },

  clear() {
    dragEl = null;
    this.rangeIsChanged = false;
    dragState = new DragState();
  },

  destroy() {
    this.drag && this.drag.destroy();
    this.drag = null;
  },
};

export default Sortable;
