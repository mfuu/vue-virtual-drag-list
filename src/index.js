import Vue from 'vue'
import Virtual from './virtual'
import Sortable from './sortable'
import { Range, DragState, VirtualProps } from './interface'
import { Slots, Items } from './children'
import { debounce, throttle } from './utils'

const VirtualDragList = Vue.component('virtual-drag-list', {
  props: VirtualProps,
  data() {
    return {
      list: [],
      uniqueKeys: [],
      virtual: null,
      sortable: null,
      lastItem: null,
      range: new Range,
      dragState: new DragState
    }
  },
  provide() {
    return {
      virtualList: this
    }
  },
  computed: {
    isHorizontal() {
      return this.direction !== 'vertical'
    },
    scrollSizeKey() {
      return this.isHorizontal ? 'scrollWidth' : 'scrollHeight'
    },
    scrollDirectionKey() {
      return this.isHorizontal ? 'scrollLeft' : 'scrollTop'
    },
    offsetSizeKey() {
      return this.isHorizontal ? 'offsetLeft' : 'offsetTop'
    },
    clientSizeKey() {
      return this.isHorizontal ? 'clientWidth' : 'clientHeight'
    }
  },
  watch: {
    dataSource: {
      handler(val) {
        this.init(val)
      },
      deep: true,
      immediate: true
    },
    disabled: {
      handler(val) {
        if (this.sortable) this.sortable.set('disabled', val)
      },
      immediate: true
    }
  },
  created() {
    this.range.end = this.keeps - 1
    this._clearDragState = throttle(() => {
      this.dragState = new DragState
    }, this.delay + 17)
  },
  beforeDestroy() {
    this._destroySortable()
  },
  methods: {
    // --------------------------- emits ------------------------------
    /**
     * reset component
     */
    reset() {
      this.scrollToTop()
      this.init(this.dataSource)
    },
    /**
     * git item size by data-key
     * @param {String | Number} key data-key 
     */
    getSize(key) {
      return this.virtual.sizes.get(key)
    },
    /**
     * Get the current scroll height
     */
    getOffset() {
      const { root } = this.$refs
      return root ? Math.ceil(root[this.scrollDirectionKey]) : 0
    },
    /**
     * Scroll to top of list
     */
    scrollToTop() {
      const { root } = this.$refs
      root[this.scrollDirectionKey] = 0
    },
    /**
     * Scroll to bottom of list
     */
    scrollToBottom() {
      const { bottomItem, root } = this.$refs
      if (bottomItem) {
        const bottom = bottomItem[this.offsetSizeKey]
        this.scrollToOffset(bottom)

        // The first scroll height may change, if the bottom is not reached, execute the scroll method again
        setTimeout(() => {
          const offset = this.getOffset()
          const clientSize = Math.ceil(root[this.clientSizeKey])
          const scrollSize = Math.ceil(root[this.scrollSizeKey])
          if (offset + clientSize < scrollSize) this.scrollToBottom()
        }, 5)
      }
    },
    /**
     * Scroll to the specified index position
     * @param {Number} index 
     */
    scrollToIndex(index) {
      if (index >= this.list.length - 1) {
        this.scrollToBottom()
      } else {
        const indexOffset = this.virtual.getOffsetByIndex(index)
        this.scrollToOffset(indexOffset)

        setTimeout(() => {
          const offset = this.getOffset()
          const indexOffset = this.virtual.getOffsetByIndex(index)
          if (offset !== indexOffset) this.scrollToIndex(index)
        }, 5)
      }
    },
    /**
     * Scroll to the specified offset
     * @param {Number} offset 
     */
    scrollToOffset(offset) {
      const { root } = this.$refs
      root[this.scrollDirectionKey] = offset
    },

    /**
     * callback function after drop
     */
    handleDragEnd(list, _old, _new, changed) {
      this.$emit('ondragend', list, _old, _new, changed)
    },

    // --------------------------- init ------------------------------
    init(list) {
      this.list = [...list]
      this._updateUniqueKeys()
      // virtual init
      if (!this.virtual) {
        this._initVirtual()
      } else {
        this.virtual.updateUniqueKeys(this.uniqueKeys)
        this.virtual.updateSizes(this.uniqueKeys)
        this.virtual.updateRange()
      }
      // sortable init
      if (!this.sortable) {
        this.$nextTick(() => this._initSortable())
      } else this.sortable.set('list', [...list])

      // if auto scroll to the last offset
      if (this.lastItem && this.keepOffset) {
        const index = this._getItemIndex(this.lastItem)
        this.scrollToIndex(index)
        this.lastItem = null
      }
    },

    // virtual init
    _initVirtual() {
      this.virtual = new Virtual(
        {
          size: this.size,
          keeps: this.keeps,
          uniqueKeys: this.uniqueKeys,
          isHorizontal: this.isHorizontal
        },
        (range) => {
          if (this.dragState.to.key === undefined) this.range = range
          const { start, end } = this.range
          const { index } = this.dragState.from
          if (index > -1 && !(index >= start && index <= end)) {
            if (this.sortable) this.sortable.rangeIsChanged = true
          }
        }
      )
      this.virtual.updateSizes(this.uniqueKeys)
      this.virtual.updateRange()
    },

    // sortable init
    _initSortable() {
      this.sortable = new Sortable(
        {
          scrollEl: this.$refs.group,
          getDataKey: this._getDataKey,
          list: this.list,

          disabled: this.disabled,
          dragging: this.dragging,
          draggable: this.draggable,
          ghostClass: this.ghostClass,
          ghostStyle: this.ghostStyle,
          chosenClass: this.chosenClass,
          animation: this.animation,
          autoScroll: this.autoScroll,
          scrollStep: this.scrollStep,
          scrollThreshold: this.scrollThreshold
        },
        (from, node) => {
          // on drag
          this.dragState.from = from
          this.$emit('ondragstart', this.list, from, node)
        },
        (list, from, to, changed) => {
          // on drop
          this.dragState.to = to
          this.handleDragEnd(list, from, to, changed)
          if (changed) {
            this.list = [...list]
            this._updateUniqueKeys()
            this.virtual.updateUniqueKeys(this.uniqueKeys)
          }
          this._clearDragState()
        }
      )
    },

    _destroySortable() {
      this.sortable && this.sortable.destroy()
      this.sortable = null
    },

    // --------------------------- handle scroll ------------------------------
    _handleScroll() {
      // The scroll event is triggered when the mouseup event occurs, which is handled here to prevent the page from scrolling due to range changes.
      if (this.dragState.to.key !== undefined) {
        this._clearDragState()
        return
      }

      const { root } = this.$refs
      const offset = this.getOffset()
      const clientSize = Math.ceil(root[this.clientSizeKey])
      const scrollSize = Math.ceil(root[this.scrollSizeKey])

      if (!scrollSize || offset < 0 || (offset + clientSize > scrollSize + 1)) return

      this.virtual.handleScroll(offset)

      if (this.virtual.isFront()) {
        if (!!this.list.length && offset <= 0) this.handleToTop(this)
      } else if (this.virtual.isBehind()) {
        if (clientSize + offset >= scrollSize) this.handleToBottom(this)
      }
    },

    handleToTop: debounce((_this) => {
      _this.$emit('top')
      _this.lastItem = _this.list[0]
    }),

    handleToBottom: debounce((_this) => {
      _this.$emit('bottom')
    }),

    // --------------------------- handle size change ------------------------------
    _onItemResized(id, size) {
      this.virtual.handleItemSizeChange(id, size)
    },
    _onHeaderResized(id, size) {
      this.virtual.handleHeaderSizeChange(size)
    },
    _onFooterResized(id, size) {
      this.virtual.handleFooterSizeChange(size)
    },

    // --------------------------- methods ------------------------------
    _updateUniqueKeys() {
      this.uniqueKeys = this.list.map(item => this._getDataKey(item))
    },
    _getDataKey(obj) {
      const { dataKey } = this
      return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce((o, k) => (o || {})[k], obj)
    },
    _getItemIndex(item) {
      return this.list.findIndex(el => this._getDataKey(item) == this._getDataKey(el))
    },
    _getItemStyle(itemKey) {
      const { key } = this.dragState.from
      if (this.sortable && this.sortable.rangeIsChanged && itemKey == key)
        return { display: 'none' }
      return {}
    }
  },
  // --------------------------- render ------------------------------
  render (h) {
    const { header, footer } = this.$slots
    const { start, end, front, behind } = this.range
    const { isHorizontal, headerTag, footerTag, itemTag, rootTag, wrapTag, itemStyle, itemClass, wrapClass } = this
    const wrapStyle = { ...this.wrapStyle, padding: isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`}

    return h(rootTag, {
      ref: 'root',
      style: { overflow: isHorizontal ? 'auto hidden' : 'hidden auto' },
      on: {
        '&scroll': debounce(this._handleScroll, this.delay)
      }
    }, [
      // header-slot
      header ? h(Slots, {
        props: {
          tag: headerTag,
          dataKey: 'header',
          event: '_onHeaderResized'
        }
      }, header) : null,
      
      // list content
      h(wrapTag, {
        ref: 'group',
        attrs: { role: 'group' },
        class: wrapClass,
        style: wrapStyle,
      }, this.list.slice(start, end + 1).map(record => {
        const index = this._getItemIndex(record)
        const dataKey = this._getDataKey(record)
        const props = { isHorizontal, dataKey, tag: itemTag, event: '_onItemResized', }

        return this.$scopedSlots.item ? 
          h(Items, {
            key: dataKey,
            props: props,
            style: { ...itemStyle, ...this._getItemStyle(dataKey) },
            class: itemClass
          }, this.$scopedSlots.item({ record, index, dataKey }))
          : 
          h(itemTag, {
            key: dataKey,
            attrs: { 'data-key': dataKey },
            style: { ...itemStyle, height: `${this.size}px` },
            class: itemClass
          }, dataKey)
        })
      ),

      // footer-slot
      footer ? h(Slots, {
        props: {
          tag: footerTag,
          dataKey: 'footer',
          event: '_onFooterResized'
        }
      }, footer) : null,

      // last element
      h('div', {
        ref: 'bottomItem',
        style: {
          width: isHorizontal ? '0px' : '100%',
          height: isHorizontal ? '100%' : '0px'
        }
      })
    ])
  }
})

export default VirtualDragList