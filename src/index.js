import Vue from 'vue';
import Dnd from 'sortable-dnd';
import { VirtualProps, SlotsProps } from './props';
import { Virtual, Sortable, debounce, getDataKey, SortableAttrs, VirtualAttrs } from './core';

const Observer = {
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(() => {
        this.onSizeChange();
      });
      this.$el && this.observer.observe(this.$el);
    }
  },
  updated() {
    this.onSizeChange();
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  },
  methods: {
    onSizeChange() {
      this.$emit('resized', this.dataKey, this.getCurrentSize());
    },
    getCurrentSize() {
      return this.$el ? this.$el[this.sizeKey] : 0;
    },
  },
};

const Items = Vue.component('virtual-draglist-items', {
  mixins: [Observer],
  props: SlotsProps,
  render(h) {
    const { tag, dataKey } = this;
    return h(
      tag,
      {
        key: dataKey,
        attrs: {
          'data-key': dataKey,
        },
      },
      this.$slots.default
    );
  },
});

const VirtualDragList = Vue.component('virtual-drag-list', {
  model: {
    prop: 'dataSource',
    event: 'updateDataSource',
  },
  props: VirtualProps,
  data() {
    return {
      list: [],
      range: { start: 0, end: 0, front: 0, behind: 0 },
      virtual: null,
      sortable: null,
      lastLength: null,
      uniqueKeys: [],
    };
  },

  computed: {
    isHorizontal() {
      return this.direction !== 'vertical';
    },
    itemSizeKey() {
      return this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    },
    virtualAttributes() {
      return VirtualAttrs.reduce((res, key) => {
        res[key] = this[key];
        return res;
      }, {});
    },
    sortableAttributes() {
      return SortableAttrs.reduce((res, key) => {
        res[key] = this[key];
        return res;
      }, {});
    },
  },

  watch: {
    dataSource: {
      handler() {
        this._onUpdate();
      },
      deep: true,
    },
    virtualAttributes: {
      handler(newVal, oldVal) {
        if (!this.virtual) return;
        for (let key in newVal) {
          if (newVal[key] != oldVal[key]) {
            this.virtual.option(key, newVal[key]);
          }
        }
      },
      deep: true,
    },
    sortableAttributes: {
      handler(newVal, oldVal) {
        if (!this.sortable) return;
        for (let key in newVal) {
          if (newVal[key] != oldVal[key]) {
            this.sortable.option(key, newVal[key]);
          }
        }
      },
      deep: true,
    },
  },

  activated() {
    // set back offset when awake from keep-alive
    this.scrollToOffset(this.virtual.offset);

    this.virtual.addScrollEventListener();
  },

  deactivated() {
    this.virtual.removeScrollEventListener();
  },

  created() {
    this.range.end = this.keeps - 1;
    this._initVirtual();
    this._onUpdate();
  },

  mounted() {
    this.virtual.option('wrapper', this.$refs.groupRef);
    if (!this.scroller) {
      this.virtual.option('scroller', this.$refs.rootRef);
    }
  },

  beforeDestroy() {
    this.sortable && this.sortable.destroy();
    this.virtual.removeScrollEventListener();
    this.sortable = this.virtual = null;
  },

  methods: {
    /**
     * Git item size by data-key
     * @param {any} key data-key
     */
    getSize(key) {
      return this.virtual.getSize(key);
    },

    /**
     * Get the current scroll height
     */
    getOffset() {
      return this.virtual.getOffset();
    },

    /**
     * Get client viewport size
     */
    getClientSize() {
      return this.virtual.getClientSize();
    },

    /**
     * Get all scroll size
     */
    getScrollSize() {
      return this.virtual.getScrollSize();
    },

    /**
     * Scroll to the specified data-key
     * @param {Number|String} key
     */
    scrollToKey(key) {
      const index = this.uniqueKeys.indexOf(key);
      if (index > -1) {
        this.virtual.scrollToIndex(index);
      }
    },

    /**
     * Scroll to the specified index position
     * @param {Number} index
     */
    scrollToIndex(index) {
      this.virtual.scrollToIndex(index);
    },

    /**
     * Scroll to the specified offset
     * @param {Number} offset
     */
    scrollToOffset(offset) {
      this.virtual.scrollToOffset(offset);
    },

    /**
     * Scroll to top of list
     */
    scrollToTop() {
      this.virtual.scrollToOffset(0);
    },

    /**
     * Scroll to bottom of list
     */
    scrollToBottom() {
      this.virtual.scrollToBottom();
    },

    _onUpdate() {
      const oldList = [...this.list];

      this.list = this.dataSource;
      this._updateUniqueKeys();
      this._updateRange(oldList, this.list);

      if (!this.sortable) {
        this.$nextTick(() => this._initSortable());
      } else {
        this.sortable.option('list', this.list);
      }

      // top loading: auto scroll to the last offset
      if (this.lastLength && this.keepOffset) {
        const index = this.list.length - this.lastLength;
        if (index > 0) {
          this.scrollToIndex(index);
        }
        this.lastLength = null;
      }
    },

    // virtual init
    _initVirtual() {
      this.virtual = new Virtual({
        size: this.size,
        keeps: this.keeps,
        buffer: Math.round(this.keeps / 3),
        scroller: this.scroller,
        direction: this.direction,
        uniqueKeys: this.uniqueKeys,
        debounceTime: this.debounceTime,
        throttleTime: this.throttleTime,
        onScroll: (params) => {
          this.lastLength = null;
          if (!!this.list.length && params.top) {
            this._handleToTop();
          } else if (params.bottom) {
            this._handleToBottom();
          }
        },
        onUpdate: (range) => {
          if (Dnd.dragged && range.start !== this.range.start) {
            this.sortable.reRendered = true;
          }
          this.range = range;
        },
      });
    },

    // sortable init
    _initSortable() {
      this.sortable = new Sortable(this.$refs.groupRef, {
        list: this.list,
        dataKey: this.dataKey,
        ...this.sortableAttributes,
        onDrag: (params) => {
          this.$emit('drag', params);
        },
        onAdd: (params) => {
          this.$emit('add', params);
        },
        onRemove: (params) => {
          this.$emit('remove', params);
        },
        onDrop: (params) => {
          if (params.changed) {
            this.$emit('updateDataSource', params.list);
          }
          this.$emit('drop', params);
        },
      });
    },

    _updateRange(oldList, newList) {
      let range = { ...this.range };
      if (
        newList.length > oldList.length &&
        this.range.end === oldList.length - 1 &&
        this._scrolledToBottom()
      ) {
        range.end++;
        range.start = Math.max(0, range.end - this.keeps + 1);
      }
      this.virtual.updateRange(range);
    },

    _scrolledToBottom() {
      const offset = this.getOffset();
      const clientSize = this.getClientSize();
      const scrollSize = this.getScrollSize();
      return offset + clientSize + 1 >= scrollSize;
    },

    _handleToTop: debounce(function () {
      this.$emit('top');
      this.lastLength = this.list.length;
    }),

    _handleToBottom: debounce(function () {
      this.$emit('bottom');
    }),

    _onItemResized(key, size) {
      const renders = this.virtual.sizes.size;
      this.virtual.onItemResized(key, size);
      if (renders === 0) {
        this._updateRange(this.list, this.list);
      }
    },

    _updateUniqueKeys() {
      this.uniqueKeys = this.list.map((item) => getDataKey(item, this.dataKey));
      this.virtual.option('uniqueKeys', this.uniqueKeys);
    },

    _getItemStyle(itemKey) {
      const fromKey = Dnd.dragged?.dataset.key;
      if (itemKey == fromKey) {
        return { display: 'none' };
      }
      return {};
    },

    _renderItems(h) {
      const renders = [];
      const { start, end } = this.range;

      for (let index = start; index <= end; index++) {
        const record = this.list[index];
        if (record) {
          const dataKey = getDataKey(record, this.dataKey);
          const itemStyle = { ...this.itemStyle, ...this._getItemStyle(dataKey) };
          renders.push(
            this.$scopedSlots.item
              ? h(
                  Items,
                  {
                    key: dataKey,
                    props: {
                      dataKey,
                      tag: this.itemTag,
                      sizeKey: this.itemSizeKey,
                    },
                    on: {
                      resized: this._onItemResized,
                    },
                    style: itemStyle,
                    class: this.itemClass,
                  },
                  this.$scopedSlots.item({ record, index, dataKey })
                )
              : null
          );
        }
      }
      return renders;
    },
  },

  render(h) {
    const { front, behind } = this.range;
    const { isHorizontal, rootTag, wrapTag } = this;
    const padding = isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`;

    return h(
      rootTag,
      {
        ref: 'rootRef',
        style: !this.scroller && { overflow: isHorizontal ? 'auto hidden' : 'hidden auto' },
      },
      [
        this.$slots.header,

        h(
          wrapTag,
          {
            ref: 'groupRef',
            class: this.wrapClass,
            style: { ...this.wrapStyle, padding },
          },
          this._renderItems(h)
        ),

        this.$slots.footer,
      ]
    );
  },
});

export default VirtualDragList;
