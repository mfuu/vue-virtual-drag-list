import Vue from 'vue'
import { debounce } from './utils'
import Virtual from './plugins/virtual'
import Sortable from './plugins/sortable'
import { Slots, Items } from './plugins/slots'
import { VirtualProps } from './props'

const VirtualDragList = Vue.component('virtual-drag-list', {
  mixins: [Sortable],
  props: VirtualProps,
  data() {
    return {
      list: [], // 将dataSource克隆一份
      uniqueKeys: [], // 通过dataKey获取所有数据的唯一键值
      virtual: null,
      range: {
        start: 0,
        end: 0,
        front: 0,
        behind: 0
      },
      drag: null
    }
  },
  provide() {
    return {
      virtual: this
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
        this.initVirtual(val)
      },
      deep: true,
      immediate: true
    },
    disabled: {
      handler(val) {
        if (!val) this.$nextTick(() => this._initSortable())
        else this._destroySortable()
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
      this.initVirtual(this.dataSource)
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

    handleDragEnd(list, _old, _new, changed) {
      this.virtual.updateUniqueKeys(this.uniqueKeys)
      this.$emit('ondragend', list, _old, _new, changed)
    },

    // --------------------------- init ------------------------------
    initVirtual(list) {
      this.list = [...list]
      this.setUniqueKeys()
      this.virtual = new Virtual(
        {
          size: this.size,
          keeps: this.keeps,
          uniqueKeys: this.uniqueKeys,
          isHorizontal: this.isHorizontal
        },
        (range) => {
          this.rangeIsChanged = true
          this.range = range
        }
      )
      this.virtual.updateRange()
      this.virtual.updateSizes(this.uniqueKeys)
    },

    setUniqueKeys() {
      this.uniqueKeys = this.list.map(item => this._getUniqueKey(item))
    },

    // --------------------------- handle scroll ------------------------------
    _handleScroll(event) {
      const { root } = this.$refs
      const offset = this.getOffset()
      const clientSize = Math.ceil(root[this.clientSizeKey])
      const scrollSize = Math.ceil(root[this.scrollSizeKey])
      // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离
      if (offset < 0 || (offset + clientSize > scrollSize + 1) || !scrollSize) return
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
    _getUniqueKey(obj, defaultValue = '') {
      const { dataKey } = this
      return (
        !Array.isArray(dataKey)
          ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.')
          : dataKey).reduce((o, k) => (o || {})[k], obj
      ) || defaultValue
    },
    _getItemIndex(item) {
      return this.list.findIndex(el => this._getUniqueKey(item) == this._getUniqueKey(el))
    }
  },
  // --------------------------- render ------------------------------
  render (h) {
    const { header, footer } = this.$slots
    const { height, isHorizontal, rootClass, headerTag, footerTag, itemTag, itemStyle, itemClass, wrapClass } = this
    const { start, end, front, behind } = this.range
    
    const rootStyle = { ...this.rootStyle, height, overflow: isHorizontal ? 'auto hidden' : 'hidden auto' }
    const wrapStyle = { ...this.wrapStyle, padding: isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`}

    return h('div', {
      ref: 'root',
      class: rootClass,
      style: rootStyle,
      on: { '&scroll': debounce(this._handleScroll, this.delay) }
    }, [
      // 顶部插槽 
      header ? h(Slots, {
        props: {
          tag: headerTag,
          uniqueKey: 'header',
          event: '_onHeaderResized'
        }
      }, header) : null,
      
      // 中间内容区域和列表项
      h('div', {
        ref: 'wrapper',
        attrs: { role: 'wrapper' },
        class: wrapClass,
        style: wrapStyle,
      }, this.list.slice(start, end + 1).map(record => {
        const index = this._getItemIndex(record)
        const uniqueKey = this._getUniqueKey(record)
        const props = { isHorizontal, uniqueKey, tag: itemTag, event: '_onItemResized', }

        return this.$scopedSlots.item ? (
          h(Items, {
              key: uniqueKey,
              props: props,
              style: itemStyle,
              class: itemClass
            }, this.$scopedSlots.item({ record, index, dataKey: uniqueKey }))
          ) : (
            h(itemTag, {
              key: uniqueKey,
              attrs: { 'data-key': uniqueKey },
              style: { ...itemStyle, height: `${this.size}px` },
              class: itemClass
            }, uniqueKey)
          )
        })
      ),

      // 底部插槽 
      footer ? h(Slots, {
        props: {
          tag: footerTag,
          uniqueKey: 'footer',
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