import Dnd from 'sortable-dnd';
import { getDataKey } from '../utils';

const attributes = [
  'delay',
  'group',
  'handle',
  'disabled',
  'draggable',
  'animation',
  'autoScroll',
  'ghostClass',
  'ghostStyle',
  'chosenClass',
  'fallbackOnBody',
  'scrollThreshold',
  'delayOnTouchOnly',
];

function Sortable(ctx, onDrag, onDrop) {
  this.ctx = ctx;
  this.onDrag = onDrag;
  this.onDrop = onDrop;

  this.list = [...ctx.list];
  this.store = {};

  const props = attributes.reduce((res, key) => {
    res[key] = this.ctx[key];
    return res;
  }, {});

  this.sortable = new Dnd(this.ctx.$refs.groupRef, {
    ...props,
    swapOnDrop: false,
    onDrag: (params) => this._onDrag(params),
    onAdd: (params) => this._onAdd(params),
    onRemove: (params) => this._onRemove(params),
    onChange: (params) => this._onChange(params),
    onDrop: (params) => this._onDrop(params),
  });
}

Sortable.prototype = {
  constructor: Sortable,

  destroy() {
    this.sortable && this.sortable.destroy();
    this.sortable = this.store = null;
  },

  setValue(key, value) {
    if (key === 'list') {
      this.list = [...value];
    } else {
      this.sortable.option(key, value);
    }
  },

  _onDrag(params) {
    const key = params.from.node.dataset.key;
    const index = this._getIndex(this.list, key);
    const item = this.list[index];

    // store the drag item
    this.store = {
      from: {
        item,
        key,
        index,
        list: this.list,
      },
      to: {
        item,
        key,
        index,
        list: this.list,
      },
    };
    this.sortable.option('store', this.store);

    this.onDrag({ list: this.list });
    this.ctx.$emit('drag', { item, index, key });
  },

  _onRemove(params) {
    const key = params.from.node.dataset.key;
    const index = this._getIndex(this.list, key);
    const item = this.list[index];

    if (params.pullMode !== 'clone') {
      this.list.splice(index, 1);
    }

    // store the removed item
    Object.assign(this.store, { remove: { item, key } });
    this.sortable.option('store', this.store);

    this.ctx.$emit('remove', { item, index, key });
  },

  _onAdd(params) {
    const tokey = params.to.node.dataset.key;
    const index = this._getIndex(this.list, tokey);
    const item = params.from.store.remove.item;
    const key = params.from.store.remove.key;
    this.list.splice(index, 0, item);

    Object.assign(this.store, {
      to: {
        item,
        index,
        key,
        list: this.list,
      },
    });
    this.sortable.option('store', this.store);

    this.ctx.$emit('add', { item, index, key });
  },

  _onChange(params) {
    const { from, to } = params;
    const fromKey = from.node.dataset.key;
    const fromIndex = this._getIndex(this.list, from.node.dataset.key);
    const fromItem = this.list[fromIndex];
    const toIndex = this._getIndex(this.list, to.node.dataset.key);
    this.list.splice(fromIndex, 1);
    this.list.splice(toIndex, 0, fromItem);

    Object.assign(this.store, {
      to: {
        item: fromItem,
        index: toIndex,
        key: fromKey,
        list: this.list,
      },
    });
  },

  _onDrop(params) {
    Dnd.clone?.remove();

    const from = params.from.store.from;
    const to = params.to.store.to;
    this.onDrop({ list: this.list });

    this.ctx.$emit('drop', { list: this.list, from, to });
  },

  _getIndex(list, key) {
    for (let i = 0; i < list.length; i++) {
      if (getDataKey(list[i], this.ctx.dataKey) == key) {
        return i;
      }
    }
    return -1;
  },
};

export default Sortable;
