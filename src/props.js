export const VirtualProps = {
  // 列表数据
  dataSource: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 每一项的key值键值
  dataKey: {
    type: String,
    required: true
  },
  direction: {
    type: String,
    default: 'vertical' // 纵向滚动(vertical)还是横向滚动(horizontal)
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
  // 防抖延迟时间
  delay: {
    type: Number,
    default: 0
  },
  rootStyle: {
    type: Object
  },
  rootClass: {
    type: String,
    default: ''
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
  // 禁用拖拽？
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
  // 拖拽时的样式
  ghostStyle: {
    type: Object,
    default: () => {
      return {
        backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)'
      }
    }
  },
  chosenClass: {
    type: String,
    default: ''
  },
  animation: {
    type: Number,
    default: 150
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
  uniqueKey: {
    type: [String, Number]
  },
  isHorizontal: {
    type: Boolean
  }
}