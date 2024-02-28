import Dnd from 'sortable-dnd';
import { getDataKey } from './utils';

export const SortableAttrs = [
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

function Sortable(el, options) {
  this.el = el;
  this.options = options;
  this.list = [];
  this.store = {};
  this.reRendered = false;
  this.attrs = SortableAttrs;

  this.init();
}

Sortable.prototype = {
  constructor: Sortable,

  destroy() {
    this.sortable && this.sortable.destroy();
    this.sortable = this.store = this.reRendered = null;
  },

  option(key, value) {
    if (key === 'list') {
      this.list = [...value];
    } else {
      this.sortable.option(key, value);
    }
  },

  // ========================================= Properties =========================================
  init() {
    let props = {};
    for (let i = 0; i < SortableAttrs.length; i++) {
      let key = SortableAttrs[i];
      props[key] = this.options[key];
    }

    this.sortable = new Dnd(this.el, {
      ...props,
      swapOnDrop: (params) => params.from === params.to,
      onDrag: (params) => this.onDrag(params),
      onAdd: (params) => this.onAdd(params),
      onRemove: (params) => this.onRemove(params),
      onChange: (params) => this.onChange(params),
      onDrop: (params) => this.onDrop(params),
    });
    this.list = [...this.options.list];
  },

  onDrag(params) {
    const key = params.node.dataset.key;
    const index = this.getIndex(this.list, key);
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

    this.dispatchEvent('onDrag', { item, key, index });
  },

  onRemove(params) {
    const key = params.node.dataset.key;
    const index = this.getIndex(this.list, key);
    const item = this.list[index];

    this.list.splice(index, 1);

    Object.assign(this.store, { key, item });
    this.sortable.option('store', this.store);

    this.dispatchEvent('onRemove', { item, key, index });
  },

  onAdd(params) {
    const { from, target, relative } = params;
    const { key, item } = Dnd.get(from).option('store');

    let index = this.getIndex(this.list, target.dataset.key);

    if (relative === 0) {
      index = this.list.length;
    } else if (relative === -1) {
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

    this.dispatchEvent('onAdd', { item, key, index });
  },

  onChange(params) {
    const store = Dnd.get(params.from).option('store');

    if (params.revertDrag) {
      this.list = [...this.options.list];

      Object.assign(this.store, {
        from: store.origin,
      });

      return;
    }

    const { node, target, relative, backToOrigin } = params;

    const fromIndex = this.getIndex(this.list, node.dataset.key);
    const fromItem = this.list[fromIndex];

    let toIndex = this.getIndex(this.list, target.dataset.key);

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

  onDrop(params) {
    const { from, to } = this.getStore(params);
    const changed = params.from !== params.to || from.origin.index !== to.to.index;

    this.dispatchEvent('onDrop', {
      changed,
      list: this.list,
      item: from.item,
      key: from.key,
      from: from.origin,
      to: to.to,
    });

    if (params.from === this.el && this.reRendered) {
      Dnd.dragged?.remove();
    }
    if (params.from !== params.to && params.pullMode === 'clone') {
      Dnd.clone?.remove();
    }

    this.reRendered = false;
  },

  getIndex(list, key) {
    for (let i = 0; i < list.length; i++) {
      if (getDataKey(list[i], this.options.dataKey) == key) {
        return i;
      }
    }
    return -1;
  },

  getStore(params) {
    return {
      from: Dnd.get(params.from).option('store'),
      to: Dnd.get(params.to).option('store'),
    };
  },

  dispatchEvent(name, params) {
    const cb = this.options[name];
    if (cb) cb(params);
  },
};

export { Sortable };
export default Sortable;
