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
  // 防抖延迟时间
  delay: {
    type: Number,
    default: 10
  },
  // 是否可拖拽，需要指定拖拽元素，设置draggable属性为true
  draggable: {
    type: Boolean,
    default: true
  },
  // 是否只允许拖拽设置了draggable属性的元素，为 true 时选中父元素也不会产生拖拽效果
  draggableOnly: {
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
  },
  dragElement: {
    type: Function
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