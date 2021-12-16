<template>
  <div ref="parent" style="height: 100%">
    <div ref="infinityList" :style="{ height }" class="infinity-list-scroll" @scroll="handleScroll($event)">
      <div ref="content" class="infinity-list-content">
        <Item v-for="(item, index) in _visibleData" :key="uniqueId(item)" :index="getIndex" :item="item" :uniqueKey="uniqueId(item)" @resize="onItemResized">
          <template #item="{ record, index }">
            <slot name="item" :record="record" :index="index"></slot>
          </template>
        </Item>
      </div>
      <div ref="bottomItem"></div>
    </div>
  </div>
</template>

<script>
const CALC_TYPE = {
  INIT: 'INIT',
  FIXED: 'FIXED',
  DYNAMIC: 'DYNAMIC'
}
import Item from './Item.vue'
export default {
  name: 'infinity-list',
  components: { Item },
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
      default: 40
    },
    // 每一行预估高度
    size: {
      type: Number
    }
  },
  data() {
    return {
      list: [], // 将dataSource深克隆一份
      sizeStack: new Map(),
      positionStack: [], // 缓存
      screenHeight: 0, // 可视区高度
      start: 0, // 起始索引
      end: 0, // 结束索引

      uniqueKeys: [],

      calcType: CALC_TYPE.INIT,
      lastCalcIndex: 0,
      firstAverageSize: 0,
      firstTotalSize: 0,
      fixedSize: 0
    }
  },
  computed: {
    _visibleData() {
      return this.list.slice(this.start, this.end)
    },
    _anchorPoint() {
      return this.positionStack.length ? this.positionStack[this.start] : null
    },
    getIndex() {
      return function(item) {
        const index = this.list.findIndex(el => uniqueId(item) == uniqueId(el))
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
  updated() {
    this.$nextTick(() => {
      this.updateOffset()
    })
  },
  mounted() {
    this.screenHeight = Math.ceil(this.$el.clientHeight)
    this.end = this.start + this.keeps
    this.updateOffset()
  },
  methods: {
    // 滚动到底部
    scrollToBottom() {
      const { bottomItem } = this.$refs
      if (bottomItem) {
        const offset = bottomItem.offsetTop
        this.scrollToOffset(offset)
      }
      const scrollTop = this.$refs.infinityList.scrollTop
      const scrollHeight = this.$refs.infinityList.scrollHeight
      setTimeout(() => {
        if (scrollTop + this.screenHeight < scrollHeight) {
          this.scrollToBottom()
        }
      }, 3)
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
      const scrollTop = this.$refs.infinityList.scrollTop
      const overs = this.getScrollOvers(scrollTop)
      const start = Math.max(overs - Math.round(this.keeps / 3), 0)
      this.updateRange(start, this.getEndByStart(overs))
    },
    // 更新每个子组件高度
    onItemResized(uniqueKey, size) {
      this.sizeStack.set(uniqueKey, size)
      // 初始为固定高度fixedSizeValue, 如果大小没有变更不做改变，如果size发生变化，认为是动态大小，去计算平均值
      if (this.calcType === CALC_TYPE.INIT) {
        this.fixedSize = size
        this.calcType = CALC_TYPE.FIXED
        this.initSizeStack()
      } else if (this.calcType === CALC_TYPE.FIXED && this.fixedSize !== size) {
        this.calcType = CALC_TYPE.DYNAMIC
        delete this.fixedSize
      }
      if (this.calcType !== CALC_TYPE.FIXED && this.firstTotalSize !== 'undefined') {
        if (this.sizeStack.size < Math.min(this.keeps, this.uniqueKeys.length)) {
          this.firstTotalSize = [...this.sizeStack.values()].reduce((acc, cur) => acc + cur, 0)
          this.firstAverageSize = Math.round(this.firstTotalSize / this.sizeStack.size)
        } else {
          delete this.firstTotalSize
        }
      }
    },
    // 原数组改变重新计算
    handleSourceDataChange() {
      let start = Math.max(this.start, 0)
      this.updateRange(this.start, this.getEndByStart(start))
    },
    // 初始化缓存
    initSizeStack() {
      this.list.forEach(item => {
        const id = this.uniqueId(item)
        this.sizeStack.set(id, this.firstAverageSize)
      })
    },
    // 更新缓存
    updateSizeStack() {
      this.sizeStack.forEach((v, key) => {
        if (!this.uniqueKeys.includes(key)) {
          this.sizeStack.delete(key)
        }
      })
    },
    updateRange(start, end) {
      const keeps = this.keeps
      const total = this.uniqueKeys.length
      if (total <= keeps) {
        start = 0
        end = this.getLastIndex()
      } else if (end - start < keeps - 1) {
        start = end - keeps + 1
      }
      if (this.start !== start) {
        this.start = start
        this.end = end
      }
    },
    // 更新偏移量
    updateOffset() {
      this.$refs.content.style.padding = `${this.getPadFront()}px 0px ${this.getPadBehind()}px`
    },
    getScrollOvers(offset) {
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
    getPadFront () {
      if (this.isFixedType()) {
        return this.fixedSize * this.start
      } else {
        return this.getIndexOffset(this.start)
      }
    },
    getPadBehind () {
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
    getEstimateSize () {
      return this.isFixedType() ? this.fixedSize : (this.firstAverageSize || this.size)
    },
    isFixedType () {
      return this.calcType === CALC_TYPE.FIXED
    },
    uniqueId(obj, defaultValue = '') {
      const keys = this.dataKey
      return (!Array.isArray(keys) ? keys.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : keys).reduce((o, k) => (o || {})[k], obj) || defaultValue
    }
  }
}
</script>

<style scoped>
.infinity-list-scroll {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
</style>