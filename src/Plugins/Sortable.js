import Dnd from 'sortable-dnd';
import { getDataKey } from '../utils';

export const attributes = [
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
    onUnchoose: (params) => this._onUnchoose(params),
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
      origin: { index, list: this.list },
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

    Object.assign(this.store, {
      key,
      item,
    });
    this.sortable.option('store', this.store);

    this.ctx.$emit('remove', { item, index, key });
  },

  _onAdd(params) {
    const { from, target, relative } = params;
    const { key, item } = Dnd.get(from).option('store');

    let index = this._getIndex(this.list, target.dataset.key);

    if (relative === -1) {
      index += 1;
    }

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
    const store = Dnd.get(params.from).option('store');

    if (params.revertDrag) {
      this.list = [...this.ctx.list];
      Object.assign(this.store, {
        from: store.origin,
      });
      return;
    }

    const { node, target, relative, backToOrigin } = params;

    const fromIndex = this._getIndex(this.list, node.dataset.key);
    const fromItem = this.list[fromIndex];

    let toIndex = this._getIndex(this.list, target.dataset.key);

    if (backToOrigin) {
      if (relative === 1 && store.from.index < toIndex) {
        toIndex -= 1;
      }
      if (relative === -1 && store.from.index > toIndex) {
        toIndex += 1;
      }
    }

    this.list.splice(fromIndex, 1);
    this.list.splice(toIndex, 0, fromItem);

    Object.assign(this.store, {
      from: {
        index: toIndex,
        list: this.list,
      },
      to: {
        index: toIndex,
        list: this.list,
      },
    });
  },

  _onUnchoose(params) {
    const { from, to } = this._getStore(params);

    if (params.from === params.to && from.origin.index === to.to.index) {
      this.sortable.option('swapOnDrop', true);
    }
  },

  _onDrop(params) {
    const { from, to } = this._getStore(params);

    this.onDrop({ list: this.list });

    this.ctx.$emit('drop', {
      list: this.list,
      item: from.item,
      key: from.key,
      from: from.origin,
      to: to.to,
    });

    if (params.from !== params.to && params.pullMode === 'clone') {
      params.clone?.remove();
    }
    if (params.from === params.to && from.origin.index !== to.to.index) {
      Dnd.dragged?.remove();
    }

    this.sortable.option('swapOnDrop', false);
  },

  _getIndex(list, key) {
    for (let i = 0; i < list.length; i++) {
      if (getDataKey(list[i], this.ctx.dataKey) == key) {
        return i;
      }
    }
    return -1;
  },

  _getStore(params) {
    return {
      from: Dnd.get(params.from).option('store'),
      to: Dnd.get(params.to).option('store'),
    };
  },
};

export default Sortable;
