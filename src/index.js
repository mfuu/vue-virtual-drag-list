import Vue from 'vue';
import { VirtualProps } from './props';
import { debounce, getDataKey } from './utils';
import Virtual, { Range } from './Plugins/Virtual';
import Sortable from './Plugins/Sortable';
import { Store } from './Plugins/Storage';
import { Slots, Items } from './slots';

const VirtualDragList = Vue.component('virtual-drag-list', {
  props: VirtualProps,
  data() {
    return {
      list: [],
      uniqueKeys: [],
      virtual: null,
      sortable: null,
      lastItem: null,
      range: new Range(),
    };
  },
  provide() {
    return {
      virtualList: this,
    };
  },
  computed: {
    isHorizontal() {
      return this.direction !== 'vertical';
    },
    scrollSizeKey() {
      return this.isHorizontal ? 'scrollWidth' : 'scrollHeight';
    },
    scrollDirectionKey() {
      return this.isHorizontal ? 'scrollLeft' : 'scrollTop';
    },
    bottomOffsetKey() {
      return this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    },
    rootSizeKey() {
      return this.isHorizontal ? 'clientWidth' : 'clientHeight';
    },
    itemSizeKey() {
      return this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    },
  },
  watch: {
    'dataSource.length'() {
      this.init();
    },
    disabled() {
      if (this.sortable) this.sortable.setValue('disabled', val);
    },
  },
  created() {
    this._initVirtual();
    this.init();
    this.range.end = this.keeps - 1;
  },
  beforeDestroy() {
    this._destroySortable();
  },
  methods: {
    /**
     * reset component
     */
    reset() {
      this.scrollToTop();
      this.init();
    },

    /**
     * Git item size by data-key
     * @param {any} key data-key
     */
    getSize(key) {
      return this.virtual.sizes.get(key);
    },

    /**
     * Get the current scroll height
     */
    getOffset() {
      const { rootRef } = this.$refs;
      return rootRef ? Math.ceil(rootRef[this.scrollDirectionKey]) : 0;
    },

    /**
     * Scroll to top of list
     */
    scrollToTop() {
      const { rootRef } = this.$refs;
      rootRef[this.scrollDirectionKey] = 0;
    },

    /**
     * Scroll to bottom of list
     */
    scrollToBottom() {
      const { bottomRef } = this.$refs;
      if (bottomRef) {
        const bottom = bottomRef[this.bottomOffsetKey];
        this.scrollToOffset(bottom);

        // if the bottom is not reached, execute the scroll method again
        setTimeout(() => {
          if (!this._scrolledToBottom()) this.scrollToBottom();
        }, 5);
      }
    },

    /**
     * Scroll to the specified index position
     * @param {Number} index
     */
    scrollToIndex(index) {
      if (index >= this.list.length - 1) {
        this.scrollToBottom();
      } else {
        const indexOffset = this.virtual.getOffsetByIndex(index);
        this.scrollToOffset(indexOffset);

        setTimeout(() => {
          const offset = this.getOffset();
          const indexOffset = this.virtual.getOffsetByIndex(index);
          if (offset !== indexOffset) this.scrollToIndex(index);
        }, 5);
      }
    },

    /**
     * Scroll to the specified offset
     * @param {Number} offset
     */
    scrollToOffset(offset) {
      const { rootRef } = this.$refs;
      rootRef[this.scrollDirectionKey] = offset;
    },

    init() {
      this.list = [...this.dataSource];
      this._updateUniqueKeys();

      // this.$nextTick(() => this.virtual.updateRange());
      this.virtual.updateRange();

      if (!this.sortable) {
        this.$nextTick(() => this._initSortable());
      } else {
        this.sortable.setValue('list', [...this.list]);
      }

      // auto scroll to the last offset
      if (this.lastItem && this.keepOffset) {
        const index = this._getItemIndex(this.lastItem);
        this.scrollToIndex(index);
        this.lastItem = null;
      }
    },

    // virtual init
    _initVirtual() {
      this.virtual = new Virtual(
        {
          size: this.size,
          keeps: this.keeps,
          uniqueKeys: this.uniqueKeys,
          buffer: Math.round(this.keeps / 3),
        },
        (range) => {
          this.range = range;
          if (!this.sortable) return;
          const state = Store.getStore();
          const { start, end } = this.range;
          const { index } = state.from;
          if (index > -1 && !(index >= start && index <= end)) {
            this.sortable.rangeChanged = true;
          }
        }
      );
    },

    // sortable init
    _initSortable() {
      this.sortable = new Sortable(this, ({ list, changed }) => {
        if (!changed) return;

        if (this.range.start > 0) {
          const index = list.indexOf(this.list[this.range.start]);
          if (index > -1) {
            this.range.start = index;
            this.range.end = index + this.keeps - 1;
          }
        }
        if (list.length > this.list.length && this.range.end === this.list.length - 1) {
          if (this._scrolledToBottom()) {
            this.range.end++;
            this.range.start = Math.max(0, this.range.end - this.keeps + 1);
          }
        }
        this.virtual.handleUpdate(this.range.start, this.range.end);

        this.list = [];
        this.$nextTick(() => {
          this.list = [...list];
          this._updateUniqueKeys();
        })
      });
    },

    _destroySortable() {
      this.sortable && this.sortable.destroy();
      this.sortable = null;
    },

    _handleScroll() {
      const { rootRef } = this.$refs;
      const offset = this.getOffset();
      const clientSize = Math.ceil(rootRef[this.rootSizeKey]);
      const scrollSize = Math.ceil(rootRef[this.scrollSizeKey]);

      if (!scrollSize || offset < 0 || offset + clientSize > scrollSize + 1) {
        return;
      }

      this.virtual.handleScroll(offset);

      if (this.virtual.isFront()) {
        if (!!this.list.length && offset <= 0) this._handleToTop(this);
      } else if (this.virtual.isBehind()) {
        if (clientSize + offset >= scrollSize) this._handleToBottom(this);
      }
    },

    _scrolledToBottom() {
      const { rootRef } = this.$refs;
      const offset = this.getOffset();
      const clientSize = Math.ceil(rootRef[this.rootSizeKey]);
      const scrollSize = Math.ceil(rootRef[this.scrollSizeKey]);
      return offset + clientSize + 1 >= scrollSize;
    },

    _handleToTop: debounce((ctx) => {
      ctx.$emit('top');
      ctx.lastItem = ctx.list[0];
    }),

    _handleToBottom: debounce((ctx) => {
      ctx.$emit('bottom');
    }),

    _onItemResized(key, size) {
      this.virtual.handleItemSizeChange(key, size);
    },

    _onSlotResized(key, size) {
      this.virtual.handleSlotSizeChange(key, size);
    },

    _updateUniqueKeys() {
      this.uniqueKeys = this.list.map((item) => getDataKey(item, this.dataKey));
      this.virtual.updateOptions('uniqueKeys', this.uniqueKeys);
    },

    _getItemIndex(item) {
      return this.list.findIndex(
        (el) => getDataKey(item, this.dataKey) == getDataKey(el, this.dataKey)
      );
    },

    _getItemStyle(itemKey) {
      const state = Store.getStore();
      const fromKey = state.from.key;
      if (this.sortable && this.sortable.rangeChanged && itemKey == fromKey) {
        return { display: 'none' };
      }
      return {};
    },

    _renderSlots(h, key, TagName) {
      const { itemSizeKey } = this;
      const slot = this.$slots[key];
      return slot
        ? h(
            Slots,
            {
              props: {
                tag: TagName,
                dataKey: key,
                sizeKey: itemSizeKey,
                event: '_onSlotResized',
              },
            },
            slot
          )
        : null;
    },

    _renderItems(h) {
      const renders = [];
      const { start, end } = this.range;
      const { itemTag, itemClass, itemSizeKey } = this;

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
                      tag: itemTag,
                      sizeKey: itemSizeKey,
                      event: '_onItemResized',
                    },
                    style: itemStyle,
                    class: itemClass,
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
    const { isHorizontal, headerTag, footerTag, rootTag, wrapTag, wrapClass } = this;
    const paddingStyle = {
      padding: isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`,
    };
    const wrapperStyle = { ...this.wrapStyle, ...paddingStyle };

    return h(
      rootTag,
      {
        ref: 'rootRef',
        style: { overflow: isHorizontal ? 'auto hidden' : 'hidden auto' },
        on: {
          '&scroll': debounce(this._handleScroll, this.delay),
        },
      },
      [
        this._renderSlots(h, 'header', headerTag),

        h(
          wrapTag,
          {
            ref: 'groupRef',
            class: wrapClass,
            style: wrapperStyle,
          },
          this._renderItems(h)
        ),

        this._renderSlots(h, 'footer', footerTag),

        h('div', {
          ref: 'bottomRef',
          style: {
            width: isHorizontal ? '0px' : '100%',
            height: isHorizontal ? '100%' : '0px',
          },
        }),
      ]
    );
  },
});

export default VirtualDragList;
