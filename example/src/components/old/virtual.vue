<template>
  <div ref="virtualDragList" :style="{ height, overflow: 'hidden auto', position: 'relative' }" @scroll="handleScroll($event)">
    <!-- 顶部插槽 -->
    <Slots v-if="header" :slots="header" :tag="headerTag" uniqueKey="header" @resize="onHeaderResized"></Slots>
    <!-- 列表项 -->
    <div ref="content" role="group" :style="{ padding: `${padding.front}px 0px ${padding.behind}px` }">
      <Items
        v-for="item in visibleData"
        :key="uniqueId(item)"
        :tag="itemTag"
        :source="item"
        :dataSource="list"
        :dragStyle="dragStyle"
        :index="getIndex(item)"
        :itemStyle="itemStyle"
        :itemClass="itemClass"
        :uniqueKey="uniqueId(item)"
        @resize="onItemResized"
      >
        <template #item="{ source, index, uniqueKey }">
          <slot name="item" :source="source" :index="index" :dataKey="uniqueKey"></slot>
        </template>
      </Items>
    </div>
    <!-- 底部插槽 -->
    <Slots v-if="footer" :slots="footer" :tag="footerTag" uniqueKey="footer" @resize="onFooterResized"></Slots>
    <!-- 最底部元素 -->
    <div ref="bottomItem"></div>
  </div>
</template>

