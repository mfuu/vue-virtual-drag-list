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
    const key = params.node.dataset.key;
    const index = this._getIndex(this.list, key);
    const item = this.list[index];

    // store the drag item
    this.store = {
      item,
      key,
      from: { index, list: this.list },
      to: { index, list: this.list },
    };
    this.sortable.option('store', this.store);

    this.onDrag({ list: this.list });
    this.ctx.$emit('drag', { item, index, key });
  },

  _onRemove(params) {
    const key = params.node.dataset.key;
    const index = this._getIndex(this.list, key);
    const item = this.list[index];

    this.list.splice(index, 1);

    this.ctx.$emit('remove', { item, index, key });
  },

  _onAdd(params) {
    const { from, target } = params;
    const tokey = target.dataset.key;
    const index = this._getIndex(this.list, tokey);

    const fromStore = Dnd.get(from).option('store');
    const key = fromStore.key;
    const item = fromStore.item;

    this.list.splice(index, 0, item);

    Object.assign(this.store, {
      to: {
        index,
        list: this.list,
      },
    });
    this.sortable.option('store', this.store);

    this.ctx.$emit('add', { item, index, key });
  },

  _onChange(params) {
    const { node, target } = params;
    const fromIndex = this._getIndex(this.list, node.dataset.key);
    const fromItem = this.list[fromIndex];
    const toIndex = this._getIndex(this.list, target.dataset.key);

    this.list.splice(fromIndex, 1);
    this.list.splice(toIndex, 0, fromItem);

    Object.assign(this.store, {
      to: {
        index: toIndex,
        list: this.list,
      },
    });
  },

  _onDrop(params) {
    const fromStore = Dnd.get(params.from).option('store');
    const toStore = Dnd.get(params.to).option('store');
    const from = fromStore.from;
    const to = toStore.to;

    this.onDrop({ list: this.list });

    this.ctx.$emit('drop', {
      list: this.list,
      item: fromStore.item,
      key: fromStore.key,
      from,
      to,
    });

    if (params.from !== params.to && params.pullMode === 'clone') {
      params.clone?.remove();
    }
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
