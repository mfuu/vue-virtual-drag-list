// scroll range
export class Range {
  constructor() {
    this.start = 0
    this.end = 0
    this.front = 0
    this.behind = 0
  } 
}

// drag state
export class DragState {
  constructor() {
    this.from = { key: null, item: null, index: -1 }
    this.to = { key: null, item: null, index: -1 }
  }
}

// virtual state
export class CalcSize {
  constructor() {
    this.average = undefined // 计算首次加载每一项的评价高度
    this.total = undefined // 首次加载的总高度
    this.fixed = undefined // 记录固定高度值
    this.header = undefined // 顶部插槽高度
    this.footer = undefined // 底部插槽高度
  }
}