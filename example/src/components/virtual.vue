<template>
  <div ref="infinityList" :style="{ height, overflowX: 'hidden', overflowY: 'auto', position: 'relative' }" @scroll="handleScroll($event)">
    <!-- 顶部插槽 -->
    <Slots v-if="header" :slots="header" :tag="headerTag" uniqueKey="header" @resize="onHeaderResized"></Slots>
    <!-- 列表项 -->
    <div ref="content" role="infinitylist" :style="{ padding: `${padFront}px 0px ${padBehind}px` }">
      <Items v-for="item in _visibleData" :key="uniqueId(item)" :index="getIndex(item)" :source="item" :uniqueKey="uniqueId(item)" @resize="onItemResized">
        <template #item="{ source, index }">
          <slot name="item" :source="source" :index="index"></slot>
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
    headerTag: {
      type: String,
      default: 'div'
    },
    footerTag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {
      list: [], // 将dataSource深克隆一份
      sizeStack: new Map(),
      screenHeight: 0, // 可视区高度
      start: 0, // 起始索引
      end: 0, // 结束索引
      offset: 0,
      direction: '',

      uniqueKeys: [],

      calcType: 'INIT',
      lastCalcIndex: 0,
      firstAverageSize: 0,
      firstTotalSize: 0,
      fixedSize: 0,

      padFront: 0,
      padBehind: 0,

      headerSize: 0,
      footerSize: 0
    }
  },
  computed: {
    _visibleData() {
      return this.list.slice(this.start, this.end)
    },
    getIndex() {
      return function(item) {
        const index = this.list.findIndex(el => this.uniqueId(item) == this.uniqueId(el))
        return index
      }
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
    this.screenHeight = Math.ceil(this.$el.clientHeight)
    this.end = this.start + this.keeps
  },
  methods: {
    // 滚动到底部
    scrollToBottom() {
      const { bottomItem } = this.$refs
      if (bottomItem) {
        const offset = bottomItem.offsetTop
        this.scrollToOffset(offset)
      }
      const clientHeight = this.$el.clientHeight
      const scrollTop = this.$refs.infinityList.scrollTop
      const scrollHeight = this.$refs.infinityList.scrollHeight
      setTimeout(() => {
        if (scrollTop + clientHeight < scrollHeight) {
          this.scrollToBottom()
        }
      }, 10)
    },
    // 滚动到指定高度
    scrollToOffset(offset) {
      const { infinityList } = this.$refs
      infinityList.scrollTop = offset
    },
    scrollToIndex(index) {
      if (index >= this.list.length - 1) {
        this.scrollToBottom()
      } else {
        const offset = this.getIndexOffset(index)
        this.scrollToOffset(offset)
      }
    },
    handleScroll(event) {
      const clientHeight = Math.ceil(this.$el.clientHeight)
      const scrollTop = Math.ceil(this.$refs.infinityList.scrollTop)
      const scrollHeight = Math.ceil(this.$refs.infinityList.scrollHeight)
      if (scrollTop < 0 || (scrollTop + clientHeight > scrollHeight + 1) || !scrollHeight) {
        return
      }
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
        this.fixedSize = size
        this.calcType = 'FIXED'
      } else if (this.calcType === 'FIXED' && this.fixedSize !== size) {
        this.calcType = 'DYNAMIC'
        delete this.fixedSize
      }
      if (this.calcType !== 'FIXED' && this.firstTotalSize !== 'undefined') {
        if (this.sizeStack.size < Math.min(this.keeps, this.uniqueKeys.length)) {
          this.firstTotalSize = [...this.sizeStack.values()].reduce((acc, cur) => acc + cur, 0)
          this.firstAverageSize = Math.round(this.firstTotalSize / this.sizeStack.size)
        } else {
          delete this.firstTotalSize
        }
      }
    },
    onHeaderResized(id, size) {
      this.headerSize = size
    },
    onFooterResized(id, size) {
      this.footerSize = size
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
        end = this.getLastIndex()
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
      this.padFront = this.getFront()
      this.padBehind = this.getBehind()
    },
    getScrollOvers() {
      const offset = this.offset - this.headerSize
      if (offset <= 0) return 0
      if (this.isFixedType()) return Math.floor(offset / this.fixedSize)
      let low = 0
      let middle = 0
      let middleOffset = 0
      let high = this.uniqueKeys.length
      while (low <= high) {
        middle = low + Math.floor((high - low) / 2)
        middleOffset = this.getIndexOffset(middle)
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
    getIndexOffset(givenIndex) {
      if (!givenIndex) {
        return 0
      }
      let offset = 0
      let indexSize = 0
      for (let index = 0; index < givenIndex; index++) {
        indexSize = this.sizeStack.get(this.uniqueKeys[index])
        offset = offset + (typeof indexSize === 'number' ? indexSize : this.getEstimateSize())
      }
      this.lastCalcIndex = Math.max(this.lastCalcIndex, givenIndex - 1)
      this.lastCalcIndex = Math.min(this.lastCalcIndex, this.getLastIndex())
      return offset
    },
    getLastIndex() {
      return this.uniqueKeys.length - 1
    },
    getEndByStart(start) {
      const theoryEnd = start + this.keeps
      const truelyEnd = Math.min(theoryEnd, this.getLastIndex())
      return truelyEnd
    },
    getFront() {
      if (this.isFixedType()) {
        return this.fixedSize * this.start
      } else {
        return this.getIndexOffset(this.start)
      }
    },
    getBehind() {
      const end = this.end
      const lastIndex = this.getLastIndex()
      if (this.isFixedType()) {
        return (lastIndex - end) * this.fixedSize
      }
      if (this.lastCalcIndex === lastIndex) {
        return this.getIndexOffset(lastIndex) - this.getIndexOffset(end)
      } else {
        return (lastIndex - end) * this.getEstimateSize()
      }
    },
    getEstimateSize() {
      return this.isFixedType() ? this.fixedSize : (this.firstAverageSize || this.size)
    },
    isFixedType() {
      return this.calcType === 'FIXED'
    },
    uniqueId(obj, defaultValue = '') {
      const keys = this.dataKey
      return (!Array.isArray(keys) ? keys.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : keys).reduce((o, k) => (o || {})[k], obj) || defaultValue
    }
  }
}
</script>

<style></style>