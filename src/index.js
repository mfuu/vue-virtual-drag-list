import Vue from 'vue';
import { VirtualProps } from './props';
import { debounce, getDataKey } from './utils';
import Virtual, { Range } from './Plugins/Virtual';
import Sortable from './Plugins/Sortable';
import { Store } from './Plugins/Storage';
import { Slots, Items } from './slots';

const VirtualDragList = Vue.component('virtual-drag-list', {
  model: {
    prop: 'dataSource',
    event: 'updateDataSource',
  },

  props: VirtualProps,

  data() {
    return {
      list: [],
      uniqueKeys: [],
      virtual: null,
      sortable: null,
      lastLength: null,
      range: new Range(),
      timer: null,
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
    clientSizeKey() {
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
      this.sortable && this.sortable.setValue('disabled', val);
    },
  },

  activated() {
    // set back offset when awake from keep-alive
    this.scrollToOffset(this.virtual.offset);

    if (this.pageMode) {
      this._addPageModeScrollListener();
    }
  },

  deactivated() {
    if (this.pageMode) {
      this._removePageModeScrollListener();
    }
  },

  created() {
    this._debounceScroll = debounce(this._handleScroll, this.delay);
    this.range.end = this.keeps - 1;
    this._initVirtual();
    this.init();
  },

  mounted() {
    if (this.pageMode) {
      this._updatePageModeFront();
      this._addPageModeScrollListener();
    }
  },

  beforeDestroy() {
    this._destroySortable();
    if (this.pageMode) {
      this._removePageModeScrollListener();
    }
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
      if (this.pageMode) {
        return (
          document.documentElement[this.scrollDirectionKey] ||
          document.body[this.scrollDirectionKey]
        );
      } else {
        const { rootRef } = this.$refs;
        return rootRef ? Math.ceil(rootRef[this.scrollDirectionKey]) : 0;
      }
    },

    /**
     * Get client viewport size
     */
    getClientSize() {
      if (this.pageMode) {
        return document.documentElement[this.clientSizeKey] || document.body[this.clientSizeKey];
      } else {
        const { rootRef } = this.$refs;
        return rootRef ? Math.ceil(rootRef[this.clientSizeKey]) : 0;
      }
    },

    /**
     * Get all scroll size
     */
    getScrollSize() {
      if (this.pageMode) {
        return document.documentElement[this.scrollSizeKey] || document.body[this.scrollSizeKey];
      } else {
        const { rootRef } = this.$refs;
        return rootRef ? Math.ceil(rootRef[this.scrollSizeKey]) : 0;
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
      }
    },

    /**
     * Scroll to the specified offset
     * @param {Number} offset
     */
    scrollToOffset(offset) {
      if (this.pageMode) {
        document.body[this.scrollDirectionKey] = offset;
        document.documentElement[this.scrollDirectionKey] = offset;
      } else {
        const { rootRef } = this.$refs;
        rootRef[this.scrollDirectionKey] = offset;
      }
    },

    /**
     * Scroll to top of list
     */
    scrollToTop() {
      this.scrollToOffset(0);
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

    init() {
      this.list = [...this.dataSource];
      this._updateUniqueKeys();

      if (this.virtual.sizes.size) {
        this.virtual.updateRange();
      } else {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.virtual.updateRange(), 17);
      }

      if (!this.sortable) {
        this.$nextTick(() => this._initSortable());
      } else {
        this.sortable.setValue('list', [...this.list]);
      }

      // auto scroll to the last offset
      if (this.lastLength && this.keepOffset) {
        const index = Math.abs(this.dataSource.length - this.lastLength);
        this.scrollToIndex(index);
        this.lastLength = null;
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

        if (list.length !== this.list.length) {
          this._updateRangeOnDrop(list);
        }

        this.list = [...list];
        this._updateUniqueKeys();
        this.$emit('updateDataSource', [...list]);
      });
    },

    _updateRangeOnDrop(list) {
      let range = { ...this.range };
      if (this.range.start > 0) {
        const index = list.indexOf(this.list[this.range.start]);
        if (index > -1) {
          range.start = index;
          range.end = index + this.keeps - 1;
        }
      }
      if (
        list.length > this.list.length &&
        this.range.end === this.list.length - 1 &&
        this._scrolledToBottom()
      ) {
        range.end++;
        range.start = Math.max(0, range.end - this.keeps + 1);
      }
      this.virtual.handleUpdate(range.start, range.end);
    },

    _destroySortable() {
      this.sortable && this.sortable.destroy();
      this.sortable = null;
    },

    _addPageModeScrollListener() {
      document.addEventListener('scroll', this._debounceScroll, { passive: false });
    },

    _removePageModeScrollListener() {
      document.removeEventListener('scroll', this._debounceScroll);
    },

    _handleScroll() {
      const offset = this.getOffset();
      const clientSize = this.getClientSize();
      const scrollSize = this.getScrollSize();

      // iOS scroll-spring-back behavior will make direction mistake
      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return;
      }

      this.virtual.handleScroll(offset);

      if (this.virtual.isFront() && !!this.list.length && offset <= 0) {
        this._handleToTop();
      } else if (this.virtual.isBehind() && clientSize + offset >= scrollSize) {
        this._handleToBottom();
      }
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
      this.virtual.handleItemSizeChange(key, size);
    },

    _onSlotResized(key, size) {
      this.virtual.handleSlotSizeChange(key, size);
    },

    // when using page mode we need update slot header size manually
    // taking root offset relative to the browser as slot header size
    _updatePageModeFront() {
      const { rootRef } = this.$refs;
      if (rootRef) {
        const rect = rootRef.getBoundingClientRect();
        const { defaultView } = rootRef.ownerDocument;
        const offsetFront = this.isHorizontal
          ? rect.left + defaultView.pageXOffset
          : rect.top + defaultView.pageYOffset;
        this.virtual.handleSlotSizeChange('header', offsetFront);
      }
    },

    _updateUniqueKeys() {
      this.uniqueKeys = this.list.map((item) => getDataKey(item, this.dataKey));
      this.virtual.updateOptions('uniqueKeys', this.uniqueKeys);
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
    const { pageMode, isHorizontal, headerTag, footerTag, rootTag, wrapTag, wrapClass } = this;
    const wrapperStyle = {
      ...this.wrapStyle,
      padding: isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`,
    };

    return h(
      rootTag,
      {
        ref: 'rootRef',
        style: !pageMode && { overflow: isHorizontal ? 'auto hidden' : 'hidden auto' },
        on: { '&scroll': !pageMode && this._debounceScroll },
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
