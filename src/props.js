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
    default: () => {
      return {}
    }
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
}

export const SlotItemProps = {
  tag: {
    type: String,
    default: 'div'
  },
  event: {
    type: String
  },
  dragStyle: {
    type: Object,
    default: () => {
      return {}
    }
  },
  uniqueKey: {
    type: [String, Number]
  }
}