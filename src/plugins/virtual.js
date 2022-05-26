import { Range, CalcSize } from "./states"

const CACLTYPE = {
  INIT: 'INIT',
  FIXED: 'FIXED',
  DYNAMIC: 'DYNAMIC'
}

const DIRECTION = {
  FRONT: 'FRONT',
  BEHIND: 'BEHIND'
}

function Virtual(options, callback) {
  this.options = options
  this.callback = callback

  this.sizes = new Map() // 用于存储列表项的高度
  this.isHorizontal = options.isHorizontal // 是否为横向滚动

  this.calcIndex = 0 // 记录上次计算的index
  this.calcType = CACLTYPE.INIT // 记录列表项高度是动态还是静态
  this.calcSize = new CalcSize

  this.direction = '' // 滚动方向
  this.offset = 0 // 记录滚动距离

  this.range = new Range
  if (options) this.checkIfUpdate(0, options.keeps - 1)
}

Virtual.prototype = {
  construcrot: Virtual,

  // --------------------------- update ------------------------------
  updateUniqueKeys(value) {
    this.options.uniqueKeys = value
  },

  // 更新 sizes，删除不在当前列表中的数据
  updateSizes(uniqueKeys) {
    this.sizes.forEach((v, k) => {
      if (!uniqueKeys.includes(k)) this.sizes.delete(k)
    })
  },

  updateRange() {
    const start = Math.max(this.range.start, 0)
    this.handleUpdate(start, this.getEndByStart(start))
  },

  // --------------------------- scroll ------------------------------
  // 滚动事件
  handleScroll(offset) {
    this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND
    this.offset = offset

    const scrolls = this.getScrollItems(offset)

    if (this.isFront()) {
      this.handleScrollFront(scrolls)
    } else if (this.isBehind()) {
      this.handleScrollBehind(scrolls)
    }
  },

  isFront() {
    return this.direction === DIRECTION.FRONT
  },

  isBehind() {
    return this.direction === DIRECTION.BEHIND
  },

  getScrollItems(offset) {
    const { fixed, header } = this.calcSize
    // 减去顶部插槽高度
    if (header) offset -= header
    if (offset <= 0) return 0
    // 固定高度
    if (this.calcType === CACLTYPE.FIXED) return Math.floor(offset / fixed)
    // 非固定高度使用二分查找
    let low = 0, high = this.options.uniqueKeys.length
    let middle = 0, middleOffset = 0
    while (low <= high) {
      middle = low + Math.floor((high - low) / 2)
      middleOffset = this.getOffsetByIndex(middle)
      if (middleOffset === offset) return middle
      else if (middleOffset < offset) low = middle + 1
      else if (middleOffset > offset) high = middle - 1
    }
    return low > 0 ? --low : 0
  },

  handleScrollFront(scrolls) {
    if (scrolls > this.range.start) return
    const start = Math.max(scrolls - Math.round(this.options.keeps / 3), 0)
    this.checkIfUpdate(start, this.getEndByStart(start))
  },

  handleScrollBehind(scrolls) {
    if (scrolls < this.range.start + Math.round(this.options.keeps / 3)) return
    this.checkIfUpdate(scrolls, this.getEndByStart(scrolls))
  },

  checkIfUpdate(start, end) {
    const { uniqueKeys, keeps } = this.options
    if (uniqueKeys.length <= keeps) {
      start = 0
      end = uniqueKeys.length - 1
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1
    }
    if (this.range.start !== start) this.handleUpdate(start, end)
  },

  handleUpdate(start, end) {
    this.range.start = start
    this.range.end = end
    this.range.front = this.getFrontOffset()
    this.range.behind = this.getBehindOffset()
    this.callback({ ...this.range })
  },

  getFrontOffset() {
    if (this.calcType === CACLTYPE.FIXED) {
      return this.calcSize.fixed * this.range.start
    } else {
      return this.getOffsetByIndex(this.range.start)
    }
  },

  getBehindOffset() {
    const last = this.getLastIndex()
    if (this.calcType === CACLTYPE.FIXED) {
      return (last - this.range.end) * this.calcSize.fixed
    }
    if (this.calcIndex === last) {
      return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.range.end)
    }
    return (last - this.range.end) * this.getItemSize()
  },

  getOffsetByIndex(index) {
    if (!index) return 0
    let offset = 0
    for (let i = 0; i < index; i++) {
      const size = this.sizes.get(this.options.uniqueKeys[i])
      offset = offset + (typeof size === 'number' ? size : this.getItemSize())
    }
    this.calcIndex = Math.max(this.calcIndex, index - 1)
    this.calcIndex = Math.min(this.calcIndex, this.getLastIndex())
    return offset
  },

  getEndByStart(start) {
    return Math.min(start + this.options.keeps - 1, this.getLastIndex())
  },

  getLastIndex() {
    return this.options.uniqueKeys.length - 1
  },

  // --------------------------- size ------------------------------
  // 获取列表项的高度
  getItemSize() {
    return this.calcType === CACLTYPE.FIXED ? this.calcSize.fixed : (this.calcSize.average || this.options.size)
  },

  // 列表项高度变化
  handleItemSizeChange(id, size) {
    this.sizes.set(id, size)

    // 'INIT' 状态表示每一项的高度都相同
    if (this.calcType === CACLTYPE.INIT) {
      this.calcType = CACLTYPE.FIXED // 固定高度
      this.calcSize.fixed = size
    } else if (this.calcType === CACLTYPE.FIXED && this.calcSize.fixed !== size) {
      // 如果当前为 'FIXED' 状态并且 size 与固定高度不同，表示当前高度不固定，fixed值也就不需要了
      this.calcType = CACLTYPE.DYNAMIC
      this.calcSize.fixed = undefined
    }
    // 非固定高度的情况下，计算平均高度与总高度
    if (this.calcType !== CACLTYPE.FIXED) {
      this.calcSize.total = [...this.sizes.values()].reduce((t, i) => t + i, 0)
      this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size)
    }
  },
  
  // header 插槽高度变化
  handleHeaderSizeChange(size) {
    this.calcSize.header = size
  },

  // footer 插槽高度变化
  handleFooterSizeChange(size) {
    this.calcSize.footer = size
  }
}

export default Virtual