<script>
import { Slots, Items } from './slots'
export default {
  name: 'infinity-list',
  components: { Items, Slots },
  props: {
    // 列表数据
    dataSource: {
      type: Array,
      default: () => []
    },
    // 每一项的key值键值
    dataKey: {
      type: String,
      required: true
    },
    // 虚拟列表高度
    height: {
      type: String,
      default: '100%'
    },
    // 列表展示多少条数据，为0或者不传会自动计算
    keeps: {
      type: Number,
      default: 30
    },
    // 每一行预估高度
    size: {
      type: Number
    },
    // 是否可拖拽，需要指定拖拽元素，设置draggable属性为true
    draggable: {
      type: Boolean,
      default: true
    },
    headerTag: {
      type: String,
      default: 'div'
    },
    footerTag: {
      type: String,
      default: 'div'
    },
    itemTag: {
      type: String,
      default: 'div'
    },
    itemStyle: {
      type: Object,
      default: () => {}
    },
    itemClass: {
      type: String,
      default: ''
    },
    // 拖拽时的样式
    dragStyle: {
      type: Object,
      default: () => {
        return {
          backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)'
        }
      }
    }
  },
  data() {
    return {
      list: [], // 将dataSource深克隆一份

      sizeStack: new Map(), // 保存每个item的高度

      start: 0, // 起始索引
      end: 0, // 结束索引
      offset: 0, // 记录滚动高度
      direction: '', // 记录滚动方向

      uniqueKeys: [], // 通过dataKey获取所有数据的唯一键值

      lastCalcIndex: 0,
      calcType: 'INIT', // 初始化标致
      calcSize: {
        average: 0, // 计算首次加载每一项的评价高度
        total: 0, // 首次加载的总高度
        fixed: 0, // 记录固定高度值
        header: 0, // 顶部插槽高度
        footer: 0 // 底部插槽高度
      },

      padding: {
        front: 0,
        behind: 0
      },

      dragState: {
        oldNode: null, // 拖拽起始dom元素
        oldItem: null, // 拖拽起始节点数据
        oldIndex: null, // 拖拽起始节点索引
        newNode: null, // 拖拽结束目标dom元素
        newItem: null, // 拖拽结束节点数据
        newIndex: null // 拖拽结束节点索引
      }
    }
  },
  computed: {
    visibleData() {
      return this.list.slice(this.start, this.end)
    },
    getIndex() {
      return function(item) {
        return this.list.findIndex(el => this.uniqueId(item) == this.uniqueId(el))
      }
    },
    uniqueKeyLen() {
      return this.uniqueKeys.length - 1
    },
    isFixedType() {
      return this.calcType === 'FIXED'
    }
  },
  watch: {
    dataSource: {
      handler(val) {
        this.list = JSON.parse(JSON.stringify(val))
        this.uniqueKeys = this.list.map(item => this.uniqueId(item))
        this.handleSourceDataChange()
        this.updateSizeStack()
      },
      deep: true,
      immediate: true
    }
  },
  beforeCreate() {
    const { header, footer } = this.$slots
    this.header = header
    this.footer = footer
  },
  mounted() {
    this.end = this.start + this.keeps
  },
  methods: {
    // 滚动到底部
    scrollToBottom() {
      const { bottomItem, virtualDragList } = this.$refs
      if (bottomItem) {
        const offset = bottomItem.offsetTop
        this.scrollToOffset(offset)
      }
      const clientHeight = this.$el.clientHeight
      const scrollTop = virtualDragList.scrollTop
      const scrollHeight = virtualDragList.scrollHeight
      // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法
      setTimeout(() => {
        if (scrollTop + clientHeight < scrollHeight) {
          this.scrollToBottom()
        }
      }, 10)
    },
    // 滚动到指定高度
    scrollToOffset(offset) {
      const { virtualDragList } = this.$refs
      virtualDragList.scrollTop = offset
    },
    // 滚动到指定索引值位置
    scrollToIndex(index) {
      if (index >= this.list.length - 1) {
        this.scrollToBottom()
      } else {
        const offset = this.getOffsetByIndex(index)
        this.scrollToOffset(offset)
      }
    },
    handleScroll(event) {
      const { virtualDragList } = this.$refs
      const clientHeight = Math.ceil(this.$el.clientHeight)
      const scrollTop = Math.ceil(virtualDragList.scrollTop)
      const scrollHeight = Math.ceil(virtualDragList.scrollHeight)
      // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离
      if (scrollTop < 0 || (scrollTop + clientHeight > scrollHeight + 1) || !scrollHeight) return
      // 记录上一次滚动的距离，判断当前滚动方向
      this.direction = scrollTop < this.offset ? 'FRONT' : 'BEHIND'
      this.offset = scrollTop
      const overs = this.getScrollOvers()
      if (this.direction === 'FRONT') {
        this.handleFront(overs)
        if (!!this.list.length && scrollTop <= 0) this.$emit('top')
      } else if (this.direction === 'BEHIND') {
        this.handleBehind(overs)
        if (clientHeight + scrollTop >= scrollHeight) this.$emit('bottom')
      }
    },
    handleFront(overs) {
      if (overs > this.start) {
        return
      }
      const start = Math.max(overs - Math.round(this.keeps / 3), 0)
      this.checkRange(start, this.getEndByStart(start))
    },
    handleBehind(overs) {
      if (overs < this.start + Math.round(this.keeps / 3)) {
        return
      }
      this.checkRange(overs, this.getEndByStart(overs))
    },
    // 更新每个子组件高度
    onItemResized(uniqueKey, size) {
      this.sizeStack.set(uniqueKey, size)
      // 初始为固定高度fixedSizeValue, 如果大小没有变更不做改变，如果size发生变化，认为是动态大小，去计算平均值
      if (this.calcType === 'INIT') {
        this.calcSize.fixed = size
        this.calcType = 'FIXED'
      } else if (this.calcType === 'FIXED' && this.calcSize.fixed !== size) {
        this.calcType = 'DYNAMIC'
        delete this.calcSize.fixed
      }
      if (this.calcType !== 'FIXED' && this.calcSize.total !== 'undefined') {
        if (this.sizeStack.size < Math.min(this.keeps, this.uniqueKeys.length)) {
          this.calcSize.total = [...this.sizeStack.values()].reduce((acc, cur) => acc + cur, 0)
          this.calcSize.average = Math.round(this.calcSize.total / this.sizeStack.size)
        } else {
          delete this.calcSize.total
        }
      }
    },
    onHeaderResized(id, size) {
      this.calcSize.header = size
    },
    onFooterResized(id, size) {
      this.calcSize.footer = size
    },
    // 原数组改变重新计算
    handleSourceDataChange() {
      let start = Math.max(this.start, 0)
      this.updateRange(this.start, this.getEndByStart(start))
    },
    // 更新缓存
    updateSizeStack() {
      this.sizeStack.forEach((v, key) => {
        if (!this.uniqueKeys.includes(key)) {
          this.sizeStack.delete(key)
        }
      })
    },
    checkRange(start, end) {
      const keeps = this.keeps
      const total = this.uniqueKeys.length
      if (total <= keeps) {
        start = 0
        end = this.uniqueKeyLen
      } else if (end - start < keeps - 1) {
        start = end - keeps + 1
      }
      if (this.start !== start) {
        this.updateRange(start, end)
      }
    },
    updateRange(start, end) {
      this.start = start
      this.end = end
      this.padding = {
        front: this.getFront(),
        behind: this.getBehind()
      }
    },
    // 二分法查找
    getScrollOvers() {
      // 如果有header插槽，需要减去header的高度
      const offset = this.offset - this.calcSize.header
      if (offset <= 0) return 0
      if (this.isFixedType) return Math.floor(offset / this.calcSize.fixed)
      let low = 0
      let middle = 0
      let middleOffset = 0
      let high = this.uniqueKeys.length
      while (low <= high) {
        middle = low + Math.floor((high - low) / 2)
        middleOffset = this.getOffsetByIndex(middle)
        if (middleOffset === offset) {
          return middle
        } else if (middleOffset < offset) {
          low = middle + 1
        } else if (middleOffset > offset) {
          high = middle - 1
        }
      }
      return low > 0 ? --low : 0
    },
    getFront() {
      if (this.isFixedType) {
        return this.calcSize.fixed * this.start
      } else {
        return this.getOffsetByIndex(this.start)
      }
    },
    getBehind() {
      const last = this.uniqueKeyLen
      if (this.isFixedType) {
        return (last - this.end) * this.calcSize.fixed
      }
      if (this.lastCalcIndex === last) {
        return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.end)
      } else {
        return (last - this.end) * this.getItemSize()
      }
    },
    // 通过滚动高度获取索引
    getOffsetByIndex(index) {
      if (!index) return 0
      let offset = 0
      let indexSize = 0
      for (let i = 0; i < index; i++) {
        indexSize = this.sizeStack.get(this.uniqueKeys[i])
        offset = offset + (typeof indexSize === 'number' ? indexSize : this.getItemSize())
      }
      this.lastCalcIndex = Math.max(this.lastCalcIndex, index - 1)
      this.lastCalcIndex = Math.min(this.lastCalcIndex, this.uniqueKeyLen)
      return offset
    },
    // 获取每一项的高度
    getItemSize() {
      return this.isFixedType ? this.calcSize.fixed : (this.calcSize.average || this.size)
    },
    getEndByStart(start) {
      return Math.min(start + this.keeps, this.uniqueKeyLen)
    },
    uniqueId(obj, defaultValue = '') {
      const keys = this.dataKey
      return (!Array.isArray(keys) ? keys.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : keys).reduce((o, k) => (o || {})[k], obj) || defaultValue
    }
  }
}
</script>

<style></style>