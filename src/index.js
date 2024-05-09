import Vue from 'vue';
import { Virtual, Sortable, debounce, getDataKey, SortableAttrs, VirtualAttrs } from './core';
import { VirtualProps, SlotsProps } from './props';

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
        class: 'virtual-dnd-list-item',
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
      range: { start: 0, end: 0, front: 0, behind: 0 },
      dragging: '',
      lastList: [],
      lastLength: null,
      uniqueKeys: [],
      virtualRef: null,
      sortableRef: null,
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
        if (!this.virtualRef) return;
        for (let key in newVal) {
          if (newVal[key] != oldVal[key]) {
            this.virtualRef.option(key, newVal[key]);
          }
        }
      },
    },
    sortableAttributes: {
      handler(newVal, oldVal) {
        if (!this.sortableRef) return;
        for (let key in newVal) {
          if (newVal[key] != oldVal[key]) {
            this.sortableRef.option(key, newVal[key]);
          }
        }
      },
    },
  },

  activated() {
    // set back offset when awake from keep-alive
    this.scrollToOffset(this.virtualRef.offset);

    this.virtualRef.addScrollEventListener();
  },

  deactivated() {
    this.virtualRef.removeScrollEventListener();
  },

  created() {
    this.range.end = this.keeps - 1;
    this._onUpdate();
  },

  mounted() {
    this._initVirtual();
    this._initSortable();
  },

  beforeDestroy() {
    this.sortableRef?.destroy();
    this.virtualRef?.removeScrollEventListener();
    this.sortableRef = this.virtual = null;
  },

  methods: {
    /**
     * Git item size by data-key
     * @param {any} key data-key
     */
    getSize(key) {
      return this.virtualRef.getSize(key);
    },

    /**
     * Get the current scroll height
     */
    getOffset() {
      return this.virtualRef.getOffset();
    },

    /**
     * Get client viewport size
     */
    getClientSize() {
      return this.virtualRef.getClientSize();
    },

    /**
     * Get all scroll size
     */
    getScrollSize() {
      return this.virtualRef.getScrollSize();
    },

    /**
     * Scroll to the specified data-key
     * @param {Number|String} key
     */
    scrollToKey(key) {
      const index = this.uniqueKeys.indexOf(key);
      if (index > -1) {
        this.virtualRef.scrollToIndex(index);
      }
    },

    /**
     * Scroll to the specified index position
     * @param {Number} index
     */
    scrollToIndex(index) {
      this.virtualRef.scrollToIndex(index);
    },

    /**
     * Scroll to the specified offset
     * @param {Number} offset
     */
    scrollToOffset(offset) {
      this.virtualRef.scrollToOffset(offset);
    },

    /**
     * Scroll to top of list
     */
    scrollToTop() {
      this.virtualRef.scrollToOffset(0);
    },

    /**
     * Scroll to bottom of list
     */
    scrollToBottom() {
      this.virtualRef.scrollToBottom();
    },

    _onUpdate() {
      this._updateUniqueKeys();
      this._updateRange(this.lastList, this.dataSource);

      this.sortableRef?.option('list', this.dataSource);

      // top loading: auto scroll to the last offset
      if (this.lastLength && this.keepOffset) {
        const index = this.dataSource.length - this.lastLength;
        if (index > 0) {
          this.scrollToIndex(index);
        }
        this.lastLength = null;
      }

      this.lastList = [...this.dataSource];
    },

    // virtual init
    _initVirtual() {
      this.virtualRef = new Virtual({
        size: this.size,
        keeps: this.keeps,
        buffer: Math.round(this.keeps / 3),
        wrapper: this.$refs.wrapRef,
        scroller: this.scroller || this.$refs.rootRef,
        direction: this.direction,
        uniqueKeys: this.uniqueKeys,
        debounceTime: this.debounceTime,
        throttleTime: this.throttleTime,
        onScroll: (event) => {
          this.lastLength = null;
          if (!!this.dataSource.length && event.top) {
            this._handleToTop();
          } else if (event.bottom) {
            this._handleToBottom();
          }
        },
        onUpdate: (range) => {
          const rangeChanged = range.start !== this.range.start;
          if (this.dragging && rangeChanged) {
            this.sortableRef.reRendered = true;
          }

          this.range = range;
          rangeChanged && this.$emit('rangeChange', range);
        },
      });
    },

    // sortable init
    _initSortable() {
      this.sortableRef = new Sortable(this.$refs.rootRef, {
        ...this.sortableAttributes,
        list: this.dataSource,
        uniqueKeys: this.uniqueKeys,
        onDrag: (event) => {
          this.dragging = event.key;
          if (!this.sortable) {
            this.virtualRef.enableScroll(false);
            this.sortableRef.option('autoScroll', false);
          }
          this.$emit('drag', event);
        },
        onAdd: (event) => {
          this.$emit('add', event);
        },
        onRemove: (event) => {
          this.$emit('remove', event);
        },
        onDrop: (event) => {
          this.dragging = '';
          if (!this.sortable) {
            this.virtualRef.enableScroll(true);
            this.sortableRef.option('autoScroll', this.autoScroll);
          }
          if (event.changed) {
            this.$emit('updateDataSource', event.list);
          }
          this.$emit('drop', event);
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
      this.virtualRef?.updateRange(range);
    },

    _scrolledToBottom() {
      const offset = this.getOffset();
      const clientSize = this.getClientSize();
      const scrollSize = this.getScrollSize();
      return offset + clientSize + 1 >= scrollSize;
    },

    _handleToTop: debounce(function () {
      this.$emit('top');
      this.lastLength = this.dataSource.length;
    }),

    _handleToBottom: debounce(function () {
      this.$emit('bottom');
    }),

    _onItemResized(key, size) {
      const sizes = this.virtualRef.sizes.size;
      const renders = Math.min(this.keeps, this.dataSource.length);
      this.virtualRef.onItemResized(key, size);

      if (sizes === renders - 1) {
        this._updateRange(this.dataSource, this.dataSource);
      }
    },

    _updateUniqueKeys() {
      this.uniqueKeys = this.dataSource.map((item) => getDataKey(item, this.dataKey));
      this.virtualRef?.option('uniqueKeys', this.uniqueKeys);
      this.sortableRef?.option('uniqueKeys', this.uniqueKeys);
    },

    _getItemStyle(itemKey) {
      if (itemKey == this.dragging) {
        return { display: 'none' };
      }
      return {};
    },

    _renderItems(h) {
      const renders = [];
      const { start, end } = this.range;

      for (let index = start; index <= end; index++) {
        const record = this.dataSource[index];
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
            ref: 'wrapRef',
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
