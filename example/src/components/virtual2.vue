<template>
  <div ref="parent" style="height: 100%">
    <div ref="infinityList" :style="{ height }" class="infinity-list-scroll" @scroll="handleScroll($event)">
      <div ref="phantom" class="infinity-list-phantom"></div>
      <div ref="content" class="infinity-list-content">
        <div ref="listItems" class="infinity-list-item" v-for="(item, index) in _visibleData" :key="uniqueId(item)" :id="uniqueId(item)">
          <slot name="item" :record="item">
            {{ item.desc }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../utils'
export default {
  name: 'vue-virtual-draglist-infinity-list',
  props: {
    // 列表数据
    dataSource: {
      type: Array,
      default: () => []
    },
    // 每一行的key值键值
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
      default: 0
    },
    // 每一行预估高度
    size: {
      type: Number,
      required: true
    },
    // 缓冲区比例
    bufferScale: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      list: [], // 将dataSource深克隆一份
      positionStack: [], // 缓存
      scrolling: false, // 是否正在滚动
      screenHeight: 0, // 可视区高度
      start: 0, // 起始索引
      end: 0 // 结束索引
    }
  },
  computed: {
    _visibleData() {
      const start = this.start - this._aboveCount
      const end = this.end + this._belowCount
      return this.list.slice(start, end)
    },
    _visibleCount() {
      return this.keeps || Math.ceil(this.screenHeight / this.size)
    },
    _anchorPoint() {
      return this.positionStack.length ? this.positionStack[this.start] : null
    },
    _aboveCount() {
      return Math.min(this.start, this.bufferScale * this._visibleCount)
    },
    _belowCount() {
      return Math.min(this.dataSource.length - this.end, this.bufferScale * this._visibleCount)
    }
  },
  watch: {
    dataSource: {
      handler(val) {
        this.list = JSON.parse(JSON.stringify(val))
      },
      deep: true,
      immediate: true
    }
  },
  updated() {
    if (this.list.length !== this.positionStack.length) this.initPositionStack()
    this.$nextTick(() => {
      if (!(this.$refs.listItems && this.$refs.listItems.length)) return
      this.updateSize()
      // 更新列表总高度
      const height = this.positionStack[this.positionStack.length - 1].bottom
      this.$refs.phantom.style.height = height + 'px'
      this.updateOffset()
    })
  },
  created() {
    this.initPositionStack()
    this.setScrollState(false)
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight
    this.start = 0
    this.end = this.start + this._visibleCount
    this.updateOffset()
  },
  methods: {
    handleScroll(event) {
      const scrollTop = this.$refs.infinityList.scrollTop
      this.setScrollState(true) // 更新滚动状态
      if (scrollTop > this._anchorPoint.bottom || scrollTop < this._anchorPoint.top) {
        this.start = this.getStartIndex(scrollTop)
        this.end = this.start + this._visibleCount
        this.updateOffset()
      }
    },
    // 初始化缓存
    initPositionStack() {
      this.positionStack = this.dataSource.map((item, index) => ({
        index,
        height: this.size,
        top: index * this.size,
        bottom: (index + 1) * this.size
      }))
    },
    // 更新列表项的大小，获取真实高度
    updateSize() {
      const nodes = this.$refs.listItems
      nodes.forEach(node => {
        const rect = node.getBoundingClientRect()
        const height = rect.height
        const index = this.list.findIndex(item => this.uniqueId(item) == node.id)
        const oldHeight = this.positionStack[index].height
        const differ = oldHeight - height
        if (differ && !isNaN(index)) {
          this.positionStack[index].bottom = this.positionStack[index].bottom - differ
          this.positionStack[index].height = height
          this.positionStack[index].over = true
          for(let i = index + 1; i < this.positionStack.length; i++) {
            this.positionStack[i].top = this.positionStack[i - 1].bottom
            this.positionStack[i].bottom = this.positionStack[i].bottom - differ
          }
        }
      })
    },
    // 更新偏移量
    updateOffset() {
      let offset
      if (this.start >= 1) {
        const size = this.positionStack[this.start].top - (this.positionStack[this.start - this._aboveCount] ? this.positionStack[this.start - this._aboveCount].top : 0)
        offset = this.positionStack[this.start - 1].bottom - size
      } else {
        offset = 0
      }
      this.offset = offset
      this.$refs.content.style.transform = `translate3d(0, ${offset}px, 0)`
    },
    //设定滚动状态
    setScrollState(flag = false){
      this.scrolling = flag
    },
    // 获取起始索引
    getStartIndex(scrollTop = 0) {
      // 二分法查找
      return this.binarySearch(this.positionStack, scrollTop)
    },
    binarySearch(list, top) {
      let start = 0
      let end = list.length - 1
      let tempIndex = null
      while(start <= end) {
        const midIndex = parseInt((start + end) / 2)
        const midValue = list[midIndex].bottom
        if (midValue === top) {
          return midIndex + 1
        } else if (midValue < top) {
          start = midIndex + 1
        } else if (midValue > top) {
          if (tempIndex === null || tempIndex > midIndex) tempIndex = midIndex
          end = end - 1
        }
      }
      return tempIndex
    },
    uniqueId(obj, defaultValue = '') {
      const key = this.dataKey
      return (!Array.isArray(key) ? key.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : key).reduce((o, k) => (o || {})[k], obj) || defaultValue
    }
  }
}
</script>

<style scoped>
.infinity-list-scroll {
  overflow-x:hidden;
  width: 100%;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}
.infinity-list-phantom, .infinity-list-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
}
.infinity-list-content {
  z-index: 1;
}
.infinity-list-phantom {
  z-index: -1;
}
.infinity-list-item {
  padding: 16px;
}
</style>