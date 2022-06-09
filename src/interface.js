export const VirtualProps = {
  dataSource: {
    type: Array,
    default: () => {
      return []
    }
  },
  dataKey: {
    type: String,
    required: true
  },
  direction: {
    type: String,
    default: 'vertical'
  },
  keeps: {
    type: Number,
    default: 30
  },
  size: {
    type: Number
  },
  delay: {
    type: Number,
    default: 10
  },
  rootTag: {
    type: String,
    default: 'div'
  },
  wrapTag: {
    type: String,
    default: 'div'
  },
  wrapClass: {
    type: String,
    default: ''
  },
  wrapStyle: {
    type: Object
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
    type: Object
  },
  itemClass: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: [Function, String]
  },
  dragging: {
    type: Function
  },
  ghostClass: {
    type: String,
    default: ''
  },
  ghostStyle: {
    type: Object,
    default: () => {
      return {}
    }
  },
  chosenClass: {
    type: String,
    default: ''
  },
  animation: {
    type: Number,
    default: 150
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  scrollStep: {
    type: Number,
    default: 5
  },
  scrollThreshold: {
    type: Number,
    default: 15
  },
  keepOffset: {
    type: Boolean,
    default: false
  }
}

export const SlotsProps = {
  tag: {
    type: String,
    default: 'div'
  },
  event: {
    type: String
  },
  dataKey: {
    type: [String, Number]
  },
  isHorizontal: {
    type: Boolean
  }
}

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
    this.from = { key: undefined, item: undefined, index: -1 }
    this.to = { key: undefined, item: undefined, index: -1 }
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