import Vue from 'vue'
import Virtual from './plugins/virtual'
import Sortable from './plugins/sortable'
import { Range, DragState } from './plugins/states'
import { VirtualProps } from './props'
import { Slots, Items } from './slots'
import { debounce } from './utils'

const VirtualDragList = Vue.component('virtual-drag-list', {
  props: VirtualProps,
  data() {
    return {
      list: [], // 将dataSource克隆一份
      uniqueKeys: [], // 通过dataKey获取所有数据的唯一键值
      virtual: null,
      sortable: null,

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

        // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法
        setTimeout(() => {
          const offset = this.getOffset()
          const clientSize = Math.ceil(root[this.clientSizeKey])
          const scrollSize = Math.ceil(root[this.scrollSizeKey])
          if (offset + clientSize < scrollSize) this.scrollToBottom()
        }, this.delay + 3)
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
        }, this.delay + 3)
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
      this._initVirtual()
      // sortable init
      if (!this.sortable) {
        this.$nextTick(() => this._initSortable())
      } else this.sortable.list = [...list]
    },

    // virtual
    _initVirtual() {
      this.virtual = null
      this.virtual = new Virtual(
        {
          size: this.size,
          keeps: this.keeps,
          uniqueKeys: this.uniqueKeys,
          isHorizontal: this.isHorizontal
        },
        (range) => {
          this.range = range
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

    // sortable
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
        (from) => {
          // on drag
          this.dragState.from = from
        },
        (list, from, to, changed) => {
          // on drop
          this.dragState.from = from
          this.dragState.to = to
          this.handleDragEnd(list, from, to, changed)
          if (changed) {
            this.list = [...list]
            this._updateUniqueKeys()
            this.virtual.updateUniqueKeys(this.uniqueKeys)
          }
          setTimeout(() => this.dragState = new DragState, this.delay + 10)
        }
      )
    },

    _destroySortable() {
      this.sortable && this.sortable.destroy()
      this.sortable = null
    },

    // --------------------------- handle scroll ------------------------------
    _handleScroll() {
      // mouseup 事件时会触发scroll事件，这里处理为了防止range改变导致页面滚动
      if (this.dragState.to.key) return

      const { root } = this.$refs
      const offset = this.getOffset()
      const clientSize = Math.ceil(root[this.clientSizeKey])
      const scrollSize = Math.ceil(root[this.scrollSizeKey])
      // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离
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
      return (
        !Array.isArray(dataKey)
          ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.')
          : dataKey).reduce((o, k) => (o || {})[k], obj
      )
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
      // 顶部插槽 
      header ? h(Slots, {
        props: {
          tag: headerTag,
          dataKey: 'header',
          event: '_onHeaderResized'
        }
      }, header) : null,
      
      // 中间内容区域和列表项
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

      // 底部插槽 
      footer ? h(Slots, {
        props: {
          tag: footerTag,
          dataKey: 'footer',
          event: '_onFooterResized'
        }
      }, footer) : null,

      // 最底部元素
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