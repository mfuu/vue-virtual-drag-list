import SortableDnd from 'sortable-dnd';
import Storage from './Storage';

const attributes = [
  'group',
  'handle',
  'disabled',
  'draggable',
  'ghostClass',
  'ghostStyle',
  'chosenClass',
  'animation',
  'autoScroll',
  'scrollThreshold',
];

const storage = new Storage();
let dragEl = null;

function Sortable(context, callback) {
  this.context = context;
  this.callback = callback;

  this.initialList = [...context.list];
  this.dynamicList = [...context.list];

  this.drag = null;
  this.rangeIsChanged = false;

  this._init();
}

Sortable.prototype = {
  constructor: Sortable,

  destroy() {
    this.drag && this.drag.destroy();
    this.drag = null;
  },

  getState() {
    return storage.getValue();
  },

  setValue(key, value) {
    if (key === 'list') {
      this.initialList = value;
      // When the list data changes when dragging, need to execute onDrag function
      if (dragEl) this._onDrag(dragEl, false);
    } else {
      this.context[key] = value;
      this.drag.set(key, value);
    }
  },

  _init() {
    const props = attributes.reduce((res, key) => {
      res[key] = this.context[key];
      return res;
    }, {});

    this.drag = new SortableDnd(this.context.$refs.group, {
      ...props,
      initialList: this.initialList,
      onDrag: ({ from }) => this._onDrag(from.node),
      onDrop: ({ changed }) => this._onDrop(changed),
      onChange: ({ from, to }) => this._onChange(from, to),
      onAdd: ({ from, to }) => this._onAdd(from, to),
      onRemove: ({ from, to }) => this._onRemove(from, to),
    });
  },

  async _onDrag(node, callback = true) {
    dragEl = node;
    this.dynamicList = [...this.initialList];

    const key = node.dataset.key;
    const index = this._getIndex(this.initialList, key);

    if (index > -1) {
      storage.setValue({
        from: {
          list: [...this.initialList],
          item: this.initialList[index],
          index,
          key,
        },
      });
    }

    if (callback) {
      this.rangeIsChanged = false;
      const res = await storage.getValue();
      this.context.$emit('drag', { list: this.list, ...res });
    } else {
      this.rangeIsChanged = true;
    }
  },

  async _onAdd(from, to) {
    const state = await storage.getValue();

    const oldKey = from.node.dataset.key;
    const newKey = to.node.dataset.key;
    const newIndex = this._getIndex(this.dynamicList, newKey);
    const oldIndex = this._getIndex(state.from.list, oldKey);
    const newItem = this.dynamicList[newIndex];
    const oldItem = state.from.list[oldIndex];

    this.dynamicList.splice(newIndex, 0, oldItem);

    await storage.setValue({
      from: {
        list: [...state.from.list],
        item: oldItem,
        index: oldIndex,
        key: oldKey,
      },
      to: {
        list: [...this.dynamicList],
        item: newItem,
        index: newIndex,
        key: newKey,
      },
    });

    const res = await storage.getValue();

    this.context.$emit('add', { list: this.dynamicList, ...res });
  },

  async _onRemove(from, to) {
    const state = await storage.getValue();
    const toList = to.sortable.options.initialList;

    const oldKey = from.node.dataset.key;
    const newKey = to.node.dataset.key;
    const oldIndex = this._getIndex(this.dynamicList, oldKey);
    const newIndex = this._getIndex(toList, newKey);
    const oldItem = this.dynamicList[oldIndex];
    const newItem = toList[newIndex];

    await storage.setValue({
      from: {
        list: [...state.from.list],
        item: oldItem,
        index: oldIndex,
        key: oldKey,
      },
      to: {
        list: [...this.dynamicList],
        item: newItem,
        index: newIndex,
        key: newKey,
      },
    });

    const res = await storage.getValue();

    this.context.$emit('remove', { list: this.dynamicList, ...res });
  },

  async _onChange(from, to) {
    const state = await storage.getValue();

    const oldKey = state.from.key;
    const newKey = to.node.dataset.key;
    let oldIndex = -1;
    let oldItem = null;
    let newIndex = -1;
    let newItem = null;

    this.dynamicList.forEach((item, index) => {
      const key = this.context._getDataKey(item);
      if (key == oldKey) {
        oldIndex = index;
        oldItem = item;
      }
      if (key == newKey) {
        newIndex = index;
        newItem = item;
      }
    });

    this.dynamicList.splice(oldIndex, 1);
    this.dynamicList.splice(newIndex, 0, oldItem);
  },

  async _onDrop(changed) {
    dragEl && dragEl.remove();

    const state = await storage.getValue();
    const { _getDataKey } = this.context;

    this.dynamicList.forEach(async (item, index) => {
      if (_getDataKey(item) == state.from.key) {
        await storage.setValue({
          to: {
            list: [...this.dynamicList],
            item: this.dynamicList[index],
            key: _getDataKey(item),
            index,
          },
        });
      }
    });

    const res = await storage.getValue();
    const params = { list: this.dynamicList, ...res, changed };
    this.context.$emit('drop', params);
    this.callback && this.callback(params);
    this.initialList = [...this.dynamicList];
    this._clear();
  },

  _getIndex(list, key) {
    return list.findIndex((item) => this.context._getDataKey(item) == key);
  },

  _clear() {
    dragEl = null;
    storage.clear();
    this.rangeIsChanged = false;
  },
};

export default Sortable;